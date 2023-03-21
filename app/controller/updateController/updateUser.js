const { verify, } = require('jsonwebtoken');
const { SECRET_KEY, } = require('../../../config');
const { hashPassword, } = require('../../helper/hashPassword');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { UserModel, } = require('../../models');
const { CredentialsCouldNotBeVerified,
    DataSuccessfullyUpdated,
    EmailOrPhoneNumberInUse, } = require('../../util/messages');

/** Updates user data
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function updateUser(req, res, next) {
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
        // check that both phone number and email are unique
        if (await UserModel.findOne({
            $or: [
                {
                    phoneNumber: body.phoneNumber,
                },

                {
                    email: body.email,
                },
            ],

            _id: {
                $ne: id,
            },
        }).exec()) {
            localResponder({
                statusCode: 403,
                message: EmailOrPhoneNumberInUse,
            });

            return;
        }

        await UserModel.updateOne({
            _id: id,
        }, {
            $set: {
                ...body,
                password: hashPassword(body.password),
            },
        }).exec();

        localResponder({
            statusCode: 200,
            message: DataSuccessfullyUpdated,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

module.exports = {
    updateUser,
};
