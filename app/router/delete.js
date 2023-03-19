const { Router, } = require(`express`);
const { deletePromo,
    deleteCoupon, } = require('../controller/deleteController');
const { checkToken, } = require('../middleware/checkToken');

// eslint-disable-next-line new-cap
const deleteRouter = Router();

deleteRouter.delete(`/promo/:id`, checkToken, deletePromo);
deleteRouter.delete(`/coupon/:id`, checkToken, deleteCoupon);

module.exports = deleteRouter;
