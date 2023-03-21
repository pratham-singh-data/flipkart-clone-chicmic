const { Router, } = require(`express`);
const { signupUser,
    loginUser,
    checkout, } = require('../controller/userController');
const { checkToken, } = require('../middleware/checkToken');
const { validateBody, } = require('../middleware/validateBody');
const { signupSchema, loginSchema, } = require('../validator');

// eslint-disable-next-line new-cap
const userRouter = Router();

userRouter.post(`/signup`, validateBody(signupSchema), signupUser);
userRouter.post(`/login`, validateBody(loginSchema), loginUser);
userRouter.post(`/checkout`, checkToken, checkout);

module.exports = userRouter;
