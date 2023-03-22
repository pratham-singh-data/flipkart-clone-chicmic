const Joi = require(`joi`);
const { STRINGLENGTHMIN, STRINGLENGTHMAX, } = require('../util/constants');

const createCategorySchema = Joi.object({
    name: Joi.string().
        min(STRINGLENGTHMIN).
        max(STRINGLENGTHMAX.NORMAL).
        lowercase().
        required(),
});

module.exports = {
    createCategorySchema,
};
