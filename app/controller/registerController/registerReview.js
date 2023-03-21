const { verify, } = require('jsonwebtoken');
const { SECRET_KEY, } = require('../../../config');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { OrderModel, ReviewModel, } = require('../../models');
const { CredentialsCouldNotBeVerified,
    CanOnlyReviewOnceBought,
    DataSuccessfullyCreated, } = require('../../util/messages');

/** Registers a review for a product that the current user has bought.
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function registerReview(req, res, next) {
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
        body.user = id;
        body.date = Date.now();

        // save to database
        const savedData = await new ReviewModel(body).save();

        localResponder({
            statusCode: 200,
            message: DataSuccessfullyCreated,
            savedData,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

module.exports = {
    registerReview,
};
