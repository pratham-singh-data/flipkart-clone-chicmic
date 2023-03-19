const { generateLocalSendResponse, } = require('../../helper/responder');
const { PromoModel, } = require('../../models');
const { NonExtistentPromo,
    DataSuccessfullyUpdated, } = require('../../util/messages');

/** Register promo click
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function registerPromoClick(req, res) {
    const localResponder = generateLocalSendResponse(res);
    const id = req.params.id;

    // check that promo exists
    const data = await PromoModel.findById(id).exec();

    if (! data) {
        localResponder({
            statusCode: 404,
            message: NonExtistentPromo,
        });

        return;
    }

    // register in database; stock will only reduce on checkout
    await PromoModel.updateOne({
        _id: id,
    }, {
        $set: {
            clicks: data.clicks + 1,
        },
    }).exec();

    localResponder({
        statusCode: 200,
        message: DataSuccessfullyUpdated,
    });
}

module.exports = {
    registerPromoClick,
};
