const { generateLocalSendResponse, } = require('../../helper/responder');
const { PromoModel, } = require('../../models');

/** reads all promos in the database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function readAllPromos(req, res) {
    const localResponder = generateLocalSendResponse(res);

    const data = await PromoModel.find().exec();

    localResponder({
        statusCode: 400,
        data,
    });
}

module.exports = {
    readAllPromos,
};
