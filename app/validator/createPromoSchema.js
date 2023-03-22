const Joi = require(`joi`);
const { STRINGLENGTHMIN,
    STRINGLENGTHMAX,
    PROMOPRIORITY, } = require('../util/constants');

const createPromoSchema = Joi.object({
    promoTitle: Joi.string().
        min(STRINGLENGTHMIN).
        max(STRINGLENGTHMAX.NORMAL).
        required(),
    promo: Joi.string().
        min(STRINGLENGTHMIN).
        max(STRINGLENGTHMAX.NORMAL).
        required(),
    promoImage: Joi.string().
        min(STRINGLENGTHMIN).
        max(STRINGLENGTHMAX.NORMAL).
        required(),
    priority: Joi.number().
        min(PROMOPRIORITY.MIN).
        max(PROMOPRIORITY.MAX).
        required(),
});

module.exports = {
    createPromoSchema,
};
