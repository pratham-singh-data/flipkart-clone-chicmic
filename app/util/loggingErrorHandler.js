/** Logs error to console
 * @param {Error} err Error object
 */
function loggingErrorHandler(err) {
    console.log(err.message);
}

module.exports = {
    loggingErrorHandler,
};
