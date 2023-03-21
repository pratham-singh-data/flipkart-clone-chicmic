const { generateLocalSendResponse, } = require('../../helper/responder');
const { PromoModel, } = require('../../models');
const { NonExistentPromo, } = require('../../util/messages');

/** reads the specified promo from params
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function readPromo(req, res, next) {
    const id = req.params.id;
    const localResponder = generateLocalSendResponse(res);

    try {
        const data = await PromoModel.findById(id).exec();

        if (! data) {
            localResponder({
                statusCode: 404,
                message: NonExistentPromo,
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
    readPromo,
};
