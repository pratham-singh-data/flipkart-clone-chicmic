const Joi = require(`joi`);

const updateReviewSchema = Joi.object({
    review: Joi.string().min(1).required(),
    rating: Joi.number().min(1).required(),
});

module.exports = {
    updateReviewSchema,
};
