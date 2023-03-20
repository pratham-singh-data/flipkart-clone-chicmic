const Joi = require('joi');
const { ObjectIDRegex, } = require('../util/constants');

const addToCartSchema = Joi.object({
    id: Joi.string().regex(ObjectIDRegex).required(),
    count: Joi.number().min(1).required(),
    coupon: Joi.string().min(1).optional(),
});

module.exports = {
    addToCartSchema,
};
