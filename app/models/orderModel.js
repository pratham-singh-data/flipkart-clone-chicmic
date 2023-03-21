const { Schema, model, Types: { ObjectId, }, } = require(`mongoose`);
const { itemSchema, } = require('./itemSchema');

const orderSchema = new Schema({
    buyer: ObjectId,
    items: [ itemSchema, ],
    orderedWhen: {
        type: Date,
        default: Date.now,
    },
    deliveryTime: Date,
    deliveryAgent: ObjectId,
});

const OrderModel = model(`orders`, orderSchema);

module.exports = {
    OrderModel,
};
