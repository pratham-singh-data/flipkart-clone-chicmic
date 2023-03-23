const addressServices = require(`./addressServices`);
const categoryServices = require(`./categoryServices`);
const couponServices = require(`./couponServices`);
const listingServices = require(`./listingServices`);
const orderServices = require(`./orderServices`);
const promoServices = require(`./promoServices`);
const reviewServices = require(`./reviewServices`);
const tokenServices = require(`./tokenServices`);
const userServices = require(`./userServices`);

module.exports = {
    ...addressServices,
    ...categoryServices,
    ...couponServices,
    ...listingServices,
    ...orderServices,
    ...promoServices,
    ...reviewServices,
    ...tokenServices,
    ...userServices,
};
