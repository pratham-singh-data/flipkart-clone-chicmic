const jwt = require('jsonwebtoken');
const { SECRET_KEY, TokenExpiryTime, } = require('../../../config');
const { hashPassword, } = require('../../helper/hashPassword');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { UserModel, TokenModel, } = require('../../models');
const { DataSuccessfullyCreated,
    EmailOrPhoneNumberInUse, } = require('../../util/messages');

/** Signs up a new user
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function signupUser(req, res, next) {
    const localResponder = generateLocalSendResponse(res);

    // validate input
    const body = req.body;

    body.password = hashPassword(body.password);

    // generate values
    body.memberSince = Date.now();

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
        }).exec()) {
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

        await new TokenModel({
            user: savedData._id,
            token,
            loginTime: Date.now(),
        }).save();

        localResponder({
            statusCode: 201,
            message: DataSuccessfullyCreated,
            token,
            savedData,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

module.exports = {
    signupUser,
};
