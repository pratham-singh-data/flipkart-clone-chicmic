const { verify, } = require('jsonwebtoken');
const { SECRET_KEY, } = require('../../../config');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { CredentialsCouldNotBeVerified,
    DataSuccessfullyCreated, } = require('../../util/messages');
const { registerAddressSchema, } = require('../../validator');
const Joi = require('joi');
const { AddressModel, } = require('../../models');

/** Registers a user's address
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function registerAddress(req, res) {
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

    // validate body
    let body;

    try {
        body = Joi.attempt(req.body, registerAddressSchema);
    } catch (err) {
        localResponder({
            statusCode: 400,
            message: err.message,
        });

        return;
    }

    // add to database
    body.user = id;
    const savedData = await new AddressModel(body).save();

    localResponder({
        statusCode: 201,
        message: DataSuccessfullyCreated,
        savedData,
    });
}

module.exports = {
    registerAddress,
};
