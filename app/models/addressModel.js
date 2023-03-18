const { Schema, Types: { ObjectId, }, model, } = require('mongoose');

const addressSchema = new Schema({
    user: ObjectId,
    address: String,
    type: String,
});

const AddressModel = model(`addresses`, addressSchema);

module.exports = {
    AddressModel,
};
