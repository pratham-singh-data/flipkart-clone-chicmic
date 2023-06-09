const { Schema, model, Types: { ObjectId, }, } = require(`mongoose`);
const { itemSchema, } = require('./schemas/itemSchema');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
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
    emailValidated: {
        type: Boolean,
        default: false,
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
}, {
    timestamps: true,
});

const UserModel = model(`users`, userSchema);

module.exports = {
    UserModel,
};
