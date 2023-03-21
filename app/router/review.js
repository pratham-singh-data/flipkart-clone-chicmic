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

reviewRouter.delete(`/review/:id`, checkToken, deleteReview);

reviewRouter.put(`/review/:id`, checkToken,
    validateBody(updateReviewSchema),
    updateReview);

reviewRouter.post(`/review`, checkToken,
    validateBody(registerReviewSchema),
    registerReview);

reviewRouter.get(`/reviews/:id`, readReviews);
reviewRouter.get(`/averageRating/:id`, readAverageRating);

module.exports = {
    reviewRouter,
};
