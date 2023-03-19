const { verify, } = require('jsonwebtoken');
const { SECRET_KEY, } = require('../../../config');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { AddressModel, } = require(`../../models`);
const { CredentialsCouldNotBeVerified, } = require('../../util/messages');

/** Reads all address belonging to the curren user
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function readAllAddresses(req, res) {
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

    const data = await AddressModel.find({
        user: id,
    }).exec();

    localResponder({
        statusCode: 200,
        data,
    });
}

module.exports = {
    readAllAddresses,
};
