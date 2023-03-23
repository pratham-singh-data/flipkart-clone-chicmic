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
const { addToCartSchema, orderQuerySchema, } = require('../validator');

// eslint-disable-next-line new-cap
const orderRouter = Router();

orderRouter.get(`/:id`, readOrder);
orderRouter.get(`/`, checkToken,
    validateQuery(orderQuerySchema),
    readAllOrders);
orderRouter.patch(`/delivery/:id`, checkToken, registerDelivery);

orderRouter.patch(`/addToCart`, checkToken,
    validateBody(addToCartSchema),
    addToCart);

orderRouter.patch(`/addToWishlist/:id`, checkToken, addToWishlist);
orderRouter.patch(`/removeFromWishlist/:id`, checkToken, removeFromWishlist);
orderRouter.patch(`/removeFromCart/:id`, checkToken, removeFromCart);

orderRouter.delete(`/:id`, checkToken, deleteOrder);

module.exports = {
    orderRouter,
};
