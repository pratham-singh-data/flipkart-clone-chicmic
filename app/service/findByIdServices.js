const { OrderModel,
    UserModel,
    ListingModel,
    CouponModel,
    ReviewModel,
    PromoModel,
    AddressModel, } = require('../models');

/** finds id element from given model
 * @param {Model} model Mongoose compiled model
 * @param {String} id id of element to find
 * @return {Object} data from database
 */
async function findById(model, id) {
    return await model.findById(id).exec();
}

/** finds id element from orders collection
 * @param {String} id id of element to find
 * @return {Object} data from database
 */
async function findFromOrdersById(id) {
    return await findById(OrderModel, id);
}

/** finds id element from users collection
 * @param {String} id id of element to find
 * @return {Object} data from database
 */
async function findFromUsersById(id) {
    return await findById(UserModel, id);
}

/** finds id element from listings collection
 * @param {String} id id of element to find
 * @return {Object} data from database
 */
async function findFromListingsById(id) {
    return await findById(ListingModel, id);
}

/** finds id element from listings collection
 * @param {String} id id of element to find
 * @return {Object} data from database
 */
async function findFromCouponsById(id) {
    return await findById(CouponModel, id);
}

/** finds id element from reviews collection
 * @param {String} id id of element to find
 * @return {Object} data from database
 */
async function findFromReviewsById(id) {
    return await findById(ReviewModel, id);
}

/** finds id element from promos collection
 * @param {String} id id of element to find
 * @return {Object} data from database
 */
async function findFromPromoById(id) {
    return await findById(PromoModel, id);
}

/** finds id element from addresses collection
 * @param {String} id id of element to find
 * @return {Object} data from database
 */
async function findFromAdressesById(id) {
    return await findById(AddressModel, id);
}

module.exports = {
    findFromOrdersById,
    findFromUsersById,
    findFromListingsById,
    findFromCouponsById,
    findFromReviewsById,
    findFromPromoById,
    findFromAdressesById,
};
