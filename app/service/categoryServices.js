const { CategoryModel, } = require('../models');
const { findMany, findOne, saveDocument, } =
    require('./operators/serviceOperators');

/** executes searchQuery on categories collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 * @return {Object} data from database
 */
async function findManyFromCategories(searchQuery, projectionQuery) {
    return await findMany(CategoryModel, searchQuery, projectionQuery);
}

/** executes searchQuery on categories collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 * @return {Object} data from database
 */
async function findOneFromCategories(searchQuery, projectionQuery) {
    return await findOne(CategoryModel, searchQuery, projectionQuery);
}

/** Saves document in categories database
 * @param {Object} doc document to save
 * @return {Object} data from database
 */
async function saveDocumentInCategories(doc) {
    return await saveDocument(CategoryModel, doc);
}

module.exports = {
    findManyFromCategories,
    findOneFromCategories,
    saveDocumentInCategories,
};
