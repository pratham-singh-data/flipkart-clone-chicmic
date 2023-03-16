require(`dotenv`).config();
const mongoConnect = require('./app/startup/mongoStartup');
const express = require(`express`);

const app = express();

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
