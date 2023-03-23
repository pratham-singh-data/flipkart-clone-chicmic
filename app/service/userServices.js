const { UserModel, } = require('../models');
const { deleteById,
    findById,
    findOne,
    saveDocument,
    updateById, } = require('./operators/serviceOperators');

/** Deletes id element from users collection
 * @param {String} id id of element to delete
 */
async function deleteFromUsersById(id) {
    await deleteById(UserModel, id);
}

/** finds id element from users collection
 * @param {String} id id of element to find
 * @return {Object} data from database
 */
async function findFromUsersById(id) {
    return await findById(UserModel, id);
}

/** executes searchQuery on users collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 * @return {Object} data from database
 */
async function findOneFromUsers(searchQuery, projectionQuery) {
    return await findOne(UserModel, searchQuery, projectionQuery);
}

/** Saves document in users database
 * @param {Object} doc document to save
 * @return {Object} data from database
 */
async function saveDocumentInUsers(doc) {
    return await saveDocument(UserModel, doc);
}

/** updates id element from users collection
 * @param {String} id id of element to update
 * @param {Object} updateQuery update query for collection
 */
async function updateUsersById(id, updateQuery) {
    await updateById(UserModel, id, updateQuery);
}

module.exports = {
    deleteFromUsersById,
    findFromUsersById,
    findOneFromUsers,
    saveDocumentInUsers,
    updateUsersById,
};
