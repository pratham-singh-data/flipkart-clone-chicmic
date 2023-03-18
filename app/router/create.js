const { Router, } = require(`express`);
const { createCategory,
    createPromo,
    createListing, } = require('../controller/createController');
const { checkToken, } = require('../middleware/checkToken');

// eslint-disable-next-line new-cap
const createRouter = Router();

createRouter.post(`/category`, checkToken, createCategory);
createRouter.post(`/promo`, checkToken, createPromo);
createRouter.post(`/listing`, checkToken, createListing);

module.exports = createRouter;
