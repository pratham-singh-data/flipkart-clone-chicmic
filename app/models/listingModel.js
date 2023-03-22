const { Schema, model, Types: { ObjectId, }, } = require(`mongoose`);
const { deliverySchema, } = require('./deliverySchema');

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
    category: [ ObjectId, ],
}, {
    timestamps: true,
});

const ListingModel = model(`listings`, listingSchema);

module.exports = {
    ListingModel,
};
