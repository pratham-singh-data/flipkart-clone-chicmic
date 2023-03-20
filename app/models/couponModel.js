const { Schema, model, Types: { ObjectId, }, } = require(`mongoose`);

const couponSchema = new Schema({
    couponCode: String,
    couponName: String,
    validity: Number,
    sinceWhen: Date,
    discountPercentage: Number,
    applicability: [ ObjectId, ],
});

const CouponModel = model(`coupons`, couponSchema);

module.exports = {
    CouponModel,
};
