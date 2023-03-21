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

// eslint-disable-next-line new-cap
const deleteRouter = Router();

deleteRouter.param(`id`, checkIdParam);

deleteRouter.delete(`/promo/:id`, checkToken, deletePromo);
deleteRouter.delete(`/coupon/:id`, checkToken, deleteCoupon);
deleteRouter.delete(`/listing/:id`, checkToken, deleteListing);
deleteRouter.delete(`/order/:id`, checkToken, deleteOrder);
deleteRouter.delete(`/address/:id`, checkToken, deleteAddress);
deleteRouter.delete(`/user`, checkToken, deleteUser);
deleteRouter.delete(`/review/:id`, checkToken, deleteReview);

module.exports = deleteRouter;
