const { Schema, model, Types: { ObjectId, }, } = require(`mongoose`);

const deliverySchema = new Schema({
    type: String,
    deliveryTime: Number,
    deliveryTimeUnits: String,
    deliveryCharge: Number,
});

const listingSchema = new Schema({
    seller: ObjectId,
    title: String,
    listingImage: String,
    description: String,
    price: Number,
    stock: Number,
    flipKartAssured: Boolean,
    deliveryTypes: [ deliverySchema, ],
    sinceWhen: Date,
    category: [ ObjectId, ],
});

const ListingModel = model(`listings`, listingSchema);

module.exports = {
    ListingModel,
};
