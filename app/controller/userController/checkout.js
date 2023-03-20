const { verify, } = require('jsonwebtoken');
const { SECRET_KEY, } = require('../../../config');
const { paymentGateway, } = require('../../../emulators/paymentGateway');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { retrieveAndValidateUser, } =
    require('../../helper/retrieveAndValidateUser');
const { ListingModel,
    CouponModel,
    OrderModel,
    UserModel, } = require('../../models');
const { CredentialsCouldNotBeVerified,
    EmptyCart,
    DataSuccessfullyCreated,
    PaymentNotCompleted, } = require('../../util/messages');

/** checks out user cart
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function checkout(req, res) {
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

    const userData = await retrieveAndValidateUser(id, true, true, true);

    // if cart is empty finish
    if (userData.cart.length === 0) {
        localResponder({
            statusCode: 400,
            message: EmptyCart,
        });

        return;
    }

    let paymentRequired = 0;
    let index = 0;

    for (const item of userData.cart) {
        const listingData = await ListingModel.findById(item.id);

        // if listing no longer exists then skip
        if (! listingData) {
            userData.cart.slice(index, 1);
            continue;
        }

        // if stock is not sufficient skip
        if (listingData.stock < item.count) {
            userData.cart.slice(index, 1);
            continue;
        }

        // reduce stock
        listingData.stock -= item.count;

        // reduce price by coupon
        const couponData = await CouponModel.findById(item.coupon);

        if (couponData) {
            listingData.price -= (listingData.price *
                couponData.discountPercentage);
        }

        paymentRequired += listingData.price;

        await ListingModel.updateOne({
            _id: item.id,
        }, {
            $set: {
                stock: listingData.stock,
            },
        }).exec();

        index++;
    }

    if (! paymentGateway(paymentRequired)) {
        localResponder({
            statusCode: 402,
            message: PaymentNotCompleted,
        });

        return;
    }

    const savedData = await new OrderModel({
        buyer: id,
        items: userData.cart,
        orderedWhen: Date.now(),
    }).save();

    await UserModel.updateOne({
        _id: id,
    }, {
        $set: {
            cart: [],
        },
    }).exec();

    localResponder({
        statusCode: 201,
        message: DataSuccessfullyCreated,
        savedData,
    });
}

module.exports = {
    checkout,
};
