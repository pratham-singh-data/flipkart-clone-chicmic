const { Schema, } = require('mongoose');

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

module.exports = {
    deliverySchema,
};
