const { pbkdf2Sync, } = require(`crypto`);
const { SALT, } = require('../../config');

/** Generates a hash value of the password
 * @param {String} password password to hash
 * @return {String} hash value generated from the given password
 */
function hashPassword(password) {
    return pbkdf2Sync(password, SALT, 1000, 64, `sha512`).toString(`hex`);
}

module.exports = {
    hashPassword,
};
