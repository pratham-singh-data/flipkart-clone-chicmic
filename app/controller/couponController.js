const { verify, } = require('jsonwebtoken');
const { SECRET_KEY, } = require('../../config');
const { generateLocalSendResponse, } = require('../helper/responder');
const { retrieveAndValidateUser, } =
    require('../helper/retrieveAndValidateUser');
const { deleteFromCouponsById,
    findFromCouponsById,
    findManyFromListings,
    findManyFromCoupons,
    findOneFromCoupons,
    saveDocumentInCoupons,
    updateCouponsById, } = require('../service');
const { CredentialsCouldNotBeVerified,
    InvalidListingsDetected,
    CouponCodeRegistered,
    DataSuccessfullyUpdated,
    DataSuccessfullyCreated,
    DataSuccessfullyDeleted,
    NonExistentPromo,
    NonExistentCoupon, } = require('../util/messages');

/** Creates a coupon in database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function createCoupon(req, res, next) {
    const localResponder = generateLocalSendResponse(res);

    // just in case the token expired between calls
    let id;

    try {
        ({ id, } = verify(req.headers.token, SECRET_KEY));
    } catch (err) {
        localResponder({
            statusCode: 403,
            message: CredentialsCouldNotBeVerified,
        });

        return;
    }

    // this operation can only be done by an admin
    try {
        await retrieveAndValidateUser(id, false, true, false);
    } catch (err) {
        localResponder({
            statusCode: 400,
            message: err.message,
        });

        return;
    }

    // get data from body
    const body = req.body;

    try {
        // confirm that all items in applicability exiss in listings
        const applyTargets = await findManyFromListings({
            _id: {
                $in: body.applicability,
            },
        });

        if (applyTargets.length !== body.applicability.length) {
            localResponder({
                statusCode: 400,
                message: InvalidListingsDetected,
            });

            return;
        }

        // only save if thecoupon code is unique
        if (await findOneFromCoupons({
            couponCode: body.couponCode,
        })) {
            localResponder({
                statusCode: 400,
                message: CouponCodeRegistered,
            });

            return;
        }

        // save to database
        const savedData = await saveDocumentInCoupons(body);

        localResponder({
            statusCode: 201,
            message: DataSuccessfullyCreated,
            savedData,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** Update coupon id in database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function updateCoupon(req, res, next) {
    const localResponder = generateLocalSendResponse(res);
    const idToUpdate = req.params.id;

    // just in case the token expired between calls
    let id;

    try {
        ({ id, } = verify(req.headers.token, SECRET_KEY));
    } catch (err) {
        localResponder({
            statusCode: 403,
            message: CredentialsCouldNotBeVerified,
        });

        return;
    }

    // this operation can only be done by an admin
    try {
        await retrieveAndValidateUser(id, false, true, false);
    } catch (err) {
        localResponder({
            statusCode: 400,
            message: err.message,
        });

        return;
    }

    // get data from body
    const body = req.body;

    try {
        // confirm that all items in applicability exist in listings
        const applyTargets = await findManyFromListings({
            _id: {
                $in: body.applicability,
            },
        });

        if (applyTargets.length !== body.applicability.length) {
            localResponder({
                statusCode: 400,
                message: InvalidListingsDetected,
            });

            return;
        }

        // only save if thecoupon code is unique
        if (await findOneFromCoupons({
            couponCode: body.couponCode,
            _id: {
                $ne: idToUpdate,
            },
        })) {
            localResponder({
                statusCode: 400,
                message: CouponCodeRegistered,
            });

            return;
        }

        // save to database
        await updateCouponsById(idToUpdate, {
            $set: body,
        });

        localResponder({
            statusCode: 200,
            message: DataSuccessfullyUpdated,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** Delete coupon frpm database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function deleteCoupon(req, res, next) {
    const idToDelete = req.params.id;
    const localResponder = generateLocalSendResponse(res);

    // just in case the token expired between calls
    let id;

    try {
        ({ id, } = verify(req.headers.token, SECRET_KEY));
    } catch (err) {
        localResponder({
            statusCode: 403,
            message: CredentialsCouldNotBeVerified,
        });

        return;
    }

    // this operation can only be done by an admin
    try {
        await retrieveAndValidateUser(id, false, true, false);
    } catch (err) {
        localResponder({
            statusCode: 400,
            message: err.message,
        });

        return;
    }

    try {
        if (! await findFromCouponsById(idToDelete)) {
            localResponder({
                statusCode: 404,
                message: NonExistentPromo,
            });

            return;
        }

        await deleteFromCouponsById(idToDelete);

        localResponder({
            statusCode: 200,
            message: DataSuccessfullyDeleted,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** Reads all coupons from database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function readAllCoupons(req, res, next) {
    const localResponder = generateLocalSendResponse(res);

    try {
        // save to database
        const data = await findManyFromCoupons();

        localResponder({
            statusCode: 200,
            data,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** reads coupon of given id
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function readCoupon(req, res, next) {
    const id = req.params.id;
    const localResponder = generateLocalSendResponse(res);

    try {
        const data = await findFromCouponsById(id);

        if (! data) {
            localResponder({
                statusCode: 404,
                message: NonExistentCoupon,
            });

            return;
        }

        localResponder({
            statusCode: 200,
            data,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

module.exports = {
    updateCoupon,
    createCoupon,
    deleteCoupon,
    readAllCoupons,
    readCoupon,
};
