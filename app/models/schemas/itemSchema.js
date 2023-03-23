const { Schema, Types: { ObjectId, }, } = require(`mongoose`);
const { deliverySchema, } = require('./deliverySchema');

const itemSchema = new Schema({
    id: {
        type: ObjectId,
        required: true,
    },
    count: {
        type: Number,
        default: 1,
    },
    coupon: ObjectId,
    deliveryType: deliverySchema,
}, {
    timestamps: true,
});

module.exports = {
    itemSchema,
};
