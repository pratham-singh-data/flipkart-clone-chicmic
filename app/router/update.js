const { Router, } = require(`express`);
const { updateAddress,
    updatePromo,
    updateUser,
    updateCoupon,
    updateReview, } = require('../controller/updateController');
const { checkIdParam, } = require('../middleware/checkIdParam');
const { checkToken, } = require('../middleware/checkToken');

// eslint-disable-next-line new-cap
const updateRouter = Router();

updateRouter.put(`/address/:id`, checkToken,
    checkIdParam,
    updateAddress);
updateRouter.put(`/promo/:id`, checkToken,
    checkIdParam,
    updatePromo);
updateRouter.put(`/user`, checkToken, updateUser);
updateRouter.put(`/coupon/:id`, checkToken,
    checkIdParam,
    updateCoupon);
updateRouter.put(`/review/:id`, checkToken, checkIdParam, updateReview);

module.exports = updateRouter;
