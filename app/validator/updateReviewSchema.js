const Joi = require(`joi`);

const updateReviewSchema = Joi.object({
    review: Joi.string().min(1).max(1000).required(),
    rating: Joi.number().min(1).max(10).required(),
});

module.exports = {
    updateReviewSchema,
};
