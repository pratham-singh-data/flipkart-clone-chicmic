const Joi = require(`joi`);
const jwt = require('jsonwebtoken');
const { SECRET_KEY, TokenExpiryTime, } = require('../../../config');
const { hashPassword, } = require('../../helper/hashPassword');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { UserModel, TokenModel, } = require('../../models');
const { CredentialsCouldNotBeVerified,
    SuccessfulLogin, } = require('../../util/messages');
const { loginSchema, } = require('../../validator');

/** Logs in an existing user
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function loginUser(req, res, next) {
    const localResponder = generateLocalSendResponse(res);

    // validate input
    let body;

    try {
        body = Joi.attempt(req.body, loginSchema);
    } catch (err) {
        localResponder({
            statusCode: 400,
            message: err.message,
        });
        return;
    }

    body.password = hashPassword(body.password);

    try {
        // get user data
        const userData = await UserModel.findOne(body).exec();

        if (! userData) {
            localResponder({
                statusCode: 400,
                message: CredentialsCouldNotBeVerified,
            });
            return;
        }

        const token = jwt.sign({
            id: userData._id,
        }, SECRET_KEY, {
            expiresIn: TokenExpiryTime,
        });

        await new TokenModel({
            user: userData._id,
            token,
            loginTime: Date.now(),
        }).save();

        localResponder({
            statusCode: 200,
            message: SuccessfulLogin,
            token,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

module.exports = {
    loginUser,
};
