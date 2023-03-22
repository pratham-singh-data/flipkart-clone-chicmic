const { OrderModel,
    UserModel,
    ListingModel,
    CouponModel,
    ReviewModel,
    PromoModel,
    AddressModel, } = require('../models');

/** Runs an aggregation pipeline on the given model
 * @param {Model} model Model to run aggregation pipeline on
 * @param {Array} pipeline aggregation pipeline to run
 * @return {Object} Result of operation
 */
async function runAggregate(model, pipeline) {
    return await model.aggregate(pipeline).exec();
}

/** Runs an aggregation pipeline on orders model
 * @param {Array} pipeline aggregation pipeline to run
 * @return {Object} Result of operation
 */
async function runAggregateOnOrders(pipeline) {
    return await runAggregate(OrderModel, pipeline);
}

/** Runs an aggregation pipeline on users model
 * @param {Array} pipeline aggregation pipeline to run
 * @return {Object} Result of operation
 */
async function runAggregateOnUsers(pipeline) {
    return await runAggregate(UserModel, pipeline);
}

/** Runs an aggregation pipeline on listings model
 * @param {Array} pipeline aggregation pipeline to run
 * @return {Object} Result of operation
 */
async function runAggregateOnListings(pipeline) {
    return await runAggregate(ListingModel, pipeline);
}

/** Runs an aggregation pipeline on coupons model
 * @param {Array} pipeline aggregation pipeline to run
 * @return {Object} Result of operation
 */
async function runAggregateOnCoupons(pipeline) {
    return await runAggregate(CouponModel, pipeline);
}

/** Runs an aggregation pipeline on reviews model
 * @param {Array} pipeline aggregation pipeline to run
 * @return {Object} Result of operation
 */
async function runAggregateOnReviews(pipeline) {
    return await runAggregate(ReviewModel, pipeline);
}

/** Runs an aggregation pipeline on promo model
 * @param {Array} pipeline aggregation pipeline to run
 * @return {Object} Result of operation
 */
async function runAggregateOnPromos(pipeline) {
    return await runAggregate(PromoModel, pipeline).exec();
}

/** Runs an aggregation pipeline on address model
 * @param {Array} pipeline aggregation pipeline to run
 * @return {Object} Result of operation
 */
async function runAggregateOnAdresses(pipeline) {
    return await runAggregate(AddressModel, pipeline);
}

module.exports = {
    runAggregateOnOrders,
    runAggregateOnUsers,
    runAggregateOnListings,
    runAggregateOnCoupons,
    runAggregateOnReviews,
    runAggregateOnPromos,
    runAggregateOnAdresses,
};
