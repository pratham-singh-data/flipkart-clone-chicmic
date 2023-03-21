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
    discountPercentage: {
        type: Number,
        required: true,
    },
    applicability: [ ObjectId, ],
}, {
    timestamps: true,
});

const CouponModel = model(`coupons`, couponSchema);

module.exports = {
    CouponModel,
};
