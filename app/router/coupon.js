const { Router, } = require(`express`);
const { updateCoupon,
    createCoupon,
    readCoupon,
    readAllCoupons,
    deleteCoupon, } = require('../controller/couponController');
const { checkToken, } = require('../middleware/checkToken');
const { validateBody, } = require('../middleware/validateBody');
const { createCouponSchema, } = require('../validator');

// eslint-disable-next-line new-cap
const couponRouter = Router();

couponRouter.put(`/update/:id`, checkToken,
    validateBody(createCouponSchema),
    updateCoupon);

couponRouter.post(`/`, checkToken,
    validateBody(createCouponSchema),
    createCoupon);

couponRouter.delete(`/delete/:id`, checkToken, deleteCoupon);
couponRouter.get(`/read/:id`, readCoupon);
couponRouter.get(`/read`, readAllCoupons);


module.exports = couponRouter;
