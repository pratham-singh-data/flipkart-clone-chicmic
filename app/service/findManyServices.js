const { ListingModel,
    CouponModel,
    ReviewModel,
    PromoModel,
    AddressModel,
    CategoryModel, } = require('../models');

/** executes searchQuery on given model
 * @param {Model} model Mongoose compiled model
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 * @return {Object} data from database
 */
async function findMany(model, searchQuery, projectionQuery) {
    return await model.find(searchQuery, projectionQuery).exec();
}

/** executes searchQuery on listings collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 * @return {Object} data from database
 */
async function findManyFromListings(searchQuery, projectionQuery) {
    return await findMany(ListingModel, searchQuery, projectionQuery);
}

/** executes searchQuery on coupons collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 * @return {Object} data from database
 */
async function findManyFromCoupons(searchQuery, projectionQuery) {
    return await findMany(CouponModel, searchQuery, projectionQuery);
}

/** executes searchQuery on reviews collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 * @return {Object} data from database
 */
async function findManyFromReviews(searchQuery, projectionQuery) {
    return await findMany(ReviewModel, searchQuery, projectionQuery);
}

/** executes searchQuery on promos collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 * @return {Object} data from database
 */
async function findManyFromPromo(searchQuery, projectionQuery) {
    return await findMany(PromoModel, searchQuery, projectionQuery);
}

/** executes searchQuery on addresses collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 * @return {Object} data from database
 */
async function findManyFromAdresses(searchQuery, projectionQuery) {
    return await findMany(AddressModel, searchQuery, projectionQuery);
}

/** executes searchQuery on categories collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 * @return {Object} data from database
 */
async function findManyFromCategories(searchQuery, projectionQuery) {
    return await findMany(CategoryModel, searchQuery, projectionQuery);
}

module.exports = {
    findManyFromListings,
    findManyFromCoupons,
    findManyFromReviews,
    findManyFromPromo,
    findManyFromAdresses,
    findManyFromCategories,
};
