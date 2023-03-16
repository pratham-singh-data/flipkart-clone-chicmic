const { Router, } = require(`express`);
const { signupUser, loginUser, } = require('../controller/userController');

// eslint-disable-next-line new-cap
const userRouter = Router();

userRouter.post(`/signup`, signupUser);
userRouter.post(`/login`, loginUser);

module.exports = userRouter;
