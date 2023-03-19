/** Custom validation error */
class UserValidationError extends Error {
    /** Constructor for special class error
     * @param {String} message the error message
     */
    constructor(message) {
        super(message);
        this.name = `UserValidationError`;
    }
}

module.exports = {
    UserValidationError,
};
