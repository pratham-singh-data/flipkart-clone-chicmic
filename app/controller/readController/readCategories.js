const { generateLocalSendResponse, } = require('../../helper/responder');
const { CategoryModel, } = require(`../../models`);

/** Reads all categoriess from database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function readCategories(req, res, next) {
    const localResponder = generateLocalSendResponse(res);

    try {
        // read from database
        const data = (await CategoryModel.find({}, {
            _id: false,
            name: true,
        }).exec()).map((inp) => inp.name);

        localResponder({
            statusCode: 200,
            data,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

module.exports = {
    readCategories,
};
