require(`dotenv`).config();
const mongoConnect = require('./app/startup/mongoStartup');
const express = require(`express`);
const { userRouter,
    createRouter,
    readRouter,
    registerRouter,
    updateRouter,
    deleteRouter,
    uploadRouter, } = require('./app/router');
const { handleError, } = require('./app/middleware/globalErrorHandler');
const { NotFoundController, } = require('./app/controller/globals');

const app = express();
app.use(express.json());

app.use(`/user`, userRouter);
app.use(`/create`, createRouter);
app.use(`/read`, readRouter);
app.use(`/register`, registerRouter);
app.use(`/update`, updateRouter);
app.use(`/delete`, deleteRouter);
app.use(`/upload`, uploadRouter);

app.all(`*`, NotFoundController);
app.use(handleError);

/** Initialises server */
async function startupServer() {
    await mongoConnect();
}

startupServer().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
}).catch((err) => {
    console.log(`Error starting server:\n${err.message}`);
});
