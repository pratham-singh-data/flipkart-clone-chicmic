const Joi = require('joi');
const { sendResponse, } = require('../helper/responder');

/** Validates query of request
 * @param {Object} schema Joi validation schema
 * @return {Function} Middleware t=function that validates via given schema
 */
function validateQuery(schema) {
    /** Middleware to validate query
     * @param {Request} req Express request object
     * @param {Response} res Express response object
     * @param {Function} next Express next function
     */
    return (req, res, next) => {
        // validate and update request query
        try {
            req.query = Joi.attempt(req.query, schema);
        } catch (err) {
            sendResponse(res, {
                statusCode: 400,
                message: err.message,
            });

            return;
        }

        // continue to next middleware
        next();
    };
}

module.exports = {
    validateQuery,
};
