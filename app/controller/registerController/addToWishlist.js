const { verify, } = require('jsonwebtoken');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { ListingModel, UserModel, } = require('../../models');
const { NonExistentListing,
    CredentialsCouldNotBeVerified,
    ItemAddedToWishlist, } = require('../../util/messages');
const { SECRET_KEY, } = require(`../../../config`);

/** Adds the listing id to wishlisy
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function addToWishlist(req, res, next) {
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

    try {
        // check that listing exists
        const data = await ListingModel.findById(idToAdd).exec();

        if (! data) {
            localResponder({
                statusCode: 404,
                message: NonExistentListing,
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
    } catch (e) {
        next(new Error(e.message));
    }
}

module.exports = {
    addToWishlist,
};
