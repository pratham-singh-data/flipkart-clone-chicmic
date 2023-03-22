const Joi = require('joi');
const { ObjectIDRegex, } = require('../util/constants');
const { deliveryTypeSchema, } = require('./deliveryTypeSchema');

const addToCartSchema = Joi.object({
    id: Joi.string().regex(ObjectIDRegex).required(),
    count: Joi.number().min(1).required(),
    coupon: Joi.string().regex(ObjectIDRegex).optional(),
    deliveryType: deliveryTypeSchema,
});

module.exports = {
    addToCartSchema,
};
