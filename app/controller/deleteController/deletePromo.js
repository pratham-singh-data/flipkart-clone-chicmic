const { verify, } = require('jsonwebtoken');
const { SECRET_KEY, } = require('../../../config');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { retrieveAndValidateUser, } =
    require('../../helper/retrieveAndValidateUser');
const { PromoModel, } = require('../../models');
const { CredentialsCouldNotBeVerified,
    NonExistentPromo,
    DataSuccessfullyDeleted, } = require('../../util/messages');

/** Delete coupon frpm database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function deletePromo(req, res) {
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

    if (! await PromoModel.findById(idToDelete).exec()) {
        localResponder({
            statusCode: 404,
            message: NonExistentPromo,
        });

        return;
    }

    await PromoModel.deleteOne({
        _id: idToDelete,
    }).exec();

    localResponder({
        statusCode: 200,
        message: DataSuccessfullyDeleted,
    });
}

module.exports = {
    deletePromo,
};
