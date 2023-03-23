const { TokenModel, } = require('../models');
const { saveDocument,
    findOne,
    deleteMany, } = require('./operators/serviceOperators');

/** Deletes multiple elements from tokens model based on the given query
 * @param {Object} deleteFilter filter by which to delete data
 */
async function deleteManyFromTokens(deleteFilter) {
    await deleteMany(TokenModel, deleteFilter);
}

/** executes searchQuery on tokens collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 * @return {Object} data from database
 */
async function findOneFromTokens(searchQuery, projectionQuery) {
    return await findOne(TokenModel, searchQuery, projectionQuery);
}

/** Saves document in tokens database
 * @param {Object} doc document to save
 * @return {Object} data from database
 */
async function saveDocumentInTokens(doc) {
    return await saveDocument(TokenModel, doc);
}

module.exports = {
    deleteManyFromTokens,
    findOneFromTokens,
    saveDocumentInTokens,
};
