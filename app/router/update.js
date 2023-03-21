const { Router, } = require(`express`);
const { updateAddress,
    updatePromo,
    updateUser,
    updateCoupon,
    updateReview, } = require('../controller/updateController');
const { checkIdParam, } = require('../middleware/checkIdParam');
const { checkToken, } = require('../middleware/checkToken');
const { validateBody, } = require('../middleware/validateBody');
const { registerAddressSchema,
    createPromoSchema,
    signupSchema,
    createCouponSchema,
    updateReviewSchema, } = require('../validator');

// eslint-disable-next-line new-cap
const updateRouter = Router();
updateRouter.param(`id`, checkIdParam);

updateRouter.put(`/address/:id`, checkToken,
    validateBody(registerAddressSchema),
    updateAddress);

updateRouter.put(`/promo/:id`, checkToken,
    validateBody(createPromoSchema),
    updatePromo);

updateRouter.put(`/user`, checkToken,
    validateBody(signupSchema),
    updateUser);

updateRouter.put(`/coupon/:id`, checkToken,
    validateBody(createCouponSchema),
    updateCoupon);

updateRouter.put(`/review/:id`, checkToken,
    validateBody(updateReviewSchema),
    updateReview);

module.exports = updateRouter;
