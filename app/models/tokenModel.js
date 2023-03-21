const { Schema, Types: { ObjectId, }, model, } = require('mongoose');

const tokenSchema = new Schema({
    user: {
        type: ObjectId,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    loginTime: {
        type: Date,
        default: Date.now,
    },
});

const TokenModel = model(`tokens`, tokenSchema);

module.exports = {
    TokenModel,
};
