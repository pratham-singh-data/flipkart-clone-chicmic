const Joi = require('joi');
const { verify, } = require('jsonwebtoken');
const { SECRET_KEY, } = require('../../../config');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { AddressModel, } = require('../../models');
const { NonExtistentAddress,
    AddressDoesNotBelong,
    DataSuccessfullyUpdated,
    CredentialsCouldNotBeVerified, } = require('../../util/messages');
const { registerAddressSchema, } = require('../../validator');

/** Updates an address in the database; id from query
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function updateAddress(req, res) {
    const localResponder = generateLocalSendResponse(res);
    const idToUpdate = req.params.id;

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

    const addressData = await AddressModel.findById(idToUpdate).exec();

    if (! addressData) {
        localResponder({
            statusCode: 400,
            message: NonExtistentAddress,
        });

        return;
    }

    // can only update if address belongs to current user
    if (String(addressData.user) !== id) {
        localResponder({
            statusCode: 403,
            message: AddressDoesNotBelong,
        });

        return;
    }

    await AddressModel.updateOne({
        _id: idToUpdate,
    }, {
        $set: body,
    }).exec(),

    // update database
    localResponder({
        statusCode: 200,
        message: DataSuccessfullyUpdated,
    });
}

module.exports = {
    updateAddress,
};