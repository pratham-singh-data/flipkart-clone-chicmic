const { Router, } = require('express');
const { readOrder,
    readAllOrders,
    registerDelivery,
    addToWishlist,
    addToCart,
    deleteOrder,
    removeFromWishlist,
    removeFromCart, } = require('../controller/orderController');
const { checkToken, validateBody, validateQuery, } = require('../middleware');
const { TOKENTYPES, } = require('../util/constants');
const { addToCartSchema, orderQuerySchema, } = require('../validator');

// eslint-disable-next-line new-cap
const orderRouter = Router();

orderRouter.get(`/:id`, checkToken(TOKENTYPES.LOGIN), readOrder);
orderRouter.get(`/`, checkToken(TOKENTYPES.LOGIN),
    validateQuery(orderQuerySchema),
    readAllOrders);
orderRouter.patch(`/delivery/:id`,
    checkToken(TOKENTYPES.LOGIN),
    registerDelivery);

orderRouter.patch(`/addToCart`, checkToken(TOKENTYPES.LOGIN),
    validateBody(addToCartSchema),
    addToCart);

orderRouter.patch(`/addToWishlist/:id`,
    checkToken(TOKENTYPES.LOGIN),
    addToWishlist);
orderRouter.patch(`/removeFromWishlist/:id`,
    checkToken(TOKENTYPES.LOGIN),
    removeFromWishlist);
orderRouter.patch(`/removeFromCart/:id`,
    checkToken(TOKENTYPES.LOGIN),
    removeFromCart);

orderRouter.delete(`/:id`, checkToken(TOKENTYPES.LOGIN), deleteOrder);

module.exports = {
    orderRouter,
};
