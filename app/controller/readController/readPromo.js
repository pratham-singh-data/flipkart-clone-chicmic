const { generateLocalSendResponse, } = require('../../helper/responder');
const { PromoModel, } = require('../../models');
const { NonExtistentPromo, } = require('../../util/messages');

/** reads the specified promo from params
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function readPromo(req, res) {
    const id = req.params.id;
    const localResponder = generateLocalSendResponse(res);

    const data = await PromoModel.findById(id).exec();

    if (! data) {
        localResponder({
            statusCode: 404,
            message: NonExtistentPromo,
        });

        return;
    }

    localResponder({
        statusCode: 400,
        data,
    });
}

module.exports = {
    readPromo,
};