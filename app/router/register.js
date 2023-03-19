const { Router, } = require(`express`);
const { addToCart,
    addToWishlist,
    registerDelivery, } = require('../controller/registerController');
const { checkToken, } = require('../middleware/checkToken');

// eslint-disable-next-line new-cap
const registerRouter = Router();

registerRouter.patch(`/addToCart`, checkToken, addToCart);
registerRouter.patch(`/addToWishlist/:id`, checkToken, addToWishlist);
registerRouter.patch(`/delivery/:id`, checkToken, registerDelivery);

module.exports = registerRouter;
