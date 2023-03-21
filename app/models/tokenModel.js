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
}, {
    timestamps: true,
});

const TokenModel = model(`tokens`, tokenSchema);

module.exports = {
    TokenModel,
};
