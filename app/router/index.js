const userRouter = require(`./user`);
const createRouter = require(`./create`);
const readRouter = require(`./read`);
const registerRouter = require(`./register`);
const updateRouter = require(`./update`);

module.exports = {
    userRouter,
    createRouter,
    readRouter,
    registerRouter,
    updateRouter,
};
