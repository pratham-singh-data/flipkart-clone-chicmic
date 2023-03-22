const { verify, } = require('jsonwebtoken');
const { SECRET_KEY, } = require('../../config');
const { generateLocalSendResponse, } = require('../helper/responder');
const { ReviewModel, } = require('../models');
const { DataSuccessfullyUpdated,
    ReviewDoesNotBelong,
    NonExistentReview,
    CredentialsCouldNotBeVerified,
    CanOnlyReviewOnceBought,
    DataSuccessfullyCreated,
    NonExistentListing,
    DataSuccessfullyDeleted, } = require('../util/messages');
const { Types: { ObjectId, }, } = require(`mongoose`);
const { deleteFromReviewsById, } = require('../service/deleteByIdService');
const { findFromReviewsById,
    findFromListingsById, } = require('../service/findByIdService');
const { updateReviewsById, } = require('../service/updateByIdService');
const { findManyFromReviews, } = require('../service/findManyService');
const { saveDocumentInReviews, } = require('../service/saveDocumentService');
const { findOneFromOrders, } = require('../service/findOneServices');

/** Update review of given id in database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function updateReview(req, res, next) {
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

    // validate body
    const body = req.body;

    try {
        const reviewData = await findFromReviewsById(idToUpdate);

        if (! reviewData) {
            localResponder({
                statusCode: 404,
                message: NonExistentReview,
            });

            return;
        }

        if (String(reviewData.user) !== id) {
            localResponder({
                statusCode: 403,
                message: ReviewDoesNotBelong,
            });

            return;
        }

        await updateReviewsById(idToUpdate, {
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

/** Registers a review for a product that the current user has bought.
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function registerReview(req, res, next) {
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

    // validate body
    const body = req.body;

    try {
        // check that the user has bought this product
        const orderHistory = await findOneFromOrders({
            'buyer': id,
            'items': {
                $elemMatch: {
                    item: body.listing,
                },
            },
        });

        // user can only review a product that they have bought
        if (! orderHistory) {
            localResponder({
                statusCode: 403,
                message: CanOnlyReviewOnceBought,
            });

            return;
        }

        // generate data
        body.user = id;

        // save to database
        const savedData = await saveDocumentInReviews(body);

        localResponder({
            statusCode: 200,
            message: DataSuccessfullyCreated,
            savedData,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** reads all reviews of a given listing
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function readReviews(req, res, next) {
    const listingId = req.params.id;
    const localResponder = generateLocalSendResponse(res);

    try {
        if (! await findFromListingsById(listingId)) {
            localResponder({
                statusCode: 404,
                message: NonExistentListing,
            });
            return;
        }

        const data = await findManyFromReviews({
            listing: listingId,
        });

        localResponder({
            statusCode: 200,
            data,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** reads average rating of a given listing
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function readAverageRating(req, res, next) {
    const listingId = req.params.id;
    const localResponder = generateLocalSendResponse(res);

    try {
        if (! await findFromListingsById(listingId)) {
            localResponder({
                statusCode: 404,
                message: NonExistentListing,
            });
            return;
        }

        const average = (await ReviewModel.aggregate([
            {
                $match: {
                    listing: new ObjectId(listingId),
                },
            },

            {
                $group: {
                    _id: `$listing`,
                    average: {
                        $avg: `$rating`,
                    },
                },
            },
        ]).exec())[0].average;

        localResponder({
            statusCode: 200,
            average,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** Delete review frpm database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next functoion
 */
async function deleteReview(req, res, next) {
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

    try {
        const reviewData = await findFromReviewsById(idToDelete);

        if (! reviewData) {
            localResponder({
                statusCode: 404,
                message: NonExistentReview,
            });

            return;
        }

        if (String(reviewData.user) !== id) {
            localResponder({
                statusCode: 403,
                message: ReviewDoesNotBelong,
            });

            return;
        }

        await deleteFromReviewsById(idToDelete);

        localResponder({
            statusCode: 200,
            message: DataSuccessfullyDeleted,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

module.exports = {
    updateReview,
    registerReview,
    readReviews,
    readAverageRating,
    deleteReview,
};
