const { verify, } = require('jsonwebtoken');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { ListingModel, UserModel, } = require('../../models');
const { NonExtistentListing,
    CredentialsCouldNotBeVerified,
    ItemAddedToWishlist, } = require('../../util/messages');
const { SECRET_KEY, } = require(`../../../config`);

/** Adds the listing id to wishlisy
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function addToWishlist(req, res) {
    const localResponder = generateLocalSendResponse(res);
    const idToAdd = req.params.id;

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
    const data = await ListingModel.findById(idToAdd).exec();

    if (! data) {
        localResponder({
            statusCode: 404,
            message: NonExtistentListing,
        });

        return;
    }

    // out of stock items may be added to wishlist

    // register in database
    await UserModel.updateOne({
        _id: id,
    }, {
        $addToSet: {
            wishlist: idToAdd,
        },
    }).exec();

    localResponder({
        statusCode: 400,
        message: ItemAddedToWishlist,
    });
}

module.exports = {
    addToWishlist,
};
