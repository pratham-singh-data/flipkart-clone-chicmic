const { Schema, model, Types: { ObjectId, }, } = require(`mongoose`);
const { itemSchema, } = require('./itemSchema');

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    cart: [ itemSchema, ],
    wishlist: [ ObjectId, ],
    type: {
        type: String,
        default: `buyer`,
    },
    memberSince: {
        type: Date,
        default: Date.now,
    },
});

const UserModel = model(`users`, userSchema);

module.exports = {
    UserModel,
};
