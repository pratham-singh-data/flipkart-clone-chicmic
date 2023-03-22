const { OrderModel,
    UserModel,
    ListingModel,
    CouponModel,
    ReviewModel,
    PromoModel,
    AddressModel, } = require('../models');

/** Deletes id element from given model
 * @param {Model} model Mongoose compiled model
 * @param {String} id id of element to delete
 */
async function deleteById(model, id) {
    await model.deleteOne({
        _id: id,
    }).exec();
}

/** Deletes id element from orders collection
 * @param {String} id id of element to delete
 */
async function deleteFromOrdersById(id) {
    await deleteById(OrderModel, id);
}

/** Deletes id element from users collection
 * @param {String} id id of element to delete
 */
async function deleteFromUsersById(id) {
    await deleteById(UserModel, id);
}

/** Deletes id element from listings collection
 * @param {String} id id of element to delete
 */
async function deleteFromListingsById(id) {
    await deleteById(ListingModel, id);
}

/** Deletes id element from listings collection
 * @param {String} id id of element to delete
 */
async function deleteFromCouponsById(id) {
    await deleteById(CouponModel, id);
}

/** Deletes id element from reviews collection
 * @param {String} id id of element to delete
 */
async function deleteFromReviewsById(id) {
    await deleteById(ReviewModel, id);
}

/** Deletes id element from promos collection
 * @param {String} id id of element to delete
 */
async function deleteFromPromoById(id) {
    await deleteById(PromoModel, id);
}

/** Deletes id element from addresses collection
 * @param {String} id id of element to delete
 */
async function deleteFromAdressesById(id) {
    await deleteById(AddressModel, id);
}

module.exports = {
    deleteFromOrdersById,
    deleteFromUsersById,
    deleteFromListingsById,
    deleteFromCouponsById,
    deleteFromReviewsById,
    deleteFromPromoById,
    deleteFromAdressesById,
};
