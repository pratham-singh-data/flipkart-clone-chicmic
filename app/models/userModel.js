const { Schema, model, Types: { ObjectId, }, } = require(`mongoose`);

const itemSchema = new Schema({
    id: ObjectId,
    count: Number,
    coupon: ObjectId,
});

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    gender: String,
    email: String,
    password: String,
    phoneNumber: String,
    cart: [ itemSchema, ],
    wishlist: [ ObjectId, ],
    type: String,
    memberSince: Date,
});

const UserModel = model(`users`, userSchema);

module.exports = {
    UserModel,
};
