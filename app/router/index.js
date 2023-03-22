const { addressRouter, } = require(`./address`);
const { couponRouter, } = require(`./coupon`);
const { listingRouter, } = require(`./listing`);
const { orderRouter, } = require(`./order`);
const { promoRouter, } = require(`./promo`);
const { reviewRouter, } = require(`./review`);
const { uploadRouter, } = require(`./upload`);
const { userRouter, } = require(`./user`);

module.exports = {
    addressRouter,
    couponRouter,
    listingRouter,
    orderRouter,
    promoRouter,
    reviewRouter,
    uploadRouter,
    userRouter,
};
