const { CouponModel, } = require('../models');
const { deleteById,
    findById,
    findMany,
    findOne,
    saveDocument,
    updateById, } = require('./operators/serviceOperators');

/** Deletes id element from listings collection
 * @param {String} id id of element to delete
 */
async function deleteFromCouponsById(id) {
    await deleteById(CouponModel, id);
}

/** finds id element from listings collection
 * @param {String} id id of element to find
 * @return {Object} data from database
 */
async function findFromCouponsById(id) {
    return await findById(CouponModel, id);
}

/** executes searchQuery on coupons collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 * @return {Object} data from database
 */
async function findManyFromCoupons(searchQuery, projectionQuery) {
    return await findMany(CouponModel, searchQuery, projectionQuery);
}

/** executes searchQuery on coupons collection
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 * @return {Object} data from database
 */
async function findOneFromCoupons(searchQuery, projectionQuery) {
    return await findOne(CouponModel, searchQuery, projectionQuery);
}

/** Saves document in coupons database
 * @param {Object} doc document to save
 * @return {Object} data from database
 */
async function saveDocumentInCoupons(doc) {
    return await saveDocument(CouponModel, doc);
}

/** updates id element from listings collection
 * @param {String} id id of element to update
 * @param {Object} updateQuery update query for collection
 */
async function updateCouponsById(id, updateQuery) {
    await updateById(CouponModel, id, updateQuery);
}

module.exports = {
    deleteFromCouponsById,
    findFromCouponsById,
    findManyFromCoupons,
    findOneFromCoupons,
    saveDocumentInCoupons,
    updateCouponsById,
};
