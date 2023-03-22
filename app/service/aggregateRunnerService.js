const { OrderModel,
    ListingModel,
    ReviewModel, } = require('../models');

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

/** Runs an aggregation pipeline on listings model
 * @param {Array} pipeline aggregation pipeline to run
 * @return {Object} Result of operation
 */
async function runAggregateOnListings(pipeline) {
    return await runAggregate(ListingModel, pipeline);
}

/** Runs an aggregation pipeline on reviews model
 * @param {Array} pipeline aggregation pipeline to run
 * @return {Object} Result of operation
 */
async function runAggregateOnReviews(pipeline) {
    return await runAggregate(ReviewModel, pipeline);
}

module.exports = {
    runAggregateOnOrders,
    runAggregateOnListings,
    runAggregateOnReviews,
};
