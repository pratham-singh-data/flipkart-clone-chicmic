const { verify, } = require('jsonwebtoken');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { ListingModel, UserModel, CouponModel, } = require('../../models');
const { NonExistentListing,
    CredentialsCouldNotBeVerified,
    ItemOutOfStock,
    ItemAddedToCart,
    CouponExpired,
    CouponDoesNotApply,
    NonExistentCoupon, } = require('../../util/messages');
const { SECRET_KEY, } = require(`../../../config`);
const Joi = require('joi');
const { addToCartSchema, } = require('../../validator');

/** Adds the listing id to cart
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function addToCart(req, res, next) {
    const localResponder = generateLocalSendResponse(res);

    let body;

    // validate schema
    try {
        body = Joi.attempt(req.body, addToCartSchema);
    } catch (err) {
        localResponder({
            statusCode: 400,
            message: err.message,
        });

        return;
    }

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
        // verify coupon if given
        if (body.coupon) {
            const couponData = await CouponModel.findById(body.coupon).exec();

            // if coupon doex not exist
            if (! couponData) {
                localResponder({
                    statusCode: 400,
                    message: NonExistentCoupon,
                });

                return;
            }

            // check that coupon is valid for this listing
            if (! couponData.applicability.includes(body.id)) {
                localResponder({
                    statusCode: 400,
                    message: CouponDoesNotApply,
                });

                return;
            }

            // check that coupon is still valid
            if (couponData.sinceWhen.setDate(couponData.sinceWhen.getDate() +
                couponData.validity) < Date.now()) {
                localResponder({
                    statusCode: 400,
                    message: CouponExpired,
                });

                return;
            }
        }

        // check that listing exists
        const data = await ListingModel.findById(body.id).exec();

        if (! data) {
            localResponder({
                statusCode: 404,
                message: NonExistentListing,
            });

            return;
        }

        // check that item is in stock
        if (data.stock < body.count) {
            localResponder({
                statusCode: 400,
                message: ItemOutOfStock,
            });

            return;
        }

        // register in database; stock will only reduce on checkout
        await UserModel.updateOne({
            _id: id,
        }, {
            $push: {
                cart: body,
            },
        }).exec();

        localResponder({
            statusCode: 400,
            message: ItemAddedToCart,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

module.exports = {
    addToCart,
};
