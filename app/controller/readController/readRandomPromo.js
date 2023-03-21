const { sendResponse, } = require('../../helper/responder');
const { PromoModel, } = require('../../models');
const { getWeightedRandom, } = require('../../util/getWeightedRandom');

/** reads a random promo from the database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function readRandomPromo(req, res, next) {
    try {
        const promos = await PromoModel.find({}, {
            _id: true,
            priority: true,
        }).exec();

        const randomId = getWeightedRandom(promos.map((inp) => {
            return [ String(inp._id), inp.priority, ];
        }));

        sendResponse(req.res, {
            statusCode: 200,
            data: await PromoModel.findById(randomId),
        });
    } catch (err) {
        next(new Error(err.message));
    }
}

module.exports = {
    readRandomPromo,
};
