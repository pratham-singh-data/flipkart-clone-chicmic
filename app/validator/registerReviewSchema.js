const Joi = require(`joi`);
const { ObjectIDRegex, } = require('../util/constants');

const registerReviewSchema = Joi.object({
    listing: Joi.string().regex(ObjectIDRegex).required(),
    review: Joi.string().min(1).max(1000).required(),
    rating: Joi.number().min(1).max(10).required(),
});

module.exports = {
    registerReviewSchema,
};
