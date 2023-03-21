const Joi = require(`joi`);
const { StringLengthMin,
    StringLengthMax,
    Priority, } = require('../util/constants');

const createPromoSchema = Joi.object({
    promoTitle: Joi.string().
        min(StringLengthMin).
        max(StringLengthMax.Normal).
        required(),
    promo: Joi.string().
        min(StringLengthMin).
        max(StringLengthMax.Normal).
        required(),
    promoImage: Joi.string().
        min(StringLengthMin).
        max(StringLengthMax.Normal).
        required(),
    priority: Joi.number().min(Priority.Min).max(Priority.Max).required(),
});

module.exports = {
    createPromoSchema,
};
