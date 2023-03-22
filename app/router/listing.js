const { Router, } = require(`express`);
const { readAllListings,
    readListing,
    createListing,
    deleteListing,
    readCategories,
    createCategory, } = require('../controller/listingController');
const { checkToken, } = require('../middleware/checkToken');
const { validateBody, } = require('../middleware/validateBody');
const { createListingSchema, createCategorySchema, } = require('../validator');

// eslint-disable-next-line new-cap
const listingRouter = Router();

listingRouter.get(`/`, readAllListings);
listingRouter.get(`/categories`, readCategories);
listingRouter.get(`/:id`, readListing);

listingRouter.post(`/`, checkToken,
    validateBody(createListingSchema),
    createListing);

listingRouter.delete(`/:id`, checkToken, deleteListing);


listingRouter.post(`/category`, checkToken,
    validateBody(createCategorySchema),
    createCategory);

module.exports = {
    listingRouter,
};
