const { OrderModel, } = require('../models');
const { runAggregate,
    deleteById,
    findOne,
    saveDocument,
    updateById,
    findById, } = require('./operators/serviceOperators');

/** Runs an aggregation pipeline on orders model
 * @param {Array} pipeline aggregation pipeline to run
 * @return {Object} Result of operation
 */
async function runAggregateOnOrders(pipeline) {
    return await runAggregate(OrderModel, pipeline);
}

/** Deletes id element from orders collection
 * @param {String} id id of element to delete
 */
async function deleteFromOrdersById(id) {
    await deleteById(OrderModel, id);
}

/** executes searchQuery on orders collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 * @return {Object} data from database
 */
async function findOneFromOrders(searchQuery, projectionQuery) {
    return await findOne(OrderModel, searchQuery, projectionQuery);
}

/** Finds id element from orders collection
 * @param {String} id id of element to find
 */
async function findFromOrdersById(id) {
    return await findById(OrderModel, id);
}

/** Deletes id element from orders collection
 * @param {String} id id of element to delete
 * @return {Object} data from database
 */
async function saveDocumentInOrders(id) {
    return await saveDocument(OrderModel, id);
}

/** updates id element from orders collection
 * @param {String} id id of element to update
 * @param {Object} updateQuery update query for collection
 */
async function updateOrdersById(id, updateQuery) {
    await updateById(OrderModel, id, updateQuery);
}

module.exports = {
    runAggregateOnOrders,
    deleteFromOrdersById,
    findOneFromOrders,
    findFromOrdersById,
    saveDocumentInOrders,
    updateOrdersById,
};

