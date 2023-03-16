const { Schema, model, Types: { ObjectId, }, } = require(`mongoose`);

const reviewSchema = new Schema({
    seller: ObjectId,
    listing: ObjectId,
    review: String,
    rating: Number,
    date: Date,
});

const ReviewModel = model(`reviews`, reviewSchema);

module.exports = {
    ReviewModel,
};
