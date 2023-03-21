const { generateLocalSendResponse, } = require('../../helper/responder');
const { ListingModel, ReviewModel, } = require('../../models');
const { NonExistentListing, } = require('../../util/messages');

/** reads all reviews of a given listing
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function readReviews(req, res, next) {
    const listingId = req.params.id;
    const localResponder = generateLocalSendResponse(res);

    try {
        if (! await ListingModel.findById(listingId).exec()) {
            localResponder({
                statusCode: 404,
                message: NonExistentListing,
            });
            return;
        }

        const data = await ReviewModel.find({
            listing: listingId,
        });

        localResponder({
            statusCode: 200,
            data,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

module.exports = {
    readReviews,
};
