const { Router, } = require(`express`);
const { signupUser, loginUser, } = require('../controller/userController');
const { handleError, } = require('../middleware/globalErrorHandler');

// eslint-disable-next-line new-cap
const userRouter = Router();

userRouter.post(`/signup`, signupUser, handleError);
userRouter.post(`/login`, loginUser, handleError);

module.exports = userRouter;
