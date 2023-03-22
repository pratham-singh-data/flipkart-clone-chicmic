const { verify, } = require('jsonwebtoken');
const { SECRET_KEY, } = require('../../config');
const { generateLocalSendResponse, } = require('../helper/responder');
const { AddressModel, } = require('../models');
const { DataSuccessfullyUpdated,
    AddressDoesNotBelong,
    NonExistentAddress,
    CredentialsCouldNotBeVerified,
    DataSuccessfullyCreated,
    DataSuccessfullyDeleted, } = require('../util/messages');

/** Updates an address in the database; id from query
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function updateAddress(req, res, next) {
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
    const body = req.body;

    try {
        const addressData = await AddressModel.findById(idToUpdate).exec();

        if (! addressData) {
            localResponder({
                statusCode: 400,
                message: NonExistentAddress,
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
    } catch (e) {
        next(new Error(e.message));
    }
}

/** Registers a user's address
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function registerAddress(req, res, next) {
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
    const body = req.body;

    try {
        // add to database
        body.user = id;
        const savedData = await new AddressModel(body).save();

        localResponder({
            statusCode: 201,
            message: DataSuccessfullyCreated,
            savedData,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** Reads all address belonging to the curren user
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function readAllAddresses(req, res, next) {
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

    try {
        const data = await AddressModel.find({
            user: id,
        }).exec();

        localResponder({
            statusCode: 200,
            data,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** Reads address of given id
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next functione
 */
async function readAddress(req, res, next) {
    const localResponder = generateLocalSendResponse(res);
    const id = req.params.id;

    try {
        const data = await AddressModel.findById(id).exec();

        if (! data) {
            localResponder({
                statusCode: 404,
                message: NonExistentAddress,
            });

            return;
        }

        localResponder({
            statusCode: 200,
            data,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** Deletes an address belonging to the current user
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function deleteAddress(req, res, next) {
    const idToDelete = req.params.id;
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

    try {
        const addressData = await AddressModel.findById(idToDelete).exec();

        if (! addressData) {
            localResponder({
                statusCode: 404,
                message: NonExistentAddress,
            });

            return;
        }

        // do not permit if order does not belong to current user
        if (String(addressData.user) !== id) {
            localResponder({
                statusCode: 403,
                message: AddressDoesNotBelong,
            });

            return;
        }

        await AddressModel.deleteOne({
            _id: idToDelete,
        }).exec();

        localResponder({
            statusCode: 200,
            message: DataSuccessfullyDeleted,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

module.exports = {
    updateAddress,
    registerAddress,
    readAllAddresses,
    readAddress,
    deleteAddress,
};