const { Router, } = require(`express`);
const { updateAddress,
    updatePromo,
    updateUser,
    updateCoupon,
    updateReview, } = require('../controller/updateController');
const { checkToken, } = require('../middleware/checkToken');
const { handleError, } = require('../middleware/globalErrorHandler');

// eslint-disable-next-line new-cap
const updateRouter = Router();

updateRouter.put(`/address/:id`, checkToken, updateAddress, handleError);
updateRouter.put(`/promo/:id`, checkToken, updatePromo, handleError);
updateRouter.put(`/user`, checkToken, updateUser, handleError);
updateRouter.put(`/coupon/:id`, checkToken, updateCoupon, handleError);
updateRouter.put(`/review/:id`, checkToken, updateReview);

module.exports = updateRouter;
