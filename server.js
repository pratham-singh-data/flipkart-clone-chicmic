require(`dotenv`).config();
const mongoConnect = require('./app/startup/mongoStartup');
const express = require(`express`);
const { userRouter,
    createRouter,
    readRouter,
    registerRouter,
    updateRouter,
    deleteRouter, } = require('./app/router');
const { handleError, } = require('./app/middleware/globalErrorHandler');
const { sendResponse, } = require('./app/helper/responder');

const app = express();
app.use(express.json());

app.use(`/user`, userRouter);
app.use(`/create`, createRouter);
app.use(`/read`, readRouter);
app.use(`/register`, registerRouter);
app.use(`/update`, updateRouter);
app.use(`/delete`, deleteRouter);

app.all(`*`, NotFoundController, handleError);
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


/** Handles a non existent endpoint being accessed
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
function NotFoundController(req, res) {
    sendResponse(res, {
        statusCode: 404,
        message: `This endpoint does not exist.`,
    });
}
