require(`dotenv`).config();
const { mongoConnect, } = require('./app/startup/mongoStartup');
const express = require(`express`);
const { loggingErrorHandler, } = require('./app/util/loggingErrorHandler');
const { expressStartup, } = require('./app/startup/expressStartup');

const app = express();

/** Initialises server */
async function startupServer() {
    await mongoConnect();
    expressStartup(app);
}

startupServer().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
}).catch((err) => {
    console.log(`Error starting server:\n${err.message}`);
});

process.on(`uncaughtException`, loggingErrorHandler);
process.on(`unhandledRejection`, loggingErrorHandler);

