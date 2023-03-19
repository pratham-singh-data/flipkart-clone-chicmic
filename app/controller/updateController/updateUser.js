const Joi = require('joi');
const { verify, } = require('jsonwebtoken');
const { SECRET_KEY, } = require('../../../config');
const { hashPassword, } = require('../../helper/hashPassword');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { UserModel, } = require('../../models');
const { CredentialsCouldNotBeVerified,
    DataSuccessfullyUpdated,
    EmailOrPhoneNumberInUse, } = require('../../util/messages');
const { signupSchema, } = require('../../validator');

/** Updates user data
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function updateUser(req, res) {
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
        body = Joi.attempt(req.body, signupSchema);
    } catch (err) {
        localResponder({
            statusCode: 400,
            message: err.message,
        });

        return;
    }

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
}

module.exports = {
    updateUser,
};
