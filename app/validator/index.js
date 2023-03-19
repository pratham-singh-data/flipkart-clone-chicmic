const { signupSchema, } = require(`./signupSchema`);
const { loginSchema, } = require(`./loginSchema`);
const { createCategorySchema, } = require(`./createCategorySchema`);
const { createPromoSchema, } = require(`./createPromoSchema`);
const { createListingSchema, } = require(`./createListingSchema`);
const { createCouponSchema, } = require(`./createCouponSchema`);
const { addToCartSchema, } = require(`./addToCartSchema`);

module.exports = {
    signupSchema,
    loginSchema,
    createCategorySchema,
    createPromoSchema,
    createListingSchema,
    createCouponSchema,
    addToCartSchema,
};
