const { readListing, } = require(`./readListing`);
const { readAllListings, } = require(`./readAllListings`);
const { readPromo, } = require(`./readPromo`);
const { readAllPromos, } = require(`./readAllPromos`);
const { readRandomPromo, } = require(`./readRandomPromo`);
const { readCoupon, } = require(`./readCoupon`);
const { readCategories, } = require(`./readCategories`);
const { readAllCoupons, } = require(`./readAllCoupons`);
const { readAllAddresses, } = require(`./readAllAddresses`);
const { readAddress, } = require(`./readAddress`);
const { readUser, } = require(`./readUser`);
const { readOrder, } = require(`./readOrder`);

module.exports = {
    readListing,
    readAllListings,
    readPromo,
    readAllPromos,
    readRandomPromo,
    readCoupon,
    readCategories,
    readAllCoupons,
    readAllAddresses,
    readAddress,
    readUser,
    readOrder,
};
