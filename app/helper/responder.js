/** Sends the server response from express server
 * @param {Response} res Express response object
 * @param {Object} data Data to send in response
 */
function sendResponse(res, data) {
    res.status(data.statusCode),
    res.json(data);
}

/** Binds and returns an instande of sendResponse() bound to res
 * @param {Response} res Express response object
 * @return {Function} Function bound to res
 */
function generateLocalSendResponse(res) {
    return sendResponse.bind(undefined, res);
}

module.exports = {
    sendResponse,
    generateLocalSendResponse,
};
