const { Schema, Types: { ObjectId, }, model, } = require('mongoose');

const tokenSchema = new Schema({
    user: ObjectId,
    token: String,
    loginTime: Date,
});

const TokenModel = model(`tokens`, tokenSchema);

module.exports = {
    TokenModel,
};
