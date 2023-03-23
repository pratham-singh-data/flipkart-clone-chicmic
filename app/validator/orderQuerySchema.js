const Joi = require(`joi`);
const { OBJECTIDREGEX, } = require('../util/constants');

const orderQuerySchema = Joi.object({
    skip: Joi.number().integer().min(0).optional().default(0),
    limit: Joi.number().integer().min(0).optional().default(10),
    user: Joi.string().regex(OBJECTIDREGEX).optional(),
});

module.exports = {
    orderQuerySchema,
};
