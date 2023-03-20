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
const { handleError, } = require('../middleware/globalErrorHandler');

// eslint-disable-next-line new-cap
const registerRouter = Router();

registerRouter.patch(`/addToCart`, checkToken, addToCart, handleError);
registerRouter.patch(`/addToWishlist/:id`,
    checkToken, checkIdParam,
    addToWishlist,
    handleError);
registerRouter.patch(`/delivery/:id`,
    checkToken, checkIdParam,
    registerDelivery,
    handleError);
registerRouter.post(`/address`, checkToken, registerAddress, handleError);
registerRouter.patch(`/promoClick/:id`,
    checkIdParam,
    registerPromoClick,
    handleError);
registerRouter.patch(`/promoView/:id`,
    checkIdParam,
    registerPromoView,
    handleError);
registerRouter.post(`/review`, checkToken, registerReview);

module.exports = registerRouter;
