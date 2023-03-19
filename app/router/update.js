const { Router, } = require(`express`);
const { updateAddress, } = require('../controller/updateController');
const { checkToken, } = require('../middleware/checkToken');

// eslint-disable-next-line new-cap
const updateRouter = Router();

updateRouter.put(`/address/:id`, checkToken, updateAddress);

module.exports = updateRouter;
