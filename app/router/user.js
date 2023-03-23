const { Router, } = require(`express`);
const { loginUser,
    signupUser,
    checkout,
    updateUser,
    deleteUser,
    readUser, } = require('../controller/userController');
const { checkToken, validateBody, } = require('../middleware');
const { TOKENTYPES, } = require('../util/constants');
const { signupSchema,
    loginSchema, } = require('../validator');

// eslint-disable-next-line new-cap
const userRouter = Router();

userRouter.post(`/signup`, validateBody(signupSchema), signupUser);
userRouter.post(`/login`, validateBody(loginSchema), loginUser);
userRouter.post(`/checkout`, checkToken(TOKENTYPES.LOGIN), checkout);
userRouter.put(`/`, checkToken(TOKENTYPES.LOGIN),
    validateBody(signupSchema),
    updateUser);
userRouter.delete(`/`, checkToken(TOKENTYPES.LOGIN), deleteUser);
userRouter.get(`/`, checkToken(TOKENTYPES.LOGIN), readUser);

module.exports = {
    userRouter,
};
