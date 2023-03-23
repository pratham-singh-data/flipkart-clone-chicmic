/** Runs an aggregation pipeline on the given model
 * @param {Model} model Model to run aggregation pipeline on
 * @param {Array} pipeline aggregation pipeline to run
 * @return {Object} Result of operation
 */
async function runAggregate(model, pipeline) {
    return await model.aggregate(pipeline).exec();
}

/** Deletes id element from given model
 * @param {Model} model Mongoose compiled model
 * @param {String} id id of element to delete
 */
async function deleteById(model, id) {
    await model.deleteOne({
        _id: id,
    }).exec();
}

/** finds id element from given model
 * @param {Model} model Mongoose compiled model
 * @param {String} id id of element to find
 * @return {Object} data from database
 */
async function findById(model, id) {
    return await model.findById(id).exec();
}

/** executes searchQuery on given model
 * @param {Model} model Mongoose compiled model
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 * @return {Object} data from database
 */
async function findMany(model, searchQuery, projectionQuery) {
    return await model.find(searchQuery, projectionQuery).exec();
}

/** executes searchQuery on given model
 * @param {Model} model Mongoose compiled model
 * @param {Object} searchQuery search query to execute on collection
 * @param {Object} projectionQuery projection query to execute on collection
 * @return {Object} data from database
 */
async function findOne(model, searchQuery, projectionQuery) {
    return await model.findOne(searchQuery, projectionQuery).exec();
}

/** Deletes id element from given model
 * @param {Model} Model Mongoose compiled model
 * @param {Object} doc document to save
 * @return {Object} data from database
 */
async function saveDocument(Model, doc) {
    return await new Model(doc).save();
}

/** updates id element from given model
 * @param {Model} model Mongoose compiled model
 * @param {String} id id of element to update
 * @param {Object} updateQuery update query for collection
 */
async function updateById(model, id, updateQuery) {
    await model.updateOne({
        _id: id,
    }, updateQuery).exec();
}

module.exports = {
    runAggregate,
    deleteById,
    findById,
    findMany,
    findOne,
    saveDocument,
    updateById,
};
