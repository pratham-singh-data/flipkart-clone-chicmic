const { Router, } = require('express');
const { deleteReview,
    updateReview,
    registerReview,
    readReviews,
    readAverageRating, } = require('../controller/reviewController');
const { checkToken, validateBody, } = require('../middleware');
const { TOKENTYPES, } = require('../util/constants');
const { updateReviewSchema, registerReviewSchema, } = require('../validator');

// eslint-disable-next-line new-cap
const reviewRouter = Router();

reviewRouter.delete(`/:id`, checkToken(TOKENTYPES.LOGIN), deleteReview);

reviewRouter.put(`/:id`, checkToken(TOKENTYPES.LOGIN),
    validateBody(updateReviewSchema),
    updateReview);

reviewRouter.post(`/`, checkToken(TOKENTYPES.LOGIN),
    validateBody(registerReviewSchema),
    registerReview);

reviewRouter.get(`/:id`, readReviews);
reviewRouter.get(`/:id/averageRating`, readAverageRating);

module.exports = {
    reviewRouter,
};
