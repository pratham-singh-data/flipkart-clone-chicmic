const { Router, } = require(`express`);
const { updateAddress,
    updatePromo,
    updateUser,
    updateCoupon, } = require('../controller/updateController');
const { checkToken, } = require('../middleware/checkToken');

// eslint-disable-next-line new-cap
const updateRouter = Router();

updateRouter.put(`/address/:id`, checkToken, updateAddress);
updateRouter.put(`/promo/:id`, checkToken, updatePromo);
updateRouter.put(`/user`, checkToken, updateUser);
updateRouter.put(`/coupon/:id`, checkToken, updateCoupon);

module.exports = updateRouter;
