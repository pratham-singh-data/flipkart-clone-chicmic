const { Schema, model, Types: { ObjectId, }, } = require(`mongoose`);

const couponSchema = new Schema({
    couponCode: {
        type: String,
        required: true,
    },
    couponName: {
        type: String,
        required: true,
    },
    validity: {
        type: Number,
        required: true,
    },
    sinceWhen: {
        type: Date,
        required: true,
    },
    discountPercentage: {
        type: Number,
        required: true,
    },
    applicability: [ ObjectId, ],
});

const CouponModel = model(`coupons`, couponSchema);

module.exports = {
    CouponModel,
};
