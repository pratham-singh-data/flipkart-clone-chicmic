const { addToCart, } = require(`./addToCart`);
const { addToWishlist, } = require(`./addToWishlist`);
const { registerDelivery, } = require(`./registerDeliver`);
const { registerAddress, } = require(`./registerAddress`);

module.exports = {
    addToCart,
    addToWishlist,
    registerDelivery,
    registerAddress,
};
