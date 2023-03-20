const { Router, } = require(`express`);
const { deletePromo,
    deleteCoupon,
    deleteListing,
    deleteOrder,
    deleteAddress,
    deleteUser,
    deleteReview, } = require('../controller/deleteController');
const { checkIdParam, } = require('../middleware/checkIdParam');
const { checkToken, } = require('../middleware/checkToken');
const { handleError, } = require('../middleware/globalErrorHandler');

// eslint-disable-next-line new-cap
const deleteRouter = Router();

deleteRouter.delete(`/promo/:id`, checkToken,
    checkIdParam,
    deletePromo,
    handleError);
deleteRouter.delete(`/coupon/:id`, checkToken,
    checkIdParam,
    deleteCoupon,
    handleError);
deleteRouter.delete(`/listing/:id`, checkToken, checkIdParam, deleteListing);
deleteRouter.delete(`/order/:id`, checkToken, checkIdParam, deleteOrder);
deleteRouter.delete(`/address/:id`, checkToken, checkIdParam, deleteAddress);
deleteRouter.delete(`/user`, checkToken, deleteUser);
deleteRouter.delete(`/review/:id`, checkToken, checkIdParam, deleteReview);

module.exports = deleteRouter;
