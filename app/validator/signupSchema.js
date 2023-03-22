const Joi = require(`joi`);
const passwordComplexity = require(`joi-password-complexity`);
const { STRINGLENGTHMIN,
    PHONENUMBERREGEX,
    STRINGLENGTHMAX, } = require('../util/constants');

const signupSchema = Joi.object({
    firstName: Joi.string().
        min(STRINGLENGTHMIN).
        max(STRINGLENGTHMAX.NORMAL).
        required(),
    lastName: Joi.string().
        min(STRINGLENGTHMIN).
        max(STRINGLENGTHMAX.NORMAL).
        required(),
    gender: Joi.string().valid(`M`, `F`).required(),
    email: Joi.string().
        email().
        lowercase().
        max(STRINGLENGTHMAX.NORMAL).
        required(),
    phoneNumber: Joi.string().regex(PHONENUMBERREGEX).required(),
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
