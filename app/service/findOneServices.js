const { OrderModel,
    UserModel,
    ListingModel,
    CouponModel,
    CategoryModel, } = require('../models');

/** executes searchQuery on given model
 * @param {Model} model Mongoose compiled model
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 * @return {Object} data from database
 */
async function findOne(model, searchQuery, projectionQuery) {
    return await model.findOne(searchQuery, projectionQuery).exec();
}

/** executes searchQuery on orders collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 * @return {Object} data from database
 */
async function findOneFromOrders(searchQuery, projectionQuery) {
    return await findOne(OrderModel, searchQuery, projectionQuery);
}

/** executes searchQuery on users collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 * @return {Object} data from database
 */
async function findOneFromUsers(searchQuery, projectionQuery) {
    return await findOne(UserModel, searchQuery, projectionQuery);
}

/** executes searchQuery on listings collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 * @return {Object} data from database
 */
async function findOneFromListings(searchQuery, projectionQuery) {
    return await findOne(ListingModel, searchQuery, projectionQuery);
}

/** executes searchQuery on coupons collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 * @return {Object} data from database
 */
async function findOneFromCoupons(searchQuery, projectionQuery) {
    return await findOne(CouponModel, searchQuery, projectionQuery);
}

/** executes searchQuery on categories collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 * @return {Object} data from database
 */
async function findOneFromCategories(searchQuery, projectionQuery) {
    return await findOne(CategoryModel, searchQuery, projectionQuery);
}

module.exports = {
    findOneFromOrders,
    findOneFromUsers,
    findOneFromListings,
    findOneFromCoupons,
    findOneFromCategories,
};
