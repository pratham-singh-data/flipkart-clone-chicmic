const { verify, } = require('jsonwebtoken');
const { SECRET_KEY, } = require('../../../config');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { UserModel, } = require('../../models');
const { CredentialsCouldNotBeVerified,
    DataSuccessfullyDeleted, } = require('../../util/messages');

/** Deletes the current user
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function deleteUser(req, res) {
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

    await UserModel.deleteOne({
        _id: id,
    }).exec();

    localResponder({
        statusCode: 200,
        message: DataSuccessfullyDeleted,
    });
}

module.exports = {
    deleteUser,
};
