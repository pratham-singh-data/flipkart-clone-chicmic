const { checkToken, } = require(`./checkToken`);
const { handleError, } = require(`./handleError`);
const { checkIdParam, } = require(`./checkIdParam`);
const { validateBody, } = require(`./validateBody`);

module.exports = {
    checkIdParam,
    checkToken,
    handleError,
    validateBody,
};
