const { Schema, model, Types: { ObjectId, }, } = require(`mongoose`);

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    gender: String,
    email: String,
    password: String,
    phoneNumber: String,
    addresses: [ ObjectId, ],
    reviews: [ ObjectId, ],
    cart: [ ObjectId, ],
    wishlist: [ ObjectId, ],
    promos: [ ObjectId, ],
    type: String,
    deliveries: [ ObjectId, ],
    orderHistory: [ ObjectId, ],
    memberSince: Date,
});

const UserModel = model(`users`, userSchema);

module.exports = {
    UserModel,
};
