const Joi = require(`joi`);
const { STRINGLENGTHMIN, STRINGLENGTHMAX, } = require('../util/constants');

const createCouponSchema = Joi.object({
    couponCode: Joi.string().
        min(STRINGLENGTHMIN).
        max(STRINGLENGTHMAX.NORMAL).
        uppercase().
        required(),
    couponName: Joi.string().
        min(STRINGLENGTHMIN).
        max(STRINGLENGTHMAX.NORMAL).
        required(),
    discountPercentage: Joi.number().min(1).max(100).required(),
    validity: Joi.number().min(1).required(),
    applicability: Joi.array().
        items(Joi.string().min(STRINGLENGTHMIN)).
        unique().
        min(1).
        required(),
});

module.exports = {
    createCouponSchema,
};
