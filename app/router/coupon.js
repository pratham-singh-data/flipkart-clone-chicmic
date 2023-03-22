const { Router, } = require(`express`);
const { updateCoupon,
    createCoupon,
    readCoupon,
    readAllCoupons,
    deleteCoupon, } = require('../controller/couponController');
const { validateBody, checkToken, } = require('../middleware');
const { createCouponSchema, } = require('../validator');

// eslint-disable-next-line new-cap
const couponRouter = Router();

couponRouter.put(`/:id`, checkToken,
    validateBody(createCouponSchema),
    updateCoupon);

couponRouter.post(`/`, checkToken,
    validateBody(createCouponSchema),
    createCoupon);

couponRouter.delete(`/:id`, checkToken, deleteCoupon);
couponRouter.get(`/:id`, readCoupon);
couponRouter.get(`/`, readAllCoupons);


module.exports = {
    couponRouter,
};
