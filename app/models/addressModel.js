const { Schema, Types: { ObjectId, }, model, } = require('mongoose');

const addressSchema = new Schema({
    user: {
        type: ObjectId,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
});

const AddressModel = model(`addresses`, addressSchema);

module.exports = {
    AddressModel,
};
