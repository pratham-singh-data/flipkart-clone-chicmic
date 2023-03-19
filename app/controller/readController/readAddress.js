const { generateLocalSendResponse, } = require('../../helper/responder');
const { AddressModel, } = require(`../../models`);
const { NonExistentAddress, } = require('../../util/messages');

/** Reads address of given id
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function readAddress(req, res) {
    const localResponder = generateLocalSendResponse(res);
    const id = req.params.id;

    const data = await AddressModel.findById(id).exec();

    if (! data) {
        localResponder({
            statusCode: 404,
            message: NonExistentAddress,
        });

        return;
    }

    localResponder({
        statusCode: 200,
        data,
    });
}

module.exports = {
    readAddress,
};
