const { Router, } = require(`express`);
const { signupUser,
    loginUser,
    checkout, } = require('../controller/userController');
const { checkToken, } = require('../middleware/checkToken');
const { handleError, } = require('../middleware/globalErrorHandler');

// eslint-disable-next-line new-cap
const userRouter = Router();

userRouter.post(`/signup`, signupUser, handleError);
userRouter.post(`/login`, loginUser, handleError);
userRouter.post(`/checkout`, checkToken, checkout, handleError);

module.exports = userRouter;
