const Joi = require(`joi`);
const { StringLengthMax,
    StringLengthMin,
    Rating, } = require('../util/constants');

const updateReviewSchema = Joi.object({
    review: Joi.string().
        min(StringLengthMin).
        max(StringLengthMax.Normal).
        required(),
    rating: Joi.number().min(Rating.Min).max(Rating.Max).required(),
});

module.exports = {
    updateReviewSchema,
};
