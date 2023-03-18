const Joi = require(`joi`);

const createPromoSchema = Joi.object({
    promo: Joi.string().min(1).required(),
    promoImage: Joi.string().min(1).required(),
    priority: Joi.number().min(1).max(10).required(),
});

module.exports = {
    createPromoSchema,
};
