const { generateLocalSendResponse, } = require('../../helper/responder');
const { OrderModel, } = require(`../../models`);
const { NonExtistentOrder, } = require('../../util/messages');

/** Reads order of given id
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function readOrder(req, res) {
    const localResponder = generateLocalSendResponse(res);
    const id = req.params.id;

    const data = await OrderModel.findById(id).exec();

    if (! data) {
        localResponder({
            statusCode: 404,
            message: NonExtistentOrder,
        });

        return;
    }

    localResponder({
        statusCode: 200,
        data,
    });
}

module.exports = {
    readOrder,
};
