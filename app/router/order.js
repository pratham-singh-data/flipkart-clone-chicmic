const { Router, } = require('express');
const { readOrder,
    readAllOrders,
    registerDelivery,
    addToWishlist,
    addToCart,
    deleteOrder, } = require('../controller/orderController');
const { checkToken, } = require('../middleware/checkToken');
const { validateBody, } = require('../middleware/validateBody');
const { addToCartSchema, } = require('../validator');

// eslint-disable-next-line new-cap
const orderRouter = Router();

orderRouter.get(`/:id`, readOrder);
orderRouter.get(`/`, checkToken, readAllOrders);
orderRouter.patch(`/delivery/:id`, checkToken, registerDelivery);

orderRouter.patch(`/addToCart`, checkToken,
    validateBody(addToCartSchema),
    addToCart);

orderRouter.patch(`/addToWishlist/:id`, checkToken, addToWishlist);

orderRouter.delete(`/:id`, checkToken, deleteOrder);

module.exports = {
    orderRouter,
};
