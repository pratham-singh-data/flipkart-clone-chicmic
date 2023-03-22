const { NotFoundController, } = require('../controller/notFoundController');
const express = require(`express`);
const { addressRouter,
    couponRouter,
    listingRouter,
    orderRouter,
    promoRouter,
    reviewRouter,
    uploadRouter,
    userRouter, } = require('../router');
const { handleError, hitLogger, } = require('../middleware');

/** Performs express startup functions
 * @param {Application} app Express application
 */
function expressStartup(app) {
    app.use(express.json());
    app.use(hitLogger);

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
}

module.exports = {
    expressStartup,
};
