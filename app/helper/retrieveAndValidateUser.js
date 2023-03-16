const { UserModel, } = require('../models');
const { BuyerDisallow,
    AdminDisallow,
    AgentDisallow, } = require('../util/messages');

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

/** Retrive user data and throw an error if the given permissions do not follow
 * @param {String} id id of user to retrieve
 * @param {Boolean} allowBuyer Is admin allowed
 * @param {Boolean} allowAdmin Is admin allowed
 * @param {Boolean} allowAgent Is agent allowed
 * @return {Object} user data from database
 */
async function retrieveAndValidateUser(id,
    allowBuyer = true,
    allowAdmin = true,
    allowAgent = true) {
    const userData = await UserModel.findById(id).exec();

    if (! allowBuyer && userData.type === `buyer`) {
        throw new UserValidationError(BuyerDisallow);
    }

    if (! allowAdmin && userData.type === `admin`) {
        throw new UserValidationError(AdminDisallow);
    }

    if (! allowAgent && userData.type === `agent`) {
        throw new UserValidationError(AgentDisallow);
    }

    return userData;
}

module.exports = {
    retrieveAndValidateUser,
};
