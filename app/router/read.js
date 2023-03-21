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

// eslint-disable-next-line new-cap
const readRouter = Router();

readRouter.get(`/listings`, readAllListings);
readRouter.get(`/listing/:id`, checkIdParam, readListing);
readRouter.get(`/promo/random`, readRandomPromo);
readRouter.get(`/promo/:id`, checkIdParam, readPromo);
readRouter.get(`/promos`, readAllPromos);
readRouter.get(`/coupon/:id`, checkIdParam, readCoupon);
readRouter.get(`/coupons`, readAllCoupons);
readRouter.get(`/categories`, readCategories);
readRouter.get(`/addresses`, checkToken, readAllAddresses);
readRouter.get(`/address/:id`, checkToken,
    checkIdParam,
    readAddress);
readRouter.get(`/user`, checkToken, readUser);
readRouter.get(`/order/:id`, checkIdParam, readOrder);
readRouter.get(`/orders`, checkToken, readAllOrders);
readRouter.get(`/reviews/:id`, checkIdParam, readReviews);
readRouter.get(`/averageRating/:id`, checkIdParam, readAverageRating);

module.exports = readRouter;
