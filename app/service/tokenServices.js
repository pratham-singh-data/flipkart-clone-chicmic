const { TokenModel, } = require('../models');
const { saveDocument, } = require('./operators/serviceOperators');

/** Saves document in tokens database
 * @param {Object} doc document to save
 * @return {Object} data from database
 */
async function saveDocumentInTokens(doc) {
    return await saveDocument(TokenModel, doc);
}

module.exports = {
    saveDocumentInTokens,
};
