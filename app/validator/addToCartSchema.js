const Joi = require('joi');

const addToCartSchema = Joi.object({
    id: Joi.string().min(1).required(),
    count: Joi.number().min(1).required(),
    coupon: Joi.string().min(1).optional(),
});

module.exports = {
    addToCartSchema,
};
