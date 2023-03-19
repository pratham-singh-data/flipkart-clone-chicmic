require(`dotenv`).config();
const mongoConnect = require('./app/startup/mongoStartup');
const express = require(`express`);
const { userRouter,
    createRouter,
    readRouter,
    registerRouter, } = require('./app/router');

const app = express();
app.use(express.json());

app.use(`/user`, userRouter);
app.use(`/create`, createRouter);
app.use(`/read`, readRouter);
app.use(`/register`, registerRouter);

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
