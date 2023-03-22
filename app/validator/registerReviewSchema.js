const Joi = require(`joi`);
const { OBJECTIDREGEX,
    STRINGLENGTHMIN,
    STRINGLENGTHMAX,
    REVIEWRATING, } = require('../util/constants');

const registerReviewSchema = Joi.object({
    listing: Joi.string().regex(OBJECTIDREGEX).required(),
    review: Joi.string().
        min(STRINGLENGTHMIN).
        max(STRINGLENGTHMAX.NORMAL).
        required(),
    rating: Joi.number().min(REVIEWRATING.MIN).max(REVIEWRATING.MAX).required(),
});

module.exports = {
    registerReviewSchema,
};
