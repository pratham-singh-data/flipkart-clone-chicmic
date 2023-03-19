const { generateLocalSendResponse, } = require('../../helper/responder');
const { CategoryModel, } = require(`../../models`);

/** Reads all categoriess from database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function readCategories(req, res) {
    const localResponder = generateLocalSendResponse(res);

    // save to database
    const data = (await CategoryModel.find({}, {
        _id: false,
        name: true,
    }).exec()).map((inp) => inp.name);

    localResponder({
        statusCode: 200,
        data,
    });
}

module.exports = {
    readCategories,
};
