const { generateLocalSendResponse, } = require('../../helper/responder');
const { ListingModel, ReviewModel, } = require('../../models');
const { NonExistentListing, } = require('../../util/messages');

/** reads all reviews of a given listing
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function readReviews(req, res) {
    const listingId = req.params.id;
    const localResponder = generateLocalSendResponse(res);

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
}

module.exports = {
    readReviews,
};
