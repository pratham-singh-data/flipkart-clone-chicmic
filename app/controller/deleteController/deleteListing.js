const { verify, } = require('jsonwebtoken');
const { SECRET_KEY, } = require('../../../config');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { retrieveAndValidateUser, } =
    require('../../helper/retrieveAndValidateUser');
const { ListingModel, } = require('../../models');
const { CredentialsCouldNotBeVerified,
    DataSuccessfullyDeleted,
    NonExistentListing, } = require('../../util/messages');

/** Delete listing frpm database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function deleteListing(req, res, next) {
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

    try {
        if (! await ListingModel.findOne({
            _id: idToDelete,
            seller: id,
        }).exec()) {
            localResponder({
                statusCode: 404,
                message: NonExistentListing,
            });
            return;
        }

        await ListingModel.deleteOne({
            _id: idToDelete,
        });

        localResponder({
            statusCode: 200,
            message: DataSuccessfullyDeleted,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

module.exports = {
    deleteListing,
};
