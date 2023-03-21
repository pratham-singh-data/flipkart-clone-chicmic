const Joi = require('joi');
const { sendResponse, } = require('../helper/responder');

/** Checks that the id in param can be cast to a mongodb ObjectId
 * @param {Object} schema Joi validation schema
 * @return {Function} Middleware t=function that validates via given schema
 */
function validateBody(schema) {
    return (req, res, next) => {
        // validate and update request body
        try {
            req.body = Joi.attempt(req.body, schema);
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
    validateBody,
};
