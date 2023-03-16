const { signupSchema, } = require(`./signupSchema`);
const { loginSchema, } = require(`./loginSchema`);
const { createCategorySchema, } = require(`./createCategorySchema`);

module.exports = {
    signupSchema,
    loginSchema,
    createCategorySchema,
};
