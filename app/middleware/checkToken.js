const { verify, } = require('jsonwebtoken');
const { SECRET_KEY, } = require('../../config');
const { generateLocalSendResponse, } = require('../helper/responder');
const { findFromUsersById, } = require('../service');
const { VALIDTOKENNEEDED,
    CREDENTIALSCOULDNOTBEVERIFIED, } = require('../util/messages');

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
            message: VALIDTOKENNEEDED,
        });

        return;
    }

    let id;

    try {
        ({ id, } = verify(req.headers.token, SECRET_KEY));
    } catch (err) {
        localResponder({
            statusCode: 403,
            message: VALIDTOKENNEEDED,
        });

        return;
    }

    // confirm a corresponding user exists
    const userData = await findFromUsersById(id);

    if (! userData) {
        localResponder({
            statusCode: 403,
            message: CREDENTIALSCOULDNOTBEVERIFIED,
        });

        return;
    }

    // user is valid if they are here
    next();
}

module.exports = {
    checkToken,
};
