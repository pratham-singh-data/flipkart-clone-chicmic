const Joi = require('joi');
const { verify, } = require('jsonwebtoken');
const { SECRET_KEY, } = require('../../../config');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { retrieveAndValidateUser, } =
require('../../helper/retrieveAndValidateUser');
const { CredentialsCouldNotBeVerified,
    InvalidListingsDetected,
    CouponCodeRegistered,
    DataSuccessfullyUpdated, } = require('../../util/messages');
const { createCouponSchema, } = require('../../validator');
const { CouponModel, ListingModel, } = require(`../../models`);

/** Update coupon id in database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function updateCoupon(req, res) {
    const localResponder = generateLocalSendResponse(res);
    const idToUpdate = req.params.id;

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

    // only save if thecoupon code is unique
    if (await CouponModel.findOne({
        couponCode: body.couponCode,
        _id: {
            $ne: idToUpdate,
        },
    }).exec()) {
        localResponder({
            statusCode: 400,
            message: CouponCodeRegistered,
        });

        return;
    }

    // save to database
    await CouponModel.updateOne({
        _id: idToUpdate,
    }, {
        $set: body,
    }).exec();

    localResponder({
        statusCode: 200,
        message: DataSuccessfullyUpdated,
    });
}

module.exports = {
    updateCoupon,
};
