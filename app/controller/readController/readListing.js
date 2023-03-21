const { generateLocalSendResponse, } = require('../../helper/responder');
const { ListingModel, } = require('../../models');
const { NonExistentListing, } = require('../../util/messages');

/** reads the specified listing from params
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function readListing(req, res, next) {
    const id = req.params.id;
    const localResponder = generateLocalSendResponse(res);

    try {
        const data = await ListingModel.findById(id).exec();

        if (! data) {
            localResponder({
                statusCode: 404,
                message: NonExistentListing,
            });

            return;
        }

        localResponder({
            statusCode: 400,
            data,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

module.exports = {
    readListing,
};
