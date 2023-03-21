const { sendResponse, } = require('../helper/responder');
const { NonExistentEndpoint, } = require('../util/messages');

/** Handles a non existent endpoint being accessed
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
function NotFoundController(req, res) {
    sendResponse(res, {
        statusCode: 404,
        message: NonExistentEndpoint,
    });
}

module.exports = {
    NotFoundController,
};
