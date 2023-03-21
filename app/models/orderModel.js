const { Schema, model, Types: { ObjectId, }, } = require(`mongoose`);
const { itemSchema, } = require('./itemSchema');

const orderSchema = new Schema({
    buyer: ObjectId,
    items: [ itemSchema, ],
    deliveryTime: Date,
    deliveryAgent: ObjectId,
}, {
    timestamps: true,
});

const OrderModel = model(`orders`, orderSchema);

module.exports = {
    OrderModel,
};
