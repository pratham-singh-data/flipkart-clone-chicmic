const { Router, } = require(`express`);
const { signupUser,
    loginUser,
    checkout, } = require('../controller/userController');
const { checkToken, } = require('../middleware/checkToken');

// eslint-disable-next-line new-cap
const userRouter = Router();

userRouter.post(`/signup`, signupUser);
userRouter.post(`/login`, loginUser);
userRouter.post(`/checkout`, checkToken, checkout);

module.exports = userRouter;
