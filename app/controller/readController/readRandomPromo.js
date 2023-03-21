const { generateLocalSendResponse, } = require('../../helper/responder');
const { PromoModel, } = require('../../models');

/** reads a random promo from the database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function readRandomPromo(req, res, next) {
    const localResponder = generateLocalSendResponse(res);

    const data = await PromoModel.find({}, {
        _id: true,
        priority: true,
    }).exec();

    console.log(data);
}

module.exports = {
    readRandomPromo,
};
