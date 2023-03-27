const { sign, verify, } = require('jsonwebtoken');
const { TOKENEXPIRYTIME,
    SECRET_KEY,
    TEMPTOKENEXPIRYTIME, } = require('../../config');
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
    updateListingsById,
    findFromUsersById,
    deleteManyFromTokens, } = require('../service');
const { TOKENTYPES, } = require('../util/constants');
const { SUCCESSFULLOGIN,
    CREDENTIALSCOULDNOTBEVERIFIED,
    DATASUCCESSFULLYCREATED,
    EMAILORPHONENUMBERINUSE,
    PAYMENTNOTCOMPLETED,
    EMPTYCART,
    DATASUCCESSFULLYUPDATED,
    DATASUCCESSFULLYDELETED,
    PHONENUMBERINUSE, } = require('../util/messages');

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

        // generate data
        body.emailValidated = false;

        // save in database
        const savedData = await saveDocumentInUsers(body);

        const token = sign({
            id: savedData._id,
        }, SECRET_KEY, {
            expiresIn: TEMPTOKENEXPIRYTIME,
        });

        await saveDocumentInTokens({
            user: savedData._id,
            tokenType: TOKENTYPES.TEMP,
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
    body.emailValidated = true;

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
            tokenType: TOKENTYPES.LOGIN,
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
        // get data of current user
        const userData = await findFromUsersById(id);

        // check if user is trying to update email
        if (userData.email !== body.email) {
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

            // create and send a temp token
            const token = sign({
                id,
                email: body.email,
                oldEmail: userData.email,
            }, SECRET_KEY, {
                expiresIn: TEMPTOKENEXPIRYTIME,
            });

            // remove email from data being updated
            delete body.email;

            // update user data but also mark email as not validated
            await updateUsersById(id, {
                $set: {
                    ...body,
                    password: hashPassword(body.password),
                },
            });

            await saveDocumentInTokens({
                user: id,
                tokenType: TOKENTYPES.TEMP,
                token,
            });

            localResponder({
                statusCode: 200,
                message: DATASUCCESSFULLYUPDATED,
                token,
            });
        } else {
            // check only phone number is unique
            if (await findOneFromUsers({
                phoneNumber: body.phoneNumber,
                _id: {
                    $ne: id,
                },
            })) {
                localResponder({
                    statusCode: 403,
                    message: PHONENUMBERINUSE,
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
        }

        // will never reach here
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

/** Logs in an existing user and validates their email
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function loginUserAndValidate(req, res, next) {
    const localResponder = generateLocalSendResponse(res);
    const body = req.body;
    body.password = hashPassword(body.password);

    // get id from token
    let id;
    let tokenEmail;
    let oldEmail;

    try {
        ({ id,
            email: tokenEmail,
            oldEmail, } = verify(req.headers.token, SECRET_KEY));
    } catch (err) {
        localResponder({
            statusCode: 403,
            message: CREDENTIALSCOULDNOTBEVERIFIED,
        });

        return;
    }

    try {
        // get user data
        let userData;

        if (! oldEmail) {
            // not an update token
            userData = await findOneFromUsers(body);
        } else {
            // update token
            userData = await findOneFromUsers({
                email: oldEmail,
                password: body.password,
            });
        }

        if (! userData) {
            localResponder({
                statusCode: 400,
                message: CREDENTIALSCOULDNOTBEVERIFIED,
            });
            return;
        }

        // if updation token then confirm that email
        // in body is same as the email in token
        if (oldEmail && body.email !== tokenEmail) {
            localResponder({
                statusCode: 400,
                message: CREDENTIALSCOULDNOTBEVERIFIED,
            });
            return;
        }

        // confirm that data in userData and token belong to the same user
        if (String(userData._id) !== id) {
            localResponder({
                statusCode: 400,
                message: CREDENTIALSCOULDNOTBEVERIFIED,
            });
            return;
        }

        const updateExpression = {
            emailValidated: true,
        };

        if (tokenEmail) {
            updateExpression.email = tokenEmail;
        }

        // update document
        await updateUsersById(id, {
            $set: updateExpression,
        });

        const token = sign({
            id: userData._id,
        }, SECRET_KEY, {
            expiresIn: TOKENEXPIRYTIME,
        });

        // delete all other tokens assignede to this user
        await deleteManyFromTokens({
            user: userData._id,
        });

        await saveDocumentInTokens({
            user: userData._id,
            tokenType: TOKENTYPES.LOGIN,
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

module.exports = {
    loginUser,
    signupUser,
    checkout,
    updateUser,
    deleteUser,
    readUser,
    loginUserAndValidate,
};
