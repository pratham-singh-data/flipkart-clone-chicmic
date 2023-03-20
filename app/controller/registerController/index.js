const { addToCart, } = require(`./addToCart`);
const { addToWishlist, } = require(`./addToWishlist`);
const { registerDelivery, } = require(`./registerDeliver`);
const { registerAddress, } = require(`./registerAddress`);
const { registerPromoClick, } = require(`./registerPromoClick`);
const { registerPromoView, } = require(`./registerPromoView`);
const { registerReview, } = require(`./registerReview`);

module.exports = {
    addToCart,
    addToWishlist,
    registerDelivery,
    registerAddress,
    registerPromoClick,
    registerPromoView,
    registerReview,
};
