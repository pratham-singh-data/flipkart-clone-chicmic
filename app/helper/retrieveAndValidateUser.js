const { UserValidationError, } = require('../classes/UserValidationError');
const { UserModel, } = require('../models');
const { BUYERDISALLOW,
    ADMINDISALLOW,
    AGENTDISALLOW, } = require('../util/messages');

/** Retrive user data and throw an error if the given permissions do not follow
 * @param {String} id id of user to retrieve
 * @param {Boolean} allowBuyer Is buyer allowed; default true
 * @param {Boolean} allowAdmin Is admin allowed; default true
 * @param {Boolean} allowAgent Is agent allowed; default true
 * @return {Object} user data from database
 */
async function retrieveAndValidateUser(id,
    allowBuyer = true,
    allowAdmin = true,
    allowAgent = true) {
    const userData = await UserModel.findById(id).exec();

    if (! allowBuyer && userData.type === `buyer`) {
        throw new UserValidationError(BUYERDISALLOW);
    }

    if (! allowAdmin && userData.type === `admin`) {
        throw new UserValidationError(ADMINDISALLOW);
    }

    if (! allowAgent && userData.type === `agent`) {
        throw new UserValidationError(AGENTDISALLOW);
    }

    return userData;
}

module.exports = {
    retrieveAndValidateUser,
};
