const Joi = require(`joi`);
const { ObjectIDRegex,
    StringLengthMin,
    StringLengthMax, } = require('../util/constants');
const { deliveryTypeSchema, } = require('./deliveryTypeSchema');

const createListingSchema = Joi.object({
    title: Joi.string().
        min(StringLengthMin).
        max(StringLengthMax.Normal).
        required(),
    description: Joi.string().
        min(StringLengthMin).
        max(StringLengthMax.Long).
        required(),
    listingImage: Joi.string().min(StringLengthMin).required(),
    price: Joi.number().min(1).required(),
    stock: Joi.number().min(1).required(),
    flipKartAssured: Joi.boolean().required(),
    category: Joi.array().items(
        Joi.string().regex(ObjectIDRegex)).unique().required(),
    deliveryTypes: Joi.array().items(deliveryTypeSchema)
        .unique((inp1, inp2) => {
            return (inp1.type === inp2.type &&
            inp1.deliveryCharge === inp2.deliveryCharge &&
            inp1.time === inp2.time);
        }).min(1).required(),
});

module.exports = {
    createListingSchema,
};
