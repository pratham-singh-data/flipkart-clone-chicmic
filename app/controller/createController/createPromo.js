const Joi = require('joi');
const { verify, } = require('jsonwebtoken');
const { SECRET_KEY, } = require('../../../config');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { retrieveAndValidateUser, } =
require('../../helper/retrieveAndValidateUser');
const { PromoModel, } = require('../../models');
const { DataSuccessfullyCreated,
    CredentialsCouldNotBeVerified, } = require('../../util/messages');
const { createPromoSchema, } = require('../../validator');

/** Creates a promo in database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function createPromo(req, res, next) {
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

    // this operation can only be done by an admin
    try {
        await retrieveAndValidateUser(id, false, true, false);
    } catch (err) {
        localResponder({
            statusCode: 400,
            message: err.message,
        });

        return;
    }

    // get data from body
    let body;

    try {
        body = Joi.attempt(req.body, createPromoSchema);
    } catch (err) {
        localResponder({
            statusCode: 400,
            message: err.message,
        });

        return;
    }

    // generate data
    body.clicks = body.views = 0;
    body.user = id;

    try {
        // save to database
        const savedData = await new PromoModel(body).save();

        localResponder({
            statusCode: 201,
            message: DataSuccessfullyCreated,
            savedData,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

module.exports = {
    createPromo,
};
