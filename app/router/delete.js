const { Router, } = require(`express`);
const { deletePromo, } = require('../controller/deleteController');
const { checkToken, } = require('../middleware/checkToken');

// eslint-disable-next-line new-cap
const deleteRouter = Router();

deleteRouter.delete(`/promo/:id`, checkToken, deletePromo);

module.exports = deleteRouter;
