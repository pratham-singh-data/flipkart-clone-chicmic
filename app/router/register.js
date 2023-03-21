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
const { validateBody, } = require('../middleware/validateBody');
const { addToCartSchema,
    registerAddressSchema,
    registerReviewSchema, } = require('../validator');

// eslint-disable-next-line new-cap
const registerRouter = Router();
registerRouter.param(`id`, checkIdParam);

registerRouter.patch(`/addToCart`, checkToken,
    validateBody(addToCartSchema),
    addToCart);

registerRouter.patch(`/addToWishlist/:id`, checkToken, addToWishlist);

registerRouter.patch(`/delivery/:id`, checkToken, registerDelivery);

registerRouter.post(`/address`, checkToken,
    validateBody(registerAddressSchema),
    registerAddress);

registerRouter.patch(`/promoClick/:id`, registerPromoClick);

registerRouter.patch(`/promoView/:id`, registerPromoView);

registerRouter.post(`/review`, checkToken,
    validateBody(registerReviewSchema),
    registerReview);

module.exports = registerRouter;
