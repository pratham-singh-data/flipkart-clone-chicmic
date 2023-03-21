const Joi = require(`joi`);
const { StringLengthMin, StringLengthMax, } = require('../util/constants');

const createCategorySchema = Joi.object({
    name: Joi.string().
        min(StringLengthMin).
        max(StringLengthMax.Normal).
        lowercase().
        required(),
});

module.exports = {
    createCategorySchema,
};
