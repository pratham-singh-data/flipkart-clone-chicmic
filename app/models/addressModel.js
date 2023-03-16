const { Schema, Types: { ObjectId, }, model, } = require('mongoose');

const addressSchema = new Schema({
    user: ObjectId,
    address: String,
    deliveries: [ ObjectId, ],
    type: String,
});

const AddressModel = model(`addresses`, addressSchema);

module.exports = {
    AddressModel,
};
