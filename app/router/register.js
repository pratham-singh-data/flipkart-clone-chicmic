const { Router, } = require(`express`);
const { addToCart,
    addToWishlist, } = require('../controller/registerController');
const { checkToken, } = require('../middleware/checkToken');

// eslint-disable-next-line new-cap
const registerRouter = Router();

registerRouter.patch(`/addToCart`, checkToken, addToCart);
registerRouter.patch(`/addToWishlist/:id`, checkToken, addToWishlist);

module.exports = registerRouter;
