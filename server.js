require(`dotenv`).config();
const mongoConnect = require('./app/startup/mongoStartup');
const express = require(`express`);
const { loggingErrorHandler, } = require('./app/util/loggingErrorHandler');
const { addressRouter,
    couponRouter,
    listingRouter,
    orderRouter,
    promoRouter,
    reviewRouter,
    uploadRouter,
    userRouter, } = require('./app/router');
const { NotFoundController, } = require('./app/controller/notFoundController');
const { handleError, } = require('./app/middleware');

const app = express();

app.use(express.json());

app.use(`/address`, addressRouter);
app.use(`/coupon`, couponRouter);
app.use(`/listing`, listingRouter);
app.use(`/order`, orderRouter);
app.use(`/promo`, promoRouter);
app.use(`/review`, reviewRouter);
app.use(`/upload`, uploadRouter);
app.use(`/user`, userRouter);
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

process.on(`uncaughtException`, loggingErrorHandler);
process.on(`unhandledRejection`, loggingErrorHandler);
