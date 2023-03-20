const Joi = require(`joi`);

const createCategorySchema = Joi.object({
    name: Joi.string().min(1).max(1000).lowercase().required(),
});

module.exports = {
    createCategorySchema,
};
