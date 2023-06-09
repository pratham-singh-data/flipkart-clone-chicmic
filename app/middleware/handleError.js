const { sendResponse, } = require('../helper/responder');

/** Send users a 500 status code and error message; Error Handler
 * @param {Error} err Error object
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
function handleError(err, req, res, next) {
    sendResponse(res, {
        statusCode: 500,
        message: err.message,
    });
};

module.exports = {
    handleError,
};
