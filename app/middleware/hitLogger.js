const { appendFileSync,
    fstatSync,
    openSync,
    readFileSync,
    truncateSync, } = require(`fs`);
const { HITLOGFILEURL, LOCALLOGGINGDATALIMIT, } = require('../../config');
const { saveDocumentInLogs, } = require('../service');
const { error, } = require('../util/logger');

/** Check file data and if it exceeds a given limit then save to file */
function checkAndSaveData() {
    const stats = fstatSync(openSync(HITLOGFILEURL));

    if (stats.size >= LOCALLOGGINGDATALIMIT) {
        const data = readFileSync(HITLOGFILEURL, {
            encoding: `utf-8`,
        });

        try {
            saveDocumentInLogs({
                data,
            });

            truncateSync(HITLOGFILEURL, 0);
        } catch (err) {
            // if logging failed then do not delete the file
            error(err.message);
        }
    }
}

/** Logs each hit to the API in local log file (link from config file)
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
function hitLogger(req, res, next) {
    appendFileSync(HITLOGFILEURL,
        `${Date.now()} ${req.method} ${req.originalUrl}\n`);

    checkAndSaveData();

    next();
}

module.exports = {
    hitLogger,
};
