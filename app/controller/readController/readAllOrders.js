const { verify, } = require('jsonwebtoken');
const { Types: { ObjectId, }, } = require('mongoose');
const querystring = require(`querystring`);
const { SECRET_KEY, } = require('../../../config');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { OrderModel, } = require('../../models');
const { CredentialsCouldNotBeVerified, } = require('../../util/messages');

/** Reads all orders in database
 * you may send next, skip and user (whether current user only) in query
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function readAllOrders(req, res) {
    const localResponder = generateLocalSendResponse(res);

    const query = querystring.parse(req.originalUrl.slice(
        req.originalUrl.indexOf(`orders?`) + 7), `&`, `=`);
    const skip = Number(query.skip ?? 0);
    const limit = Number(query.limit ?? 10);
    const user = query.user;

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

    const agg = OrderModel.aggregate();

    // filter category
    if (user !== `false`) {
        agg.match({
            buyer: new ObjectId(id),
        });
    }

    // pagination
    agg.append([
        {
            $skip: parseInt(skip),
        },

        {
            $limit: parseInt(limit),
        },
    ]);

    // execute query
    const data = await agg.exec();

    localResponder({
        statusCode: 200,
        data,
    });
}

module.exports = {
    readAllOrders,
};
