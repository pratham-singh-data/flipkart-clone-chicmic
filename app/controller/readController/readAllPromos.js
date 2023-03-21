const { generateLocalSendResponse, } = require('../../helper/responder');
const { PromoModel, } = require('../../models');

/** reads all promos in the database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function readAllPromos(req, res, next) {
    const localResponder = generateLocalSendResponse(res);

    try {
        const data = await PromoModel.find().exec();

        localResponder({
            statusCode: 400,
            data,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

module.exports = {
    readAllPromos,
};
