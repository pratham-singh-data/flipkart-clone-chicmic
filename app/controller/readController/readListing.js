const { generateLocalSendResponse, } = require('../../helper/responder');
const { ListingModel, } = require('../../models');
const { NonExtistentListing, } = require('../../util/messages');

/** reads the specified listing from params
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function readListing(req, res) {
    const id = req.params.id;
    const localResponder = generateLocalSendResponse(res);

    const data = await ListingModel.findById(id).exec();

    if (! data) {
        localResponder({
            statusCode: 404,
            message: NonExtistentListing,
        });

        return;
    }

    localResponder({
        statusCode: 400,
        data,
    });
}

module.exports = {
    readListing,
};
