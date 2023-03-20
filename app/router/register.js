const { Router, } = require(`express`);
const { addToCart,
    addToWishlist,
    registerDelivery,
    registerAddress,
    registerPromoClick,
    registerPromoView, } = require('../controller/registerController');
const { checkToken, } = require('../middleware/checkToken');
const { handleError, } = require('../middleware/globalErrorHandler');

// eslint-disable-next-line new-cap
const registerRouter = Router();

registerRouter.patch(`/addToCart`, checkToken, addToCart, handleError);
registerRouter.patch(`/addToWishlist/:id`,
    checkToken,
    addToWishlist,
    handleError);
registerRouter.patch(`/delivery/:id`,
    checkToken,
    registerDelivery,
    handleError);
registerRouter.post(`/address`, checkToken, registerAddress, handleError);
registerRouter.patch(`/promoClick/:id`, registerPromoClick, handleError);
registerRouter.patch(`/promoView/:id`, registerPromoView, handleError);

module.exports = registerRouter;
