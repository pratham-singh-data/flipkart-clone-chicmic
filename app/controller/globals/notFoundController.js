const { sendResponse, } = require('../../helper/responder');

/** Handles a non existent endpoint being accessed
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
function NotFoundController(req, res) {
    sendResponse(res, {
        statusCode: 404,
        message: `This endpoint does not exist.`,
    });
}

module.exports = {
    NotFoundController,
};
