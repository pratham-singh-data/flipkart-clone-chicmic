const { generateLocalSendResponse, } = require('../../helper/responder');
const { PromoModel, } = require('../../models');

/** reads a random promo from the database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function readRandomPromo(req, res) {
    const localResponder = generateLocalSendResponse(res);

    const data = await PromoModel.find().exec();

    
}

module.exports = {
    readRandomPromo,
};
