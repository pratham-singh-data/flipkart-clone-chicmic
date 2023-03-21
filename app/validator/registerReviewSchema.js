const Joi = require(`joi`);
const { ObjectIDRegex,
    StringLengthMin,
    StringLengthMax,
    Rating, } = require('../util/constants');

const registerReviewSchema = Joi.object({
    listing: Joi.string().regex(ObjectIDRegex).required(),
    review: Joi.string().
        min(StringLengthMin).
        max(StringLengthMax.Normal).
        required(),
    rating: Joi.number().min(Rating.Min).max(Rating.Max).required(),
});

module.exports = {
    registerReviewSchema,
};
