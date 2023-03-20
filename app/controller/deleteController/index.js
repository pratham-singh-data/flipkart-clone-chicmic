const { deletePromo, } = require(`./deletePromo`);
const { deleteCoupon, } = require(`./deleteCoupon`);
const { deleteListing, } = require(`./deleteListing`);
const { deleteOrder, } = require(`./deleteOrder`);
const { deleteAddress, } = require(`./deleteAddress`);
const { deleteUser, } = require(`./deleteUser`);
const { deleteReview, } = require(`./deleteReview`);

module.exports = {
    deletePromo,
    deleteCoupon,
    deleteListing,
    deleteOrder,
    deleteAddress,
    deleteUser,
    deleteReview,
};
