const { ListingModel, } = require('../models');
const { runAggregate,
    deleteById,
    findById,
    findMany,
    findOne,
    saveDocument,
    updateById, } = require('./operators/serviceOperators');

/** Runs an aggregation pipeline on listings model
 * @param {Array} pipeline aggregation pipeline to run
 * @return {Object} Result of operation
 */
async function runAggregateOnListings(pipeline) {
    return await runAggregate(ListingModel, pipeline);
}

/** Deletes id element from listings collection
 * @param {String} id id of element to delete
 */
async function deleteFromListingsById(id) {
    await deleteById(ListingModel, id);
}

/** finds id element from listings collection
 * @param {String} id id of element to find
 * @return {Object} data from database
 */
async function findFromListingsById(id) {
    return await findById(ListingModel, id);
}

/** executes searchQuery on listings collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 * @return {Object} data from database
 */
async function findManyFromListings(searchQuery, projectionQuery) {
    return await findMany(ListingModel, searchQuery, projectionQuery);
}


/** executes searchQuery on listings collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 * @return {Object} data from database
 */
async function findOneFromListings(searchQuery, projectionQuery) {
    return await findOne(ListingModel, searchQuery, projectionQuery);
}

/** Saves document in listings database
 * @param {Object} doc document to save
 * @return {Object} data from database
 */
async function saveDocumentInListings(doc) {
    return await saveDocument(ListingModel, doc);
}

/** updates id element from listings collection
 * @param {String} id id of element to update
 * @param {Object} updateQuery update query for collection
 */
async function updateListingsById(id, updateQuery) {
    await updateById(ListingModel, id, updateQuery);
}

module.exports = {
    runAggregateOnListings,
    deleteFromListingsById,
    findFromListingsById,
    findManyFromListings,
    findOneFromListings,
    saveDocumentInListings,
    updateListingsById,
};
