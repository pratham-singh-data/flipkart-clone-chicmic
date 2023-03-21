const { verify, } = require('jsonwebtoken');
const { SECRET_KEY, } = require('../../../config');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { ReviewModel, } = require('../../models');
const { CredentialsCouldNotBeVerified,
    DataSuccessfullyDeleted,
    NonExistentReview,
    ReviewDoesNotBelong, } = require('../../util/messages');

/** Delete review frpm database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next functoion
 */
async function deleteReview(req, res, next) {
    const idToDelete = req.params.id;
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
        const reviewData = await ReviewModel.findById(idToDelete).exec();

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

        await ReviewModel.deleteOne({
            _id: idToDelete,
        }).exec();

        localResponder({
            statusCode: 200,
            message: DataSuccessfullyDeleted,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

module.exports = {
    deleteReview,
};
