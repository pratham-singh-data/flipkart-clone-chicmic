const { Schema, model, } = require(`mongoose`);

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const CategoryModel = model(`categories`, categorySchema);

module.exports = {
    CategoryModel,
};
