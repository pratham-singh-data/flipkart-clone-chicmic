const { verify, } = require('jsonwebtoken');
const { SECRET_KEY, } = require('../../../config');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { UserModel, } = require('../../models');
const { CredentialsCouldNotBeVerified,
    DataSuccessfullyDeleted, } = require('../../util/messages');

/** Deletes the current user
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function deleteUser(req, res, next) {
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
        await UserModel.deleteOne({
            _id: id,
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
    deleteUser,
};
