const { Schema, model, Types: { ObjectId, }, } = require(`mongoose`);
const { itemSchema, } = require('./schemas/itemSchema');

const orderSchema = new Schema({
    buyer: ObjectId,
    items: [ itemSchema, ],
    deliveryTime: Date,
    cost: {
        type: Number,
        required: true,
    },
    deliveryAgent: ObjectId,
}, {
    timestamps: true,
});

const OrderModel = model(`orders`, orderSchema);

module.exports = {
    OrderModel,
};
