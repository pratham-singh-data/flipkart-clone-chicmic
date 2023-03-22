const { OrderModel,
    UserModel,
    ListingModel,
    CouponModel,
    ReviewModel,
    PromoModel,
    AddressModel, } = require('../models');

/** updates id element from given model
 * @param {Model} model Mongoose compiled model
 * @param {String} id id of element to update
 * @param {Object} updateQuery update query for collection
 */
async function updateById(model, id, updateQuery) {
    await model.updateOne({
        _id: id,
    }, updateQuery).exec();
}

/** updates id element from orders collection
 * @param {String} id id of element to update
 * @param {Object} updateQuery update query for collection
 */
async function updateOrdersById(id, updateQuery) {
    await updateById(OrderModel, id, updateQuery);
}

/** updates id element from users collection
 * @param {String} id id of element to update
 * @param {Object} updateQuery update query for collection
 */
async function updateUsersById(id, updateQuery) {
    await updateById(UserModel, id, updateQuery);
}

/** updates id element from listings collection
 * @param {String} id id of element to update
 * @param {Object} updateQuery update query for collection
 */
async function updateListingsById(id, updateQuery) {
    await updateById(ListingModel, id, updateQuery);
}

/** updates id element from listings collection
 * @param {String} id id of element to update
 * @param {Object} updateQuery update query for collection
 */
async function updateCouponsById(id, updateQuery) {
    await updateById(CouponModel, id, updateQuery);
}

/** updates id element from reviews collection
 * @param {String} id id of element to update
 * @param {Object} updateQuery update query for collection
 */
async function updateReviewsById(id, updateQuery) {
    await updateById(ReviewModel, id, updateQuery);
}

/** updates id element from promos collection
 * @param {String} id id of element to update
 * @param {Object} updateQuery update query for collection
 */
async function updatePromoById(id, updateQuery) {
    await updateById(PromoModel, id, updateQuery);
}

/** updates id element from addresses collection
 * @param {String} id id of element to update
 * @param {Object} updateQuery update query for collection
 */
async function updateAdressesById(id, updateQuery) {
    await updateById(AddressModel, id, updateQuery);
}

module.exports = {
    updateOrdersById,
    updateUsersById,
    updateListingsById,
    updateCouponsById,
    updateReviewsById,
    updatePromoById,
    updateAdressesById,
};
