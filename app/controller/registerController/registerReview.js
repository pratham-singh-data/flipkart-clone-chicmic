const Joi = require('joi');
const { verify, } = require('jsonwebtoken');
const { SECRET_KEY, } = require('../../../config');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { OrderModel, ReviewModel, } = require('../../models');
const { CredentialsCouldNotBeVerified,
    CanOnlyReviewOnceBought,
    DataSuccessfullyCreated, } = require('../../util/messages');
const { registerReviewSchema, } = require('../../validator');

/** Registers a review for a product that the current user has bought.
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function registerReview(req, res) {
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
    let body;

    try {
        body = Joi.attempt(req.body, registerReviewSchema);
    } catch (err) {
        localResponder({
            statusCode: 400,
            message: err.message,
        });

        return;
    }

    // check that the user has bought this product
    const orderHistory = await OrderModel.findOne({
        'buyer': id,
        'items': {
            $elemMatch: {
                item: body.listing,
            },
        },
    });

    // user can only review a product that they have bought
    if (! orderHistory) {
        localResponder({
            statusCode: 403,
            message: CanOnlyReviewOnceBought,
        });

        return;
    }

    // generate data
    const savedData = await new ReviewModel(body).save();

    localResponder({
        statusCode: 200,
        message: DataSuccessfullyCreated,
        savedData,
    });
}

module.exports = {
    registerReview,
};
