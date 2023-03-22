const { OrderModel,
    UserModel,
    ListingModel,
    CouponModel,
    ReviewModel,
    PromoModel,
    AddressModel, } = require('../models');

/** finds id element from given model
 * @param {Model} model Mongoose compiled model
 * @param {String} id id of element to find
 */
async function findById(model, id) {
    await model.findById(id).exec();
}

/** finds id element from orders collection
 * @param {String} id id of element to find
 */
async function findFromOrdersById(id) {
    await findById(OrderModel, id);
}

/** finds id element from users collection
 * @param {String} id id of element to find
 */
async function findFromUsersById(id) {
    await findById(UserModel, id);
}

/** finds id element from listings collection
 * @param {String} id id of element to find
 */
async function findFromListingsById(id) {
    await findById(ListingModel, id);
}

/** finds id element from listings collection
 * @param {String} id id of element to find
 */
async function findFromCouponsById(id) {
    await findById(CouponModel, id);
}

/** finds id element from reviews collection
 * @param {String} id id of element to find
 */
async function findFromReviewsById(id) {
    await findById(ReviewModel, id);
}

/** finds id element from promos collection
 * @param {String} id id of element to find
 */
async function findFromPromoById(id) {
    await findById(PromoModel, id);
}

/** finds id element from addresses collection
 * @param {String} id id of element to find
 */
async function findFromAdressesById(id) {
    await findById(AddressModel, id);
}

module.exports = {
    findFromOrdersById,
    findFromUsersById,
    findFromListingsById,
    findFromCouponsById,
    findFromReviewsById,
    findFromPromoById,
    findFromAdressesById,
};
