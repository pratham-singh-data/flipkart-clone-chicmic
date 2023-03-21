const { generateLocalSendResponse, } = require('../../helper/responder');
const { CouponModel, } = require(`../../models`);

/** Reads all coupons from database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function readAllCoupons(req, res, next) {
    const localResponder = generateLocalSendResponse(res);

    try {
        // save to database
        const data = await CouponModel.find().exec();

        localResponder({
            statusCode: 200,
            data,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

module.exports = {
    readAllCoupons,
};
