const { Schema, model, Types: { ObjectId, }, } = require(`mongoose`);

const couponSchema = new Schema({
    couponCode: String,
    couponName: String,
    validity: Number,
    sinceWhen: Date,
    orders: [ ObjectId, ],
    applicability: [ ObjectId, ],
});

const CouponModel = model(`coupons`, couponSchema);

module.exports = {
    CouponModel,
};
