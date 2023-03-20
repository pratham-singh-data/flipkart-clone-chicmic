const { Router, } = require(`express`);
const { createCategory,
    createPromo,
    createListing,
    createCoupon, } = require('../controller/createController');
const { checkToken, } = require('../middleware/checkToken');
const { handleError, } = require('../middleware/globalErrorHandler');

// eslint-disable-next-line new-cap
const createRouter = Router();

createRouter.post(`/category`, checkToken, createCategory, handleError);
createRouter.post(`/promo`, checkToken, createPromo, handleError);
createRouter.post(`/listing`, checkToken, createListing, handleError);
createRouter.post(`/coupon`, checkToken, createCoupon, handleError);

module.exports = createRouter;
