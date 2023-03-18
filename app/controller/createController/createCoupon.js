const Joi = require('joi');
const { verify, } = require('jsonwebtoken');
const { SECRET_KEY, } = require('../../../config');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { retrieveAndValidateUser, } =
require('../../helper/retrieveAndValidateUser');
const { DataSuccessfullyCreated,
    CredentialsCouldNotBeVerified,
    InvalidListingsDetected, } = require('../../util/messages');
const { createCouponSchema, } = require('../../validator');
const { CouponModel, ListingModel, } = require(`../../models`);

/** Creates a coupon in database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function createCoupon(req, res) {
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

    // get data from body
    let body;

    try {
        body = Joi.attempt(req.body, createCouponSchema);
    } catch (err) {
        localResponder({
            statusCode: 400,
            message: err.message,
        });

        return;
    }

    // generate data
    body.sinceWhen = Date.now();

    // confirm that all items in applicability exiss in listings
    const applyTargets = await ListingModel.find({
        _id: {
            $in: body.applicability,
        },
    });

    if (applyTargets.length !== body.applicability.length) {
        localResponder({
            statusCode: 400,
            message: InvalidListingsDetected,
        });

        return;
    }

    // save to database
    const savedData = await new CouponModel(body).save();

    localResponder({
        statusCode: 201,
        message: DataSuccessfullyCreated,
        savedData,
    });
}

module.exports = {
    createCoupon,
};
