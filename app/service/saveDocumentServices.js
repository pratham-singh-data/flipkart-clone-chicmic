const { OrderModel,
    UserModel,
    ListingModel,
    CouponModel,
    ReviewModel,
    PromoModel,
    AddressModel,
    CategoryModel,
    TokenModel, } = require('../models');

/** Deletes id element from given model
 * @param {Model} Model Mongoose compiled model
 * @param {Object} doc document to save
 * @return {Object} data from database
 */
async function saveDocument(Model, doc) {
    return await new Model(doc).save();
}

/** Deletes id element from orders collection
 * @param {String} id id of element to delete
 * @return {Object} data from database
 */
async function saveDocumentInOrders(id) {
    return await saveDocument(OrderModel, id);
}

/** Saves document in users database
 * @param {Object} doc document to save
 * @return {Object} data from database
 */
async function saveDocumentInUsers(doc) {
    return await saveDocument(UserModel, doc);
}

/** Saves document in listings database
 * @param {Object} doc document to save
 * @return {Object} data from database
 */
async function saveDocumentInListings(doc) {
    return await saveDocument(ListingModel, doc);
}

/** Saves document in coupons database
 * @param {Object} doc document to save
 * @return {Object} data from database
 */
async function saveDocumentInCoupons(doc) {
    return await saveDocument(CouponModel, doc);
}

/** Saves document in reviews database
 * @param {Object} doc document to save
 * @return {Object} data from database
 */
async function saveDocumentInReviews(doc) {
    return await saveDocument(ReviewModel, doc);
}

/** Saves document in promo database
 * @param {Object} doc document to save
 * @return {Object} data from database
 */
async function saveDocumentInPromos(doc) {
    return await saveDocument(PromoModel, doc);
}

/** Saves document in address database
 * @param {Object} doc document to save
 * @return {Object} data from database
 */
async function saveDocumentInAddresses(doc) {
    return await saveDocument(AddressModel, doc);
}

/** Saves document in categories database
 * @param {Object} doc document to save
 * @return {Object} data from database
 */
async function saveDocumentInCategories(doc) {
    return await saveDocument(CategoryModel, doc);
}

/** Saves document in tokens database
 * @param {Object} doc document to save
 * @return {Object} data from database
 */
async function saveDocumentInTokens(doc) {
    return await saveDocument(TokenModel, doc);
}

module.exports = {
    saveDocumentInOrders,
    saveDocumentInUsers,
    saveDocumentInListings,
    saveDocumentInCoupons,
    saveDocumentInReviews,
    saveDocumentInPromos,
    saveDocumentInAddresses,
    saveDocumentInCategories,
    saveDocumentInTokens,
};
