const { Schema, model, Types: { ObjectId, }, } = require(`mongoose`);

const deliverySchema = new Schema({
    type: String,
    deliveryTime: Number,
    deliveryCharge: Number,
});

const listingSchema = new Schema({
    seller: ObjectId,
    title: String,
    price: Number,
    stock: Number,
    flipKartAssured: Boolean,
    orders: [ ObjectId, ],
    deliveryTypes: deliverySchema,
    averageRating: Number,
    buyers: [ ObjectId, ],
    reviews: [ ObjectId, ],
    sinceWhen: Date,
    category: [ ObjectId, ],
});

const ListingModel = model(`listings`, listingSchema);

module.exports = {
    ListingModel,
};
