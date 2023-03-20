const { Router, } = require(`express`);
const { deletePromo,
    deleteCoupon,
    deleteListing, } = require('../controller/deleteController');
const { checkToken, } = require('../middleware/checkToken');

// eslint-disable-next-line new-cap
const deleteRouter = Router();

deleteRouter.delete(`/promo/:id`, checkToken, deletePromo);
deleteRouter.delete(`/coupon/:id`, checkToken, deleteCoupon);
deleteRouter.delete(`/listing/:id`, checkToken, deleteListing);

module.exports = deleteRouter;
