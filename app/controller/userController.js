const { sign, verify, } = require('jsonwebtoken');
const { TOKENEXPIRYTIME, SECRET_KEY, } = require('../../config');
const { paymentGateway, } = require('../../emulators/paymentGateway');
const { hashPassword, } = require('../helper/hashPassword');
const { generateLocalSendResponse, } = require('../helper/responder');
const { retrieveAndValidateUser, } =
    require('../helper/retrieveAndValidateUser');
const { deleteFromUsersById,
    findFromListingsById,
    findFromCouponsById,
    findOneFromUsers,
    saveDocumentInUsers,
    saveDocumentInTokens,
    saveDocumentInOrders,
    updateUsersById,
    updateListingsById, } = require('../service');
const { TOKENTYPES, } = require('../util/constants');
const { SUCCESSFULLOGIN,
    CREDENTIALSCOULDNOTBEVERIFIED,
    DATASUCCESSFULLYCREATED,
    EMAILORPHONENUMBERINUSE,
    PAYMENTNOTCOMPLETED,
    EMPTYCART,
    DATASUCCESSFULLYUPDATED,
    DATASUCCESSFULLYDELETED, } = require('../util/messages');

/** Signs up a new user
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function signupUser(req, res, next) {
    const localResponder = generateLocalSendResponse(res);

    // validate input
    const body = req.body;

    body.password = hashPassword(body.password);

    try {
        // check that both phone number and email are unique
        if (await findOneFromUsers({
            $or: [
                {
                    phoneNumber: body.phoneNumber,
                },

                {
                    email: body.email,
                },
            ],
        })) {
            localResponder({
                statusCode: 403,
                message: EMAILORPHONENUMBERINUSE,
            });

            return;
        }

        // save in database
        const savedData = await saveDocumentInUsers(body);

        const token = sign({
            id: savedData._id,
        }, SECRET_KEY, {
            expiresIn: TOKENEXPIRYTIME,
        });

        await saveDocumentInTokens({
            user: savedData._id,
            type: TOKENTYPES.LOGIN,
            token,
        });

        localResponder({
            statusCode: 201,
            message: DATASUCCESSFULLYCREATED,
            token,
            savedData,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** Logs in an existing user
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function loginUser(req, res, next) {
    const localResponder = generateLocalSendResponse(res);

    // validate input
    const body = req.body;

    body.password = hashPassword(body.password);

    try {
        // get user data
        const userData = await findOneFromUsers(body);

        if (! userData) {
            localResponder({
                statusCode: 400,
                message: CREDENTIALSCOULDNOTBEVERIFIED,
            });
            return;
        }

        const token = sign({
            id: userData._id,
        }, SECRET_KEY, {
            expiresIn: TOKENEXPIRYTIME,
        });

        await saveDocumentInTokens({
            user: userData._id,
            type: TOKENTYPES.LOGIN,
            token,
        });

        localResponder({
            statusCode: 200,
            message: SUCCESSFULLOGIN,
            token,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** checks out user cart
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function checkout(req, res, next) {
    const localResponder = generateLocalSendResponse(res);

    // just in case the token expired between calls
    let id;

    try {
        ({ id, } = verify(req.headers.token, SECRET_KEY));
    } catch (err) {
        localResponder({
            statusCode: 403,
            message: CREDENTIALSCOULDNOTBEVERIFIED,
        });

        return;
    }

    try {
        const userData = await retrieveAndValidateUser(id, true, true, true);

        // if cart is empty finish
        if (userData.cart.length === 0) {
            localResponder({
                statusCode: 400,
                message: EMPTYCART,
            });

            return;
        }

        let paymentRequired = 0;
        let index = 0;

        for (const item of userData.cart) {
            const listingData = await findFromListingsById(item.id);

            // if listing no longer exists then skip
            if (! listingData) {
                userData.cart.slice(index, 1);
                continue;
            }

            // if stock is not sufficient skip
            if (listingData.stock < item.count) {
                userData.cart.slice(index, 1);
                continue;
            }

            // reduce stock
            listingData.stock -= item.count;

            // get actual price
            listingData.price *= item.count;

            // reduce price by coupon
            const couponData = await findFromCouponsById(item.coupon);

            if (couponData) {
                listingData.price -= (listingData.price *
                    couponData.discountPercentage);
            }

            paymentRequired += listingData.price;
            paymentRequired += item.deliveryType.deliveryCharge;

            await updateListingsById(item.id, {
                $set: {
                    stock: listingData.stock,
                },
            });

            index++;
        }

        if (! paymentGateway(paymentRequired)) {
            localResponder({
                statusCode: 402,
                message: PAYMENTNOTCOMPLETED,
            });

            return;
        }

        const savedData = await saveDocumentInOrders({
            buyer: id,
            items: userData.cart,
            cost: paymentRequired,
        });

        await updateUsersById(id, {
            $set: {
                cart: [],
            },
        });

        localResponder({
            statusCode: 201,
            message: DATASUCCESSFULLYCREATED,
            savedData,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** Updates user data
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function updateUser(req, res, next) {
    const localResponder = generateLocalSendResponse(res);

    // just in case the token expired between calls
    let id;

    try {
        ({ id, } = verify(req.headers.token, SECRET_KEY));
    } catch (err) {
        localResponder({
            statusCode: 403,
            message: CREDENTIALSCOULDNOTBEVERIFIED,
        });

        return;
    }

    // validate body
    const body = req.body;

    try {
        // check that both phone number and email are unique
        if (await findOneFromUsers({
            $or: [
                {
                    phoneNumber: body.phoneNumber,
                },

                {
                    email: body.email,
                },
            ],

            _id: {
                $ne: id,
            },
        })) {
            localResponder({
                statusCode: 403,
                message: EMAILORPHONENUMBERINUSE,
            });

            return;
        }

        await updateUsersById(id, {
            $set: {
                ...body,
                password: hashPassword(body.password),
            },
        });

        localResponder({
            statusCode: 200,
            message: DATASUCCESSFULLYUPDATED,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** Deletes the current user
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function deleteUser(req, res, next) {
    const localResponder = generateLocalSendResponse(res);

    // just in case the token expired between calls
    let id;

    try {
        ({ id, } = verify(req.headers.token, SECRET_KEY));
    } catch (err) {
        localResponder({
            statusCode: 403,
            message: CREDENTIALSCOULDNOTBEVERIFIED,
        });

        return;
    }

    try {
        await deleteFromUsersById(id);

        localResponder({
            statusCode: 200,
            message: DATASUCCESSFULLYDELETED,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** Reads a user's data; may only read the current user
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function readUser(req, res, next) {
    const localResponder = generateLocalSendResponse(res);

    // just in case the token expired between calls
    let id;

    try {
        ({ id, } = verify(req.headers.token, SECRET_KEY));
    } catch (err) {
        localResponder({
            statusCode: 403,
            message: CREDENTIALSCOULDNOTBEVERIFIED,
        });

        return;
    }

    try {
        const data = await retrieveAndValidateUser(id);

        localResponder({
            statusCode: 200,
            data,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

module.exports = {
    loginUser,
    signupUser,
    checkout,
    updateUser,
    deleteUser,
    readUser,
};
