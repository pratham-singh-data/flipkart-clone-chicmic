const { Schema, model, Types: { ObjectId, }, } = require(`mongoose`);

const itemSchema = new Schema({
    id: ObjectId,
    count: Number,
    coupon: ObjectId,
});

const orderSchema = new Schema({
    buyer: ObjectId,
    items: [ itemSchema, ],
    orderedWhen: Date,
    deliveryTime: Date,
    deliveryAgent: ObjectId,
});

const OrderModel = model(`orders`, orderSchema);

module.exports = {
    OrderModel,
};
