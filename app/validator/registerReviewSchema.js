const Joi = require(`joi`);

const registerReviewSchema = Joi.object({
    listing: Joi.string().min(1).required(),
    review: Joi.string().min(1).required(),
    rating: Joi.number().min(1).required(),
});

module.exports = {
    registerReviewSchema,
};
