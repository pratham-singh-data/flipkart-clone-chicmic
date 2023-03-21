const { verify, } = require('jsonwebtoken');
const { SECRET_KEY, } = require('../../../config');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { OrderModel, } = require('../../models');
const { CredentialsCouldNotBeVerified,
    DataSuccessfullyDeleted,
    OrderDoesNotBelong,
    OrderAlreadyDelivered,
    NonExistentOrder, } = require('../../util/messages');

/** Deletes an undelivered order from database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function deleteOrder(req, res, next) {
    const idToDelete = req.params.id;
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

    try {
        const orderData = await OrderModel.findById(idToDelete).exec();

        if (! orderData) {
            localResponder({
                statusCode: 404,
                message: NonExistentOrder,
            });

            return;
        }

        // do not permit if order does not belong to current user
        if (String(orderData.buyer) !== id) {
            localResponder({
                statusCode: 403,
                message: OrderDoesNotBelong,
            });

            return;
        }

        // do notr allow if order has been delivered
        if (orderData.deliveryTime) {
            localResponder({
                statusCode: 403,
                message: OrderAlreadyDelivered,
            });

            return;
        }

        await OrderModel.deleteOne({
            _id: idToDelete,
        }).exec();

        localResponder({
            statusCode: 200,
            message: DataSuccessfullyDeleted,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

module.exports = {
    deleteOrder,
};
