const { generateLocalSendResponse, } = require('../../helper/responder');
const { CouponModel, } = require(`../../models`);

/** Reads all coupons from database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function readAllCoupons(req, res) {
    const localResponder = generateLocalSendResponse(res);

    // save to database
    const data = await CouponModel.find().exec();

    localResponder({
        statusCode: 200,
        data,
    });
}

module.exports = {
    readAllCoupons,
};
