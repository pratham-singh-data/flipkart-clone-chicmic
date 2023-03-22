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
 */
async function saveDocument(Model, doc) {
    return await new Model(doc).save();
}

/** Deletes id element from orders collection
 * @param {String} id id of element to delete
 */
async function saveDocumentInOrders(id) {
    await saveDocument(OrderModel, id);
}

/** Saves document in users database
 * @param {Object} doc document to save
 */
async function saveDocumentInUsers(doc) {
    await saveDocument(UserModel, doc);
}

/** Saves document in listings database
 * @param {Object} doc document to save
 */
async function saveDocumentInListings(doc) {
    await saveDocument(ListingModel, doc);
}

/** Saves document in coupons database
 * @param {Object} doc document to save
 */
async function saveDocumentInCoupons(doc) {
    await saveDocument(CouponModel, doc);
}

/** Saves document in reviews database
 * @param {Object} doc document to save
 */
async function saveDocumentInReviews(doc) {
    await saveDocument(ReviewModel, doc);
}

/** Saves document in promo database
 * @param {Object} doc document to save
 */
async function saveDocumentInPromos(doc) {
    await saveDocument(PromoModel, doc);
}

/** Saves document in address database
 * @param {Object} doc document to save
 */
async function saveDocumentInAddresses(doc) {
    await saveDocument(AddressModel, doc);
}

/** Saves document in categories database
 * @param {Object} doc document to save
 */
async function saveDocumentInCategories(doc) {
    await saveDocument(CategoryModel, doc);
}

/** Saves document in tokens database
 * @param {Object} doc document to save
 */
async function saveDocumentInTokens(doc) {
    await saveDocument(TokenModel, doc);
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
