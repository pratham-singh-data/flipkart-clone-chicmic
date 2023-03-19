const { readListing, } = require(`./readListing`);
const { readAllListings, } = require(`./readAllListings`);
const { readPromo, } = require(`./readPromo`);
const { readAllPromos, } = require(`./readAllPromos`);
const { readRandomPromo, } = require(`./readRandomPromo`);
const { readCoupon, } = require(`./readCoupon`);
const { readCategories, } = require(`./readCategories`);

module.exports = {
    readListing,
    readAllListings,
    readPromo,
    readAllPromos,
    readRandomPromo,
    readCoupon,
    readCategories,
};
