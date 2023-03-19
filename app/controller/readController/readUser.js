const { verify, } = require('jsonwebtoken');
const { SECRET_KEY, } = require('../../../config');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { retrieveAndValidateUser, } =
    require('../../helper/retrieveAndValidateUser');
const { CredentialsCouldNotBeVerified, } = require('../../util/messages');

/** Reads a user's data; may only read the current user
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function readUser(req, res) {
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

    const data = await retrieveAndValidateUser(id);

    localResponder({
        statusCode: 200,
        data,
    });
}

module.exports = {
    readUser,
};
