const Joi = require('joi');
const { verify, } = require('jsonwebtoken');
const { SECRET_KEY, } = require('../../../config');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { ReviewModel, } = require('../../models');
const { CredentialsCouldNotBeVerified,
    NonExistentReview,
    ReviewDoesNotBelong,
    DataSuccessfullyUpdated, } = require('../../util/messages');
const { updateReviewSchema, } = require('../../validator');

/** Update review of given id in database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function updateReview(req, res, next) {
    const localResponder = generateLocalSendResponse(res);
    const idToUpdate = req.params.id;

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
        body = Joi.attempt(req.body, updateReviewSchema);
    } catch (err) {
        localResponder({
            statusCode: 400,
            message: err.message,
        });

        return;
    }

    try {
        const reviewData = await ReviewModel.findById(idToUpdate).exec();

        if (! reviewData) {
            localResponder({
                statusCode: 404,
                message: NonExistentReview,
            });

            return;
        }

        if (String(reviewData.user) !== id) {
            localResponder({
                statusCode: 403,
                message: ReviewDoesNotBelong,
            });

            return;
        }

        await ReviewModel.updateOne({
            _id: idToUpdate,
        }, {
            $set: body,
        });

        localResponder({
            statusCode: 200,
            message: DataSuccessfullyUpdated,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

module.exports = {
    updateReview,
};
