const { Schema, model, Types: { ObjectId, }, } = require(`mongoose`);

const promoSchema = new Schema({
    user: {
        type: ObjectId,
        required: true,
    },
    promoTitle: {
        type: String,
        required: true,
    },
    promo: {
        type: String,
        required: true,
    },
    promoImage: String,
    views: {
        type: Number,
        default: 0,
    },
    clicks: {
        type: Number,
        default: 0,
    },
    priority: {
        type: Number,
        default: 1,
    },
});

const PromoModel = model(`promos`, promoSchema);

module.exports = {
    PromoModel,
};
