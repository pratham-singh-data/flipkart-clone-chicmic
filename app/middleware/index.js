const { checkToken, } = require(`./checkToken`);
const { handleError, } = require(`./handleError`);
const { checkIdParam, } = require(`./checkIdParam`);
const { validateBody, } = require(`./validateBody`);
const { validateQuery, } = require(`./validateQuery`);
const { hitLogger, } = require(`./hitLogger`);

module.exports = {
    checkIdParam,
    checkToken,
    handleError,
    validateBody,
    validateQuery,
    hitLogger,
};
