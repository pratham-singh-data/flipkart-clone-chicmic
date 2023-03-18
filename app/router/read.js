const { Router, } = require(`express`);
const { readListing,
    readAllListings, } = require('../controller/readController');

// eslint-disable-next-line new-cap
const readRouter = Router();

readRouter.get(`/listings`, readAllListings);
readRouter.get(`/listing/:id`, readListing);

module.exports = readRouter;
