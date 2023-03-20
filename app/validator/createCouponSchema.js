const Joi = require(`joi`);

const createCouponSchema = Joi.object({
    couponCode: Joi.string().min(1).max(1000).uppercase().required(),
    couponName: Joi.string().min(1).max(1000).required(),
    discountPercentage: Joi.number().min(1).max(100).required(),
    validity: Joi.number().min(1).required(),
    applicability: Joi.array().
        items(Joi.string().min(1)).
        unique().
        min(1).
        required(),
});

module.exports = {
    createCouponSchema,
};
