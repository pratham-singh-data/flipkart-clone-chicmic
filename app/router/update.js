const { Router, } = require(`express`);
const { updateAddress,
    updatePromo,
    updateUser,
    updateCoupon,
    updateReview, } = require('../controller/updateController');
const { checkIdParam, } = require('../middleware/checkIdParam');
const { checkToken, } = require('../middleware/checkToken');
const { handleError, } = require('../middleware/globalErrorHandler');

// eslint-disable-next-line new-cap
const updateRouter = Router();

updateRouter.put(`/address/:id`, checkToken,
    checkIdParam,
    updateAddress,
    handleError);
updateRouter.put(`/promo/:id`, checkToken,
    checkIdParam,
    updatePromo,
    handleError);
updateRouter.put(`/user`, checkToken, updateUser, handleError);
updateRouter.put(`/coupon/:id`, checkToken,
    checkIdParam,
    updateCoupon,
    handleError);
updateRouter.put(`/review/:id`, checkToken, checkIdParam, updateReview);

module.exports = updateRouter;
