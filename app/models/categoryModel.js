const { Schema, model, Types: { ObjectId, }, } = require(`mongoose`);

const categorySchema = new Schema({
    name: String,
    orders: [ ObjectId, ],
});

const CategoryModel = model(`categories`, categorySchema);

module.exports = {
    CategoryModel,
};
