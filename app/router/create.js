const { Router, } = require(`express`);
const { createCategory, } = require('../controller/createController');
const { checkToken, } = require('../middleware/checkToken');

// eslint-disable-next-line new-cap
const createRouter = Router();

createRouter.post(`/category`, checkToken, createCategory);

module.exports = createRouter;
