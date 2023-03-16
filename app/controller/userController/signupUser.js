const Joi = require(`joi`);
const jwt = require('jsonwebtoken');
const { SECRET_KEY, TokenExpiryTime, } = require('../../../config');
const { hashPassword, } = require('../../helper/hashPassword');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { UserModel, TokenModel, } = require('../../models');
const { DataSuccessfullyCreated,
    EmailOrPhoneNumberInUse, } = require('../../util/messages');
const { signupSchema, } = require('../../validator');

/** Signs up a new user
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function signupUser(req, res) {
    const localResponder = generateLocalSendResponse(res);

    // validate input
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

    body.password = hashPassword(body.password);

    // generate values
    body.memberSince = Date.now();

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
    })) {
        localResponder({
            statusCode: 403,
            message: EmailOrPhoneNumberInUse,
        });

        return;
    }

    // save in database
    const savedData = await new UserModel(body).save();

    const token = jwt.sign({
        id: savedData._id,
    }, SECRET_KEY, {
        expiresIn: TokenExpiryTime,
    });

    localResponder({
        statusCode: 201,
        message: DataSuccessfullyCreated,
        token,
        savedData,
    });

    await new TokenModel({
        user: savedData._id,
        token,
        loginTime: Date.now(),
    }).save();
}

module.exports = {
    signupUser,
};
