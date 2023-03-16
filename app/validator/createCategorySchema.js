const Joi = require(`joi`);

const createCategorySchema = Joi.object({
    name: Joi.string().min(1).lowercase().required(),
});

module.exports = {
    createCategorySchema,
};
