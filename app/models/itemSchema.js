const { Schema, Types: { ObjectId, }, } = require(`mongoose`);

const itemSchema = new Schema({
    id: {
        type: ObjectId,
        required: true,
    },
    count: {
        type: Number,
        default: 1,
    },
    coupon: ObjectId,
});

module.exports = {
    itemSchema,
};
