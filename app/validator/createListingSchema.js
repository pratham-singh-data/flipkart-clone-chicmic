const Joi = require(`joi`);

const createListingSchema = Joi.object({
    title: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),
    listingImage: Joi.string().min(1).required(),
    price: Joi.number().min(1).required(),
    stock: Joi.number().min(1).required(),
    flipKartAssured: Joi.boolean().required(),
    category: Joi.array().items(Joi.string().min(1)).unique().required(),
    deliveryTypes: Joi.array().items(Joi.object({
        type: Joi.string().min(1).required(),
        deliveryCharge: Joi.number().min(0).required(),
        deliveryTime: Joi.number().min(1).required(),
        deliveryTimeUnits: Joi.string().valid(`Years`,
            `Months`,
            `Days`,
            `Hours`,
            `Not Applicable`).required(),
    })).unique((inp1, inp2) => {
        return (inp1.type === inp2.type &&
        inp1.deliveryCharge === inp2.deliveryCharge &&
        inp1.time === inp2.time);
    }).min(1).required(),
});

module.exports = {
    createListingSchema,
};
