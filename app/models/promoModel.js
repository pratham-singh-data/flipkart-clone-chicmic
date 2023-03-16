const { Schema, model, Types: { ObjectId, }, } = require(`mongoose`);

const promoSchema = new Schema({
    user: [ ObjectId, ],
    views: Number,
    click: Number,
    priority: Number,
});

const PromoModel = model(`promos`, promoSchema);

module.exports = {
    PromoModel,
};
