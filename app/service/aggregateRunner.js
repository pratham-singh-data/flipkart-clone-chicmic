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
 */
async function runAggregate(model, pipeline) {
    await model.aggregate(pipeline).exec();
}

/** Runs an aggregation pipeline on orders model
 * @param {Array} pipeline aggregation pipeline to run
 */
async function runAggregateOnOrders(pipeline) {
    await runAggregate(OrderModel, pipeline);
}

/** Runs an aggregation pipeline on users model
 * @param {Array} pipeline aggregation pipeline to run
 */
async function runAggregateOnUsers(pipeline) {
    await runAggregate(UserModel, pipeline);
}

/** Runs an aggregation pipeline on listings model
 * @param {Array} pipeline aggregation pipeline to run
 */
async function runAggregateOnListings(pipeline) {
    await runAggregate(ListingModel, pipeline);
}

/** Runs an aggregation pipeline on coupons model
 * @param {Array} pipeline aggregation pipeline to run
 */
async function runAggregateOnCoupons(pipeline) {
    await runAggregate(CouponModel, pipeline);
}

/** Runs an aggregation pipeline on reviews model
 * @param {Array} pipeline aggregation pipeline to run
 */
async function runAggregateOnReviews(pipeline) {
    await runAggregate(ReviewModel, pipeline);
}

/** Runs an aggregation pipeline on promo model
 * @param {Array} pipeline aggregation pipeline to run
 */
async function runAggregateOnPromos(pipeline) {
    await runAggregate(PromoModel, pipeline);
}

/** Runs an aggregation pipeline on address model
 * @param {Array} pipeline aggregation pipeline to run
 */
async function runAggregateOnAdresses(pipeline) {
    await runAggregate(AddressModel, pipeline);
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
