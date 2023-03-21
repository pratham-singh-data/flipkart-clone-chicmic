const { Router, } = require(`express`);
const { createCategory,
    createPromo,
    createListing,
    createCoupon, } = require('../controller/createController');
const { checkToken, } = require('../middleware/checkToken');
const { validateBody, } = require('../middleware/validateBody');
const { createPromoSchema,
    createCategorySchema,
    createListingSchema,
    createCouponSchema, } = require('../validator');

// eslint-disable-next-line new-cap
const createRouter = Router();

createRouter.post(`/category`, checkToken,
    validateBody(createCategorySchema),
    createCategory);

createRouter.post(`/promo`, checkToken,
    validateBody(createPromoSchema),
    createPromo);

createRouter.post(`/listing`, checkToken,
    validateBody(createListingSchema),
    createListing);

createRouter.post(`/coupon`, checkToken,
    validateBody(createCouponSchema),
    createCoupon);

module.exports = createRouter;
