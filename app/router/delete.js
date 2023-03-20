const { Router, } = require(`express`);
const { deletePromo,
    deleteCoupon,
    deleteListing,
    deleteOrder, } = require('../controller/deleteController');
const { checkToken, } = require('../middleware/checkToken');
const { handleError, } = require('../middleware/globalErrorHandler');

// eslint-disable-next-line new-cap
const deleteRouter = Router();

deleteRouter.delete(`/promo/:id`, checkToken, deletePromo, handleError);
deleteRouter.delete(`/coupon/:id`, checkToken, deleteCoupon, handleError);
deleteRouter.delete(`/listing/:id`, checkToken, deleteListing);
deleteRouter.delete(`/order/:id`, checkToken, deleteOrder);

module.exports = deleteRouter;
