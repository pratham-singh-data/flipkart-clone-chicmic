const { writeFileSync, } = require(`fs`);
const { ERRORLOGDIRECTORYURL, } = require('../../config');
const { error, } = require('./logger');

/** Logs error to console
 * @param {Error} err Error object
 */
function loggingErrorHandler(err) {
    const logFileName = `${ERRORLOGDIRECTORYURL}/${Date.now()}.log`;

    writeFileSync(logFileName,
        `${err.name}\n\n${err.stack}`);

    error(`${err.message}\nError details in ${logFileName}`);
}

module.exports = {
    loggingErrorHandler,
};
