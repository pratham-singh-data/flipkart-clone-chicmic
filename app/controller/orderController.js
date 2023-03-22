const { verify, } = require('jsonwebtoken');
const { SECRET_KEY, } = require('../../config');
const { generateLocalSendResponse, } = require('../helper/responder');
const { retrieveAndValidateUser, } =
    require('../helper/retrieveAndValidateUser');
const { ItemAddedToWishlist,
    NonExistentListing,
    CredentialsCouldNotBeVerified,
    ItemAddedToCart,
    CouponExpired,
    CouponDoesNotApply,
    NonExistentCoupon,
    ItemOutOfStock,
    DataSuccessfullyUpdated,
    OrderAlreadyDelivered,
    NonExistentOrder,
    OrderDoesNotBelong,
    DataSuccessfullyDeleted,
    ItemRemovedFromWishlist,
    ItemRemovedFromCart, } = require('../util/messages');
const { Types: { ObjectId, }, } = require(`mongoose`);
const querystring = require(`querystring`);
const { deleteFromOrdersById,
    findFromListingsById,
    findFromCouponsById,
    findFromOrdersById,
    updateOrdersById,
    updateUsersById,
    runAggregateOnOrders, } = require('../service');

/** Adds the listing id to wishlist
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
        const data = await findFromListingsById(idToAdd);

        if (! data) {
            localResponder({
                statusCode: 404,
                message: NonExistentListing,
            });

            return;
        }

        // out of stock items may be added to wishlist

        // register in database
        await updateUsersById(id, {
            $addToSet: {
                wishlist: idToAdd,
            },
        });

        localResponder({
            statusCode: 400,
            message: ItemAddedToWishlist,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** Remove the listing id from wishlist
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function removeFromWishlist(req, res, next) {
    const localResponder = generateLocalSendResponse(res);
    const idToRemove = req.params.id;

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
        // update the database
        await updateUsersById(id, {
            $pull: {
                wishlist: idToRemove,
            },
        });

        localResponder({
            statusCode: 400,
            message: ItemRemovedFromWishlist,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** Adds the listing id to cart
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function addToCart(req, res, next) {
    const localResponder = generateLocalSendResponse(res);

    const body = req.body;

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
            const couponData = await findFromCouponsById(body.coupon);

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
            if (couponData.createdAt.setDate(couponData.createdAt.getDate() +
                couponData.validity) < Date.now()) {
                localResponder({
                    statusCode: 400,
                    message: CouponExpired,
                });

                return;
            }
        }

        // check that listing exists
        const data = await findFromListingsById(body.id);

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
        await updateUsersById(id, {
            $push: {
                cart: body,
            },
        });

        localResponder({
            statusCode: 400,
            message: ItemAddedToCart,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** Remove the item id from wishlist
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function removeFromCart(req, res, next) {
    const localResponder = generateLocalSendResponse(res);
    const idToRemove = req.params.id;

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

    console.log(JSON.stringify({
        $pull: {
            cart: {
                $elemMatch: {
                    _id: idToRemove,
                },
            },
        },
    }));

    try {
        // update the database
        await updateUsersById(id, {
            $pull: {
                cart: {
                    $elemMatch: {
                        _id: new ObjectId(idToRemove),
                    },
                },
            },
        });

        localResponder({
            statusCode: 400,
            message: ItemRemovedFromCart,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** Registers an order's delivery
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function registerDelivery(req, res, next) {
    const orderId = req.params.id;
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

    // this operation can only be done by an admin or agent
    try {
        await retrieveAndValidateUser(id, false, true, true);
    } catch (err) {
        localResponder({
            statusCode: 400,
            message: err.message,
        });

        return;
    }

    try {
        const orderData = await findFromOrdersById(orderId);

        // check that the corresponding order exists
        if (! orderData) {
            localResponder({
                statusCode: 400,
                message: NonExistentOrder,
            });

            return;
        }

        // order should not already be delivered.
        if (orderData.deliveryTime) {
            localResponder({
                statusCode: 400,
                message: OrderAlreadyDelivered,
            });

            return;
        }

        // update order
        await updateOrdersById(orderId, {
            $set: {
                deliveryTime: Date.now(),
                deliveryAgent: id,
            },
        });

        localResponder({
            statusCode: 200,
            message: DataSuccessfullyUpdated,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** Reads all orders in database
 * you may send next, skip and user (whether current user only) in query
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function readAllOrders(req, res, next) {
    const localResponder = generateLocalSendResponse(res);

    const query = querystring.parse(req.originalUrl.slice(
        req.originalUrl.indexOf(`orders?`) + 7), `&`, `=`);
    const skip = Number(query.skip ?? 0);
    const limit = Number(query.limit ?? 10);
    const user = query.user;

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
        const pipeline = [];

        // filter category
        if (user !== `false`) {
            pipeline.push({
                $match: {
                    buyer: new ObjectId(id),
                },
            });
        }

        // pagination
        pipeline.push(...[
            {
                $skip: parseInt(skip),
            },

            {
                $limit: parseInt(limit),
            },
        ]);

        // execute query
        const data = await runAggregateOnOrders(pipeline);

        localResponder({
            statusCode: 200,
            data,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** Reads order of given id
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function readOrder(req, res, next) {
    const localResponder = generateLocalSendResponse(res);
    const id = req.params.id;

    try {
        const data = await findFromOrdersById(id);

        if (! data) {
            localResponder({
                statusCode: 404,
                message: NonExistentOrder,
            });

            return;
        }

        localResponder({
            statusCode: 200,
            data,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** Deletes an undelivered order from database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function deleteOrder(req, res, next) {
    const idToDelete = req.params.id;
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

    try {
        const orderData = await findFromOrdersById(idToDelete);

        if (! orderData) {
            localResponder({
                statusCode: 404,
                message: NonExistentOrder,
            });

            return;
        }

        // do not permit if order does not belong to current user
        if (String(orderData.buyer) !== id) {
            localResponder({
                statusCode: 403,
                message: OrderDoesNotBelong,
            });

            return;
        }

        // do notr allow if order has been delivered
        if (orderData.deliveryTime) {
            localResponder({
                statusCode: 403,
                message: OrderAlreadyDelivered,
            });

            return;
        }

        await deleteFromOrdersById(idToDelete);

        localResponder({
            statusCode: 200,
            message: DataSuccessfullyDeleted,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

module.exports = {
    addToWishlist,
    removeFromWishlist,
    addToCart,
    removeFromCart,
    registerDelivery,
    readAllOrders,
    readOrder,
    deleteOrder,
};
