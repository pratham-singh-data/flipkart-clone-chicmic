const { Schema, model, Types: { ObjectId, }, } = require(`mongoose`);

const deliverySchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    deliveryTime: {
        type: Number,
        default: 1,
    },
    deliveryTimeUnits: {
        type: String,
        default: `Days`,
    },
    deliveryCharge: {
        type: Number,
        default: 0,
    },
});

const listingSchema = new Schema({
    seller: {
        type: ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    listingImage: String,
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    stock: {
        type: Number,
        default: 0,
    },
    flipKartAssured: {
        type: Boolean,
        default: false,
    },
    deliveryTypes: [ deliverySchema, ],
    sinceWhen: {
        type: Date,
        default: Date.now,
    },
    category: [ ObjectId, ],
});

const ListingModel = model(`listings`, listingSchema);

module.exports = {
    ListingModel,
};
