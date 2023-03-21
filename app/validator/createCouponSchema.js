const Joi = require(`joi`);
const { StringLengthMin, StringLengthMax, } = require('../util/constants');

const createCouponSchema = Joi.object({
    couponCode: Joi.string().
        min(StringLengthMin).
        max(StringLengthMax.Normal).
        uppercase().
        required(),
    couponName: Joi.string().
        min(StringLengthMin).
        max(StringLengthMax.Normal).
        required(),
    discountPercentage: Joi.number().min(1).max(100).required(),
    validity: Joi.number().min(1).required(),
    applicability: Joi.array().
        items(Joi.string().min(StringLengthMin)).
        unique().
        min(1).
        required(),
});

module.exports = {
    createCouponSchema,
};
