const { AddressModel, } = require('../models');
const { deleteById,
    findById,
    findMany,
    saveDocument,
    updateById, } = require('./operators/serviceOperators');

/** Deletes id element from addresses collection
 * @param {String} id id of element to delete
 */
async function deleteFromAdressesById(id) {
    await deleteById(AddressModel, id);
}

/** finds id element from addresses collection
 * @param {String} id id of element to find
 * @return {Object} data from database
 */
async function findFromAdressesById(id) {
    return await findById(AddressModel, id);
}

/** executes searchQuery on addresses collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 * @return {Object} data from database
 */
async function findManyFromAdresses(searchQuery, projectionQuery) {
    return await findMany(AddressModel, searchQuery, projectionQuery);
}

/** Saves document in address database
 * @param {Object} doc document to save
 * @return {Object} data from database
 */
async function saveDocumentInAddresses(doc) {
    return await saveDocument(AddressModel, doc);
}

/** updates id element from addresses collection
 * @param {String} id id of element to update
 * @param {Object} updateQuery update query for collection
 */
async function updateAdressesById(id, updateQuery) {
    await updateById(AddressModel, id, updateQuery);
}

module.exports = {
    deleteFromAdressesById,
    findFromAdressesById,
    findManyFromAdresses,
    saveDocumentInAddresses,
    updateAdressesById,
};
