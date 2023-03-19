const { verify, } = require('jsonwebtoken');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { ListingModel, UserModel, } = require('../../models');
const { NonExtistentListing,
    CredentialsCouldNotBeVerified,
    ItemOutOfStock,
    ItemAddedToCart, } = require('../../util/messages');
const { SECRET_KEY, } = require(`../../../config`);
const Joi = require('joi');
const { addToCartSchema, } = require('../../validator');

/** Adds the listing id to cart
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function addToCart(req, res) {
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

    // check that listing exists
    const data = await ListingModel.findById(body.id).exec();

    if (! data) {
        localResponder({
            statusCode: 404,
            message: NonExtistentListing,
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
}

module.exports = {
    addToCart,
};
