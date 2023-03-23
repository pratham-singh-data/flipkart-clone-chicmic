const Joi = require(`joi`);
const { OBJECTIDREGEX, } = require('../util/constants');

const listingQuerySchema = Joi.object({
    skip: Joi.number().integer().min(0).optional().default(0),
    limit: Joi.number().integer().min(0).optional().default(10),
    category: Joi.string().regex(OBJECTIDREGEX).optional(),
});

module.exports = {
    listingQuerySchema,
};
