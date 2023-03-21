const { Router, } = require(`express`);
const { addToCart,
    addToWishlist,
    registerDelivery,
    registerAddress,
    registerPromoClick,
    registerPromoView,
    registerReview, } = require('../controller/registerController');
const { checkIdParam, } = require('../middleware/checkIdParam');
const { checkToken, } = require('../middleware/checkToken');

// eslint-disable-next-line new-cap
const registerRouter = Router();
registerRouter.param(`id`, checkIdParam);

registerRouter.patch(`/addToCart`, checkToken, addToCart);
registerRouter.patch(`/addToWishlist/:id`, checkToken, addToWishlist);
registerRouter.patch(`/delivery/:id`, checkToken, registerDelivery);
registerRouter.post(`/address`, checkToken, registerAddress);
registerRouter.patch(`/promoClick/:id`, registerPromoClick);
registerRouter.patch(`/promoView/:id`, registerPromoView);
registerRouter.post(`/review`, checkToken, registerReview);

module.exports = registerRouter;
