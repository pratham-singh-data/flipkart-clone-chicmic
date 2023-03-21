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
updateRouter.param(`id`, checkIdParam);

updateRouter.put(`/address/:id`, checkToken, updateAddress);
updateRouter.put(`/promo/:id`, checkToken, updatePromo);
updateRouter.put(`/user`, checkToken, updateUser);
updateRouter.put(`/coupon/:id`, checkToken, updateCoupon);
updateRouter.put(`/review/:id`, checkToken, updateReview);

module.exports = updateRouter;
