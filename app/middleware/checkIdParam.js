const { isValidObjectId, } = require('mongoose');
const { sendResponse, } = require('../helper/responder');
const { IDCANNOTBECAST, } = require('../util/messages');

/** Checks that the id in param can be cast to a mongodb ObjectId
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function checkIdParam(req, res, next) {
    const id = req.params.id;

    if (! isValidObjectId(id)) {
        sendResponse(res, {
            statusCode: 403,
            message: IDCANNOTBECAST,
        });

        return;
    }

    // if control reachers here then move to next function
    next();
}

module.exports = {
    checkIdParam,
};
