const { sign, verify, } = require('jsonwebtoken');
const { TokenExpiryTime, SECRET_KEY, } = require('../../config');
const { paymentGateway, } = require('../../emulators/paymentGateway');
const { hashPassword, } = require('../helper/hashPassword');
const { generateLocalSendResponse, } = require('../helper/responder');
const { retrieveAndValidateUser, } =
    require('../helper/retrieveAndValidateUser');
const { TokenModel,
    UserModel,
    OrderModel,
    ListingModel, } = require('../models');
const { deleteFromUsersById, } = require('../service/deleteByIdService');
const { findFromListingsById,
    findFromCouponsById, } = require('../service/findByIdService');
const { SuccessfulLogin,
    CredentialsCouldNotBeVerified,
    DataSuccessfullyCreated,
    EmailOrPhoneNumberInUse,
    PaymentNotCompleted,
    EmptyCart,
    DataSuccessfullyUpdated,
    DataSuccessfullyDeleted, } = require('../util/messages');

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
        if (await UserModel.findOne({
            $or: [
                {
                    phoneNumber: body.phoneNumber,
                },

                {
                    email: body.email,
                },
            ],
        }).exec()) {
            localResponder({
                statusCode: 403,
                message: EmailOrPhoneNumberInUse,
            });

            return;
        }

        // save in database
        const savedData = await new UserModel(body).save();

        const token = sign({
            id: savedData._id,
        }, SECRET_KEY, {
            expiresIn: TokenExpiryTime,
        });

        await new TokenModel({
            user: savedData._id,
            token,
        }).save();

        localResponder({
            statusCode: 201,
            message: DataSuccessfullyCreated,
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
        const userData = await UserModel.findOne(body).exec();

        if (! userData) {
            localResponder({
                statusCode: 400,
                message: CredentialsCouldNotBeVerified,
            });
            return;
        }

        const token = sign({
            id: userData._id,
        }, SECRET_KEY, {
            expiresIn: TokenExpiryTime,
        });

        await new TokenModel({
            user: userData._id,
            token,
        }).save();

        localResponder({
            statusCode: 200,
            message: SuccessfulLogin,
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
            message: CredentialsCouldNotBeVerified,
        });

        return;
    }

    try {
        const userData = await retrieveAndValidateUser(id, true, true, true);

        // if cart is empty finish
        if (userData.cart.length === 0) {
            localResponder({
                statusCode: 400,
                message: EmptyCart,
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

            // reduce price by coupon
            const couponData = await findFromCouponsById(item.coupon);

            if (couponData) {
                listingData.price -= (listingData.price *
                    couponData.discountPercentage);
            }

            paymentRequired += listingData.price;

            await ListingModel.updateOne({
                _id: item.id,
            }, {
                $set: {
                    stock: listingData.stock,
                },
            }).exec();

            index++;
        }

        if (! paymentGateway(paymentRequired)) {
            localResponder({
                statusCode: 402,
                message: PaymentNotCompleted,
            });

            return;
        }

        const savedData = await new OrderModel({
            buyer: id,
            items: userData.cart,
        }).save();

        await UserModel.updateOne({
            _id: id,
        }, {
            $set: {
                cart: [],
            },
        }).exec();

        localResponder({
            statusCode: 201,
            message: DataSuccessfullyCreated,
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
            message: CredentialsCouldNotBeVerified,
        });

        return;
    }

    // validate body
    const body = req.body;

    try {
        // check that both phone number and email are unique
        if (await UserModel.findOne({
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
        }).exec()) {
            localResponder({
                statusCode: 403,
                message: EmailOrPhoneNumberInUse,
            });

            return;
        }

        await UserModel.updateOne({
            _id: id,
        }, {
            $set: {
                ...body,
                password: hashPassword(body.password),
            },
        }).exec();

        localResponder({
            statusCode: 200,
            message: DataSuccessfullyUpdated,
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
            message: CredentialsCouldNotBeVerified,
        });

        return;
    }

    try {
        await deleteFromUsersById(id);

        localResponder({
            statusCode: 200,
            message: DataSuccessfullyDeleted,
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
            message: CredentialsCouldNotBeVerified,
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
