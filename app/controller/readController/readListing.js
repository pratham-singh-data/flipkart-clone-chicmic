const { generateLocalSendResponse, } = require('../../helper/responder');
const { ListingModel, } = require('../../models');

/** raeds the specified listing from params
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function readListing(req, res) {
    const id = req.params.id;
    const localResponder = generateLocalSendResponse(res);

    const data = await ListingModel.findById(id).exec();

    localResponder({
        statusCode: 400,
        data,
    });
}

module.exports = {
    readListing,
};
