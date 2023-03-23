const { Router, } = require(`express`);
const { readAllListings,
    readListing,
    createListing,
    deleteListing,
    readCategories,
    createCategory,
    updateListing, } = require('../controller/listingController');
const { checkToken, validateBody, validateQuery, } = require('../middleware');
const { createListingSchema,
    createCategorySchema,
    listingQuerySchema, } = require('../validator');

// eslint-disable-next-line new-cap
const listingRouter = Router();

listingRouter.get(`/`, validateQuery(listingQuerySchema), readAllListings);
listingRouter.get(`/categories`, readCategories);
listingRouter.get(`/:id`, readListing);

listingRouter.post(`/`, checkToken,
    validateBody(createListingSchema),
    createListing);

listingRouter.delete(`/:id`, checkToken, deleteListing);

listingRouter.put(`/:id`, checkToken,
    validateBody(createListingSchema),
    updateListing);


listingRouter.post(`/category`, checkToken,
    validateBody(createCategorySchema),
    createCategory);

module.exports = {
    listingRouter,
};
