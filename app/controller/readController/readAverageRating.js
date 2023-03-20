const { generateLocalSendResponse, } = require('../../helper/responder');
const { ListingModel, ReviewModel, } = require('../../models');
const { NonExistentListing, } = require('../../util/messages');
const { Types: { ObjectId, }, } = require(`mongoose`);

/** reads average rating of a given listing
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function readAverageRating(req, res) {
    const listingId = req.params.id;
    const localResponder = generateLocalSendResponse(res);

    if (! await ListingModel.findById(listingId).exec()) {
        localResponder({
            statusCode: 404,
            message: NonExistentListing,
        });
        return;
    }

    const average = (await ReviewModel.aggregate([
        {
            $match: {
                listing: new ObjectId(listingId),
            },
        },

        {
            $group: {
                _id: `$listing`,
                average: {
                    $avg: `$rating`,
                },
            },
        },
    ]).exec())[0].average;

    localResponder({
        statusCode: 200,
        average,
    });
}

module.exports = {
    readAverageRating,
};
