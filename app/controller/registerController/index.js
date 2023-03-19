const { addToCart, } = require(`./addToCart`);
const { addToWishlist, } = require(`./addToWishlist`);
const { registerDelivery, } = require(`./registerDeliver`);
const { registerAddress, } = require(`./registerAddress`);
const { registerPromoClick, } = require(`./registerPromoClick`);

module.exports = {
    addToCart,
    addToWishlist,
    registerDelivery,
    registerAddress,
    registerPromoClick,
};
