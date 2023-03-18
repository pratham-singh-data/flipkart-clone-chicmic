const { signupSchema, } = require(`./signupSchema`);
const { loginSchema, } = require(`./loginSchema`);
const { createCategorySchema, } = require(`./createCategorySchema`);
const { createPromoSchema, } = require(`./createPromoSchema`);

module.exports = {
    signupSchema,
    loginSchema,
    createCategorySchema,
    createPromoSchema,
};
