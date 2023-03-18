const { Schema, model, } = require(`mongoose`);

const categorySchema = new Schema({
    name: String,
});

const CategoryModel = model(`categories`, categorySchema);

module.exports = {
    CategoryModel,
};
