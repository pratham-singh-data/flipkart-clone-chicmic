const { Router, } = require(`express`);
const { signupUser, } = require('../controller/userController');

// eslint-disable-next-line new-cap
const userRouter = Router();

userRouter.post(`/signup`, signupUser);

module.exports = userRouter;
