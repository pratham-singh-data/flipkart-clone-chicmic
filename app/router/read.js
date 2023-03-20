const { Router, } = require(`express`);
const { readListing,
    readAllListings,
    readPromo,
    readAllPromos,
    readRandomPromo,
    readCoupon,
    readCategories,
    readAllCoupons,
    readAllAddresses,
    readAddress,
    readUser,
    readOrder,
    readAllOrders,
    readReviews,
    readAverageRating, } = require('../controller/readController');
const { checkIdParam, } = require('../middleware/checkIdParam');
const { checkToken, } = require('../middleware/checkToken');
const { handleError, } = require('../middleware/globalErrorHandler');

// eslint-disable-next-line new-cap
const readRouter = Router();

readRouter.get(`/listings`, readAllListings, handleError);
readRouter.get(`/listing/:id`, checkIdParam, readListing, handleError);
readRouter.get(`/promo/random`, readRandomPromo, handleError);
readRouter.get(`/promo/:id`, checkIdParam, readPromo, handleError);
readRouter.get(`/promos`, readAllPromos, handleError);
readRouter.get(`/coupon/:id`, checkIdParam, readCoupon, handleError);
readRouter.get(`/coupons`, readAllCoupons, handleError);
readRouter.get(`/categories`, readCategories, handleError);
readRouter.get(`/addresses`, checkToken, readAllAddresses, handleError);
readRouter.get(`/address/:id`, checkToken,
    checkIdParam,
    readAddress,
    handleError);
readRouter.get(`/user`, checkToken, readUser, handleError);
readRouter.get(`/order/:id`, checkIdParam, readOrder, handleError);
readRouter.get(`/orders`, checkToken, readAllOrders, handleError);
readRouter.get(`/reviews/:id`, checkIdParam, readReviews);
readRouter.get(`/averageRating/:id`, checkIdParam, readAverageRating);

module.exports = readRouter;
