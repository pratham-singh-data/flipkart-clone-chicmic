const Joi = require(`joi`);
const passwordComplexity = require(`joi-password-complexity`);

const signupSchema = Joi.object({
    firstName: Joi.string().min(1).max(100).required(),
    lastName: Joi.string().min(1).max(100).required(),
    gender: Joi.string().valid(`M`, `F`).required(),
    email: Joi.string().email().max(1000).required(),
    phoneNumber: Joi.string().regex(/^[0-9]{10}$/).required(),
    type: Joi.string().valid(`buyer`, `admin`, `agent`).required(),
    password: passwordComplexity({
        min: 8,
        max: 20,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: Infinity,
    }).required(),
});

module.exports = {
    signupSchema,
};
