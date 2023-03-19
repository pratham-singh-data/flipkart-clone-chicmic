const { generateLocalSendResponse, } = require('../../helper/responder');
const { PromoModel, } = require('../../models');
const { NonExistentPromo,
    DataSuccessfullyUpdated, } = require('../../util/messages');

/** Register promo view
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function registerPromoView(req, res) {
    const localResponder = generateLocalSendResponse(res);
    const id = req.params.id;

    // check that promo exists
    const data = await PromoModel.findById(id).exec();

    if (! data) {
        localResponder({
            statusCode: 404,
            message: NonExistentPromo,
        });

        return;
    }

    // update database
    await PromoModel.updateOne({
        _id: id,
    }, {
        $set: {
            views: data.views + 1,
        },
    }).exec();

    localResponder({
        statusCode: 200,
        message: DataSuccessfullyUpdated,
    });
}

module.exports = {
    registerPromoView,
};
