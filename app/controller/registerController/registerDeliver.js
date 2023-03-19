const { verify, } = require('jsonwebtoken');
const { SECRET_KEY, } = require('../../../config');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { retrieveAndValidateUser, } =
require('../../helper/retrieveAndValidateUser');
const { CredentialsCouldNotBeVerified,
    NonExistentOrder,
    OrderAlreadyDelivered,
    DataSuccessfullyUpdated, } = require('../../util/messages');
const { OrderModel, } = require(`../../models`);

/** Registers an order's delivery
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function registerDelivery(req, res) {
    const orderId = req.params.id;
    const localResponder = generateLocalSendResponse(res);

    // just in case the token expired between calls
    let id;

    try {
        ({ id, } = verify(req.headers.token, SECRET_KEY));
    } catch (err) {
        localResponder({
            statusCode: 403,
            message: CredentialsCouldNotBeVerified,
        });

        return;
    }

    // this operation can only be done by an admin or agent
    try {
        await retrieveAndValidateUser(id, false, true, true);
    } catch (err) {
        localResponder({
            statusCode: 400,
            message: err.message,
        });

        return;
    }

    const orderData = await OrderModel.findById(orderId).exec();

    // check that the corresponding order exists
    if (! orderData) {
        localResponder({
            statusCode: 400,
            message: NonExistentOrder,
        });

        return;
    }

    // order should not already be delivered.
    if (orderData.deliveryTime) {
        localResponder({
            statusCode: 400,
            message: OrderAlreadyDelivered,
        });

        return;
    }

    // update order
    await OrderModel.updateOne({
        _id: orderId,
    }, {
        $set: {
            deliveryTime: Date.now(),
            deliveryAgent: id,
        },
    }).exec();

    localResponder({
        statusCode: 200,
        message: DataSuccessfullyUpdated,
    });
}

module.exports = {
    registerDelivery,
};
