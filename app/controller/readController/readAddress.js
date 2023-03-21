const { generateLocalSendResponse, } = require('../../helper/responder');
const { AddressModel, } = require(`../../models`);
const { NonExistentAddress, } = require('../../util/messages');

/** Reads address of given id
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next functione
 */
async function readAddress(req, res, next) {
    const localResponder = generateLocalSendResponse(res);
    const id = req.params.id;

    try {
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
    } catch (e) {
        next(new Error(e.message));
    }
}

module.exports = {
    readAddress,
};
