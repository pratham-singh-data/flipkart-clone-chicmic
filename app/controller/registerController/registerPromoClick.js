const { generateLocalSendResponse, } = require('../../helper/responder');
const { PromoModel, } = require('../../models');
const { NonExistentPromo,
    DataSuccessfullyUpdated, } = require('../../util/messages');

/** Register promo click
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function registerPromoClick(req, res, next) {
    const localResponder = generateLocalSendResponse(res);
    const id = req.params.id;

    try {
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
                clicks: data.clicks + 1,
            },
        }).exec();

        localResponder({
            statusCode: 200,
            message: DataSuccessfullyUpdated,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

module.exports = {
    registerPromoClick,
};
