const { Schema, model, Types: { ObjectId, }, } = require(`mongoose`);

const reviewSchema = new Schema({
    user: {
        type: ObjectId,
        required: true,
    },
    listing: {
        type: ObjectId,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        default: 1,
    },
}, {
    timestamps: true,
});

const ReviewModel = model(`reviews`, reviewSchema);

module.exports = {
    ReviewModel,
};
