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

registerRouter.patch(`/addToCart`, checkToken, addToCart);
registerRouter.patch(`/addToWishlist/:id`,
    checkToken, checkIdParam,
    addToWishlist);
registerRouter.patch(`/delivery/:id`,
    checkToken, checkIdParam,
    registerDelivery);
registerRouter.post(`/address`, checkToken, registerAddress);
registerRouter.patch(`/promoClick/:id`,
    checkIdParam,
    registerPromoClick);
registerRouter.patch(`/promoView/:id`,
    checkIdParam,
    registerPromoView);
registerRouter.post(`/review`, checkToken, registerReview);

module.exports = registerRouter;
