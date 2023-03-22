const { OrderModel,
    UserModel,
    ListingModel,
    CouponModel,
    ReviewModel,
    PromoModel,
    AddressModel,
    CategoryModel, } = require('../models');

/** executes searchQuery on given model
 * @param {Model} model Mongoose compiled model
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 */
async function findMany(model, searchQuery, projectionQuery) {
    await model.find(searchQuery, projectionQuery).exec();
}

/** executes searchQuery on orders collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 */
async function findManyFromOrders(searchQuery, projectionQuery) {
    await findMany(OrderModel, searchQuery, projectionQuery);
}

/** executes searchQuery on users collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 */
async function findManyFromUsers(searchQuery, projectionQuery) {
    await findMany(UserModel, searchQuery, projectionQuery);
}

/** executes searchQuery on listings collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 */
async function findManyFromListings(searchQuery, projectionQuery) {
    await findMany(ListingModel, searchQuery, projectionQuery);
}

/** executes searchQuery on coupons collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 */
async function findManyFromCoupons(searchQuery, projectionQuery) {
    await findMany(CouponModel, searchQuery, projectionQuery);
}

/** executes searchQuery on reviews collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 */
async function findManyFromReviews(searchQuery, projectionQuery) {
    await findMany(ReviewModel, searchQuery, projectionQuery);
}

/** executes searchQuery on promos collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 */
async function findManyFromPromo(searchQuery, projectionQuery) {
    await findMany(PromoModel, searchQuery, projectionQuery);
}

/** executes searchQuery on addresses collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 */
async function findManyFromAdresses(searchQuery, projectionQuery) {
    await findMany(AddressModel, searchQuery, projectionQuery);
}

/** executes searchQuery on categories collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 */
async function findManyFromCategories(searchQuery, projectionQuery) {
    await findMany(CategoryModel, searchQuery, projectionQuery);
}

module.exports = {
    findManyFromOrders,
    findManyFromUsers,
    findManyFromListings,
    findManyFromCoupons,
    findManyFromReviews,
    findManyFromPromo,
    findManyFromAdresses,
    findManyFromCategories,
};
