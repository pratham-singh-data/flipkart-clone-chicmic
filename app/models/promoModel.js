const { Schema, model, Types: { ObjectId, }, } = require(`mongoose`);

const promoSchema = new Schema({
    user: ObjectId,
    promoTitle: String,
    promo: String,
    promoImage: String,
    views: Number,
    clicks: Number,
    priority: Number,
});

const PromoModel = model(`promos`, promoSchema);

module.exports = {
    PromoModel,
};
