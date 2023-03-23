const { ReviewModel, } = require('../models');
const { runAggregate,
    deleteById,
    findById,
    findMany,
    saveDocument,
    updateById, } = require('./operators/serviceOperators');

/** Runs an aggregation pipeline on reviews model
 * @param {Array} pipeline aggregation pipeline to run
 * @return {Object} Result of operation
 */
async function runAggregateOnReviews(pipeline) {
    return await runAggregate(ReviewModel, pipeline);
}

/** Deletes id element from reviews collection
 * @param {String} id id of element to delete
 */
async function deleteFromReviewsById(id) {
    await deleteById(ReviewModel, id);
}

/** finds id element from reviews collection
 * @param {String} id id of element to find
 * @return {Object} data from database
 */
async function findFromReviewsById(id) {
    return await findById(ReviewModel, id);
}

/** executes searchQuery on reviews collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 * @return {Object} data from database
 */
async function findManyFromReviews(searchQuery, projectionQuery) {
    return await findMany(ReviewModel, searchQuery, projectionQuery);
}

/** Saves document in reviews database
 * @param {Object} doc document to save
 * @return {Object} data from database
 */
async function saveDocumentInReviews(doc) {
    return await saveDocument(ReviewModel, doc);
}

/** updates id element from reviews collection
 * @param {String} id id of element to update
 * @param {Object} updateQuery update query for collection
 */
async function updateReviewsById(id, updateQuery) {
    await updateById(ReviewModel, id, updateQuery);
}

module.exports = {
    runAggregateOnReviews,
    deleteFromReviewsById,
    findFromReviewsById,
    findManyFromReviews,
    saveDocumentInReviews,
    updateReviewsById,
};
