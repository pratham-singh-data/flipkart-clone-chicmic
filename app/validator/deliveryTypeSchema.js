const Joi = require('joi');
const { STRINGLENGTHMIN, STRINGLENGTHMAX, } = require('../util/constants');

const deliveryTypeSchema = Joi.object({
    type: Joi.string().
        min(STRINGLENGTHMIN).
        max(STRINGLENGTHMAX.NORMAL).
        required(),
    deliveryCharge: Joi.number().min(0).required(),
    deliveryTime: Joi.number().min(1).required(),
    deliveryTimeUnits: Joi.string().valid(`Years`,
        `Months`,
        `Days`,
        `Hours`,
        `Not Applicable`).required(),
});

module.exports = {
    deliveryTypeSchema,
};
