const Joi = require(`joi`);
const passwordComplexity = require(`joi-password-complexity`);
const { StringLengthMin,
    StringLengthMax,
    PhoneNumberRegex, } = require('../util/constants');

const signupSchema = Joi.object({
    firstName: Joi.string().
        min(StringLengthMin).
        max(StringLengthMax.Normal).
        required(),
    lastName: Joi.string().
        min(StringLengthMin).
        max(StringLengthMax.Normal).
        required(),
    gender: Joi.string().valid(`M`, `F`).required(),
    email: Joi.string().
        email().
        lowercase().
        max(StringLengthMax.Normal).
        required(),
    phoneNumber: Joi.string().regex(PhoneNumberRegex).required(),
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
