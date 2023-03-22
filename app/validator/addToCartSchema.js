const Joi = require('joi');
const { OBJECTIDREGEX, } = require('../util/constants');
const { deliveryTypeSchema, } = require('./deliveryTypeSchema');

const addToCartSchema = Joi.object({
    id: Joi.string().regex(OBJECTIDREGEX).required(),
    count: Joi.number().min(1).required(),
    coupon: Joi.string().regex(OBJECTIDREGEX).optional(),
    deliveryType: deliveryTypeSchema,
});

module.exports = {
    addToCartSchema,
};
