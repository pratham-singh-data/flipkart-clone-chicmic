const Joi = require(`joi`);

const createPromoSchema = Joi.object({
    promoTitle: Joi.string().min(1).required(),
    promo: Joi.string().min(1).required(),
    promoImage: Joi.string().min(1).required(),
    priority: Joi.number().min(1).max(10).required(),
});

module.exports = {
    createPromoSchema,
};
