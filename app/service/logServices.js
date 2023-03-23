const { LogModel, } = require('../models');
const { saveDocument, } = require('./operators/serviceOperators');

/** Saves document in tokens database
 * @param {Object} doc document to save
 * @return {Object} data from database
 */
async function saveDocumentInLogs(doc) {
    return await saveDocument(LogModel, doc);
}

module.exports = {
    saveDocumentInLogs,
};
