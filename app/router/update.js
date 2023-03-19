const { Router, } = require(`express`);
const { updateAddress,
    updatePromo, } = require('../controller/updateController');
const { checkToken, } = require('../middleware/checkToken');

// eslint-disable-next-line new-cap
const updateRouter = Router();

updateRouter.put(`/address/:id`, checkToken, updateAddress);
updateRouter.put(`/promo/:id`, checkToken, updatePromo);

module.exports = updateRouter;
