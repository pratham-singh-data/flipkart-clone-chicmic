const Joi = require('joi');
const { ObjectIDRegex, } = require('../util/constants');

const addToCartSchema = Joi.object({
    id: Joi.string().regex(ObjectIDRegex).required(),
    count: Joi.number().min(1).required(),
    coupon: Joi.string().regex(ObjectIDRegex).optional(),
});

module.exports = {
    addToCartSchema,
};
