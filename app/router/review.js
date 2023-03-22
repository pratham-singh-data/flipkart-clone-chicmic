const { Router, } = require('express');
const { deleteReview,
    updateReview,
    registerReview,
    readReviews,
    readAverageRating, } = require('../controller/reviewController');
const { checkToken, } = require('../middleware/checkToken');
const { validateBody, } = require('../middleware/validateBody');
const { updateReviewSchema, registerReviewSchema, } = require('../validator');

// eslint-disable-next-line new-cap
const reviewRouter = Router();

reviewRouter.delete(`/:id`, checkToken, deleteReview);

reviewRouter.put(`/:id`, checkToken,
    validateBody(updateReviewSchema),
    updateReview);

reviewRouter.post(`/`, checkToken,
    validateBody(registerReviewSchema),
    registerReview);

reviewRouter.get(`/:id`, readReviews);
reviewRouter.get(`/:id/averageRating`, readAverageRating);

module.exports = {
    reviewRouter,
};
