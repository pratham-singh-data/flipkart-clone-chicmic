const { Router, } = require(`express`);
const { updateCoupon,
    createCoupon,
    readCoupon,
    readAllCoupons,
    deleteCoupon, } = require('../controller/couponController');
const { validateBody, checkToken, } = require('../middleware');
const { TOKENTYPES, } = require('../util/constants');
const { createCouponSchema, } = require('../validator');

// eslint-disable-next-line new-cap
const couponRouter = Router();

couponRouter.put(`/:id`, checkToken(TOKENTYPES.LOGIN),
    validateBody(createCouponSchema),
    updateCoupon);

couponRouter.post(`/`, checkToken(TOKENTYPES.LOGIN),
    validateBody(createCouponSchema),
    createCoupon);

couponRouter.delete(`/:id`, checkToken(TOKENTYPES.LOGIN), deleteCoupon);
couponRouter.get(`/:id`, readCoupon);
couponRouter.get(`/`, readAllCoupons);


module.exports = {
    couponRouter,
};
