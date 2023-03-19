const { generateLocalSendResponse, } = require('../../helper/responder');
const { CouponModel, } = require('../../models');
const { NonExistentCoupon, } = require('../../util/messages');

/** reads coupon of given id
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function readCoupon(req, res) {
    const id = req.params.id;
    const localResponder = generateLocalSendResponse(res);

    const data = await CouponModel.findById(id).exec();

    if (! data) {
        localResponder({
            statusCode: 404,
            message: NonExistentCoupon,
        });

        return;
    }

    localResponder({
        statusCode: 200,
        data,
    });
}

module.exports = {
    readCoupon,
};
