const Joi = require(`joi`);
const { ObjectIDRegex, } = require('../util/constants');

const registerReviewSchema = Joi.object({
    listing: Joi.string().regex(ObjectIDRegex).required(),
    review: Joi.string().min(1).required(),
    rating: Joi.number().min(1).required(),
});

module.exports = {
    registerReviewSchema,
};
