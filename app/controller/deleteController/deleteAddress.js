const { verify, } = require('jsonwebtoken');
const { SECRET_KEY, } = require('../../../config');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { AddressModel, } = require('../../models');
const { CredentialsCouldNotBeVerified,
    DataSuccessfullyDeleted,
    NonExistentAddress,
    AddressDoesNotBelong, } = require('../../util/messages');

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
    deleteAddress,
};
