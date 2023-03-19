const { Router, } = require(`express`);
const { addToCart,
    addToWishlist,
    registerDelivery,
    registerAddress,
    registerPromoClick, } = require('../controller/registerController');
const { checkToken, } = require('../middleware/checkToken');

// eslint-disable-next-line new-cap
const registerRouter = Router();

registerRouter.patch(`/addToCart`, checkToken, addToCart);
registerRouter.patch(`/addToWishlist/:id`, checkToken, addToWishlist);
registerRouter.patch(`/delivery/:id`, checkToken, registerDelivery);
registerRouter.post(`/address`, checkToken, registerAddress);
registerRouter.patch(`/promoClick/:id`, registerPromoClick);

module.exports = registerRouter;
