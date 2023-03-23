const { PromoModel, } = require('../models');
const { deleteById,
    findById,
    findMany,
    saveDocument,
    updateById, } = require('./operators/serviceOperators');

/** Deletes id element from promos collection
 * @param {String} id id of element to delete
 */
async function deleteFromPromoById(id) {
    await deleteById(PromoModel, id);
}

/** finds id element from promos collection
 * @param {String} id id of element to find
 * @return {Object} data from database
 */
async function findFromPromoById(id) {
    return await findById(PromoModel, id);
}

/** executes searchQuery on promos collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 * @return {Object} data from database
 */
async function findManyFromPromo(searchQuery, projectionQuery) {
    return await findMany(PromoModel, searchQuery, projectionQuery);
}

/** Saves document in promo database
 * @param {Object} doc document to save
 * @return {Object} data from database
 */
async function saveDocumentInPromos(doc) {
    return await saveDocument(PromoModel, doc);
}

/** updates id element from promos collection
 * @param {String} id id of element to update
 * @param {Object} updateQuery update query for collection
 */
async function updatePromoById(id, updateQuery) {
    await updateById(PromoModel, id, updateQuery);
}

module.exports = {
    deleteFromPromoById,
    findFromPromoById,
    findManyFromPromo,
    saveDocumentInPromos,
    updatePromoById,
};
