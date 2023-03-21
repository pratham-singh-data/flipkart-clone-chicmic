const Joi = require(`joi`);
const { StringLengthMin, StringLengthMax, } = require('../util/constants');

const registerAddressSchema = Joi.object({
    address: Joi.string().
        min(StringLengthMin).
        max(StringLengthMax.Normal).
        lowercase().
        required(),
    type: Joi.string().valid(`home`, `work`).required(),
});

module.exports = {
    registerAddressSchema,
};
