const Joi = require(`joi`);
const { STRINGLENGTHMIN, STRINGLENGTHMAX, } = require('../util/constants');

const registerAddressSchema = Joi.object({
    address: Joi.string().
        min(STRINGLENGTHMIN).
        max(STRINGLENGTHMAX.NORMAL).
        lowercase().
        required(),
    type: Joi.string().valid(`home`, `work`).required(),
});

module.exports = {
    registerAddressSchema,
};
