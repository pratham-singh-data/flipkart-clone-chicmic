const Joi = require(`joi`);

const registerAddressSchema = Joi.object({
    address: Joi.string().min(1).lowercase().required(),
    type: Joi.string().valid(`home`, `work`).required(),
});

module.exports = {
    registerAddressSchema,
};
