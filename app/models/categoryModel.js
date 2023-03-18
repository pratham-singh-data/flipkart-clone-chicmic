const { Schema, model, Types: { ObjectId, }, } = require(`mongoose`);

const categorySchema = new Schema({
    name: String,
    listings: [ ObjectId, ],
});

const CategoryModel = model(`categories`, categorySchema);

module.exports = {
    CategoryModel,
};
