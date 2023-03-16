const { verify, } = require('jsonwebtoken');
const { SECRET_KEY, } = require('../../config');
const { generateLocalSendResponse, } = require('../helper/responder');
const { UserModel, } = require('../models');
const { ValidTokenNeeded,
    CredentialsCouldNotBeVerified, } = require('../util/messages');

/** Checks token send by request
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function checkToken(req, res, next) {
    const localResponder = generateLocalSendResponse(res);

    // check that token was sent
    if (! req.headers.token) {
        localResponder({
            statusCode: 403,
            message: ValidTokenNeeded,
        });

        return;
    }

    let id;

    try {
        ({ id, } = verify(req.headers.token, SECRET_KEY));
    } catch (err) {
        localResponder({
            statusCode: 403,
            message: ValidTokenNeeded,
        });

        return;
    }

    // confirm a corresponding user exists
    const userData = await UserModel.findById(id);

    if (! userData) {
        localResponder({
            statusCode: 403,
            message: CredentialsCouldNotBeVerified,
        });

        return;
    }

    // user is valid if they are here
    next();
}

module.exports = {
    checkToken,
};
