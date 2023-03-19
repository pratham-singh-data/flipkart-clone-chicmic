const { Router, } = require(`express`);
const { readListing,
    readAllListings,
    readPromo,
    readAllPromos,
    readRandomPromo,
    readCoupon,
    readCategories, } = require('../controller/readController');

// eslint-disable-next-line new-cap
const readRouter = Router();

readRouter.get(`/listings`, readAllListings);
readRouter.get(`/listing/:id`, readListing);
readRouter.get(`/promo/random`, readRandomPromo);
readRouter.get(`/promo/:id`, readPromo);
readRouter.get(`/promos`, readAllPromos);
readRouter.get(`/coupon/:id`, readCoupon);
readRouter.get(`/categories`, readCategories);

module.exports = readRouter;
