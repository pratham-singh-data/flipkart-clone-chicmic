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
async function findOne(model, searchQuery, projectionQuery) {
    await model.findOne(searchQuery, projectionQuery).exec();
}

/** executes searchQuery on orders collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 */
async function findOneFromOrders(searchQuery, projectionQuery) {
    await findOne(OrderModel, searchQuery, projectionQuery);
}

/** executes searchQuery on users collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 */
async function findOneFromUsers(searchQuery, projectionQuery) {
    await findOne(UserModel, searchQuery, projectionQuery);
}

/** executes searchQuery on listings collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 */
async function findOneFromListings(searchQuery, projectionQuery) {
    await findOne(ListingModel, searchQuery, projectionQuery);
}

/** executes searchQuery on coupons collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 */
async function findOneFromCoupons(searchQuery, projectionQuery) {
    await findOne(CouponModel, searchQuery, projectionQuery);
}

/** executes searchQuery on reviews collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 */
async function findOneFromReviews(searchQuery, projectionQuery) {
    await findOne(ReviewModel, searchQuery, projectionQuery);
}

/** executes searchQuery on promos collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 */
async function findOneFromPromo(searchQuery, projectionQuery) {
    await findOne(PromoModel, searchQuery, projectionQuery);
}

/** executes searchQuery on addresses collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 */
async function findOneFromAdresses(searchQuery, projectionQuery) {
    await findOne(AddressModel, searchQuery, projectionQuery);
}

/** executes searchQuery on categories collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 */
async function findOneFromCategories(searchQuery, projectionQuery) {
    await findOne(CategoryModel, searchQuery, projectionQuery);
}

module.exports = {
    findOneFromOrders,
    findOneFromUsers,
    findOneFromListings,
    findOneFromCoupons,
    findOneFromReviews,
    findOneFromPromo,
    findOneFromAdresses,
    findOneFromCategories,
};
