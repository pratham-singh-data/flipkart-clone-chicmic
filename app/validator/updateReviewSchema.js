const Joi = require(`joi`);
const { STRINGLENGTHMIN,
    STRINGLENGTHMAX,
    REVIEWRATING, } = require('../util/constants');

const updateReviewSchema = Joi.object({
    review: Joi.string().
        min(STRINGLENGTHMIN).
        max(STRINGLENGTHMAX.NORMAL).
        required(),
    rating: Joi.number().min(REVIEWRATING.MIN).max(REVIEWRATING.MAX).required(),
});

module.exports = {
    updateReviewSchema,
};
