const { Schema, model, Types: { ObjectId, }, } = require(`mongoose`);

const itemSchema = new Schema({
    item: ObjectId,
    itemCount: Number,
});

const orderSchema = new Schema({
    seller: ObjectId,
    listing: ObjectId,
    items: itemSchema,
    orderedWhen: Date,
    deliveryTime: Date,
    deliveryAgent: ObjectId,
    coupon: ObjectId,
});

const OrderModel = model(`orders`, orderSchema);

module.exports = {
    OrderModel,
};
