const { generateLocalSendResponse, } = require('../helper/responder');
const querystring = require(`querystring`);
const { Types: { ObjectId, }, } = require(`mongoose`);
const { InvalidCategoriesDetected,
    CredentialsCouldNotBeVerified,
    DataSuccessfullyCreated,
    NonExistentListing,
    DataSuccessfullyDeleted,
    ListingDoesNotBelong,
    DataSuccessfullyUpdated, } = require('../util/messages');
const { retrieveAndValidateUser, } =
    require('../helper/retrieveAndValidateUser');
const { SECRET_KEY, } = require('../../config');
const { verify, } = require('jsonwebtoken');
const { deleteFromListingsById,
    findFromListingsById,
    findManyFromCategories,
    saveDocumentInListings,
    saveDocumentInCategories,
    findOneFromListings,
    findOneFromCategories,
    runAggregateOnListings,
    updateListingsById, } = require('../service');

/** Reads all listings in database; accepts skip, limit and category from query
 * you may send next, skip and category id in query
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function readAllListings(req, res, next) {
    const localResponder = generateLocalSendResponse(res);

    const query = querystring.parse(req.originalUrl.slice(
        req.originalUrl.indexOf(`listings?`) + 9), `&`, `=`);
    const skip = query.skip ?? 0;
    const limit = query.limit ?? 10;

    try {
        const pipeline = [];

        // filter category
        if (query.category) {
            pipeline.push({
                $match: {
                    category: new ObjectId(query.category),
                },
            });
        }

        // pagination
        pipeline.push(...[
            {
                $skip: parseInt(skip),
            },

            {
                $limit: parseInt(limit),
            },
        ]);

        // execute query
        const data = await runAggregateOnListings(pipeline);

        localResponder({
            statusCode: 200,
            data,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** Creates a listing in database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function createListing(req, res, next) {
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
        // confirm that all categories exist
        const categories = await findManyFromCategories({
            _id: {
                $in: body.category,
            },
        });

        if (categories.length !== body.category.length) {
            localResponder({
                statusCode: 400,
                message: InvalidCategoriesDetected,
            });

            return;
        }

        // generate data
        body.seller = id;

        // save to database
        const savedData = await saveDocumentInListings(body);

        localResponder({
            statusCode: 201,
            message: DataSuccessfullyCreated,
            savedData,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** Updates a listing in database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function updateListing(req, res, next) {
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

    // get data from body
    const body = req.body;

    try {
        // get data of specified listing
        const listingData = await findFromListingsById(idToUpdate);

        if (! listingData) {
            localResponder({
                statusCode: 400,
                message: NonExistentListing,
            });

            return;
        }

        // can only update listing belonging to the current user
        if (String(listingData.seller) !== id) {
            localResponder({
                statusCode: 403,
                message: ListingDoesNotBelong,
            });

            return;
        }

        // confirm that all categories exist
        const categories = await findManyFromCategories({
            _id: {
                $in: body.category,
            },
        });

        if (categories.length !== body.category.length) {
            localResponder({
                statusCode: 400,
                message: InvalidCategoriesDetected,
            });

            return;
        }

        updateListingsById(idToUpdate, {
            $set: body,
        });

        localResponder({
            statusCode: 201,
            message: DataSuccessfullyUpdated,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** reads the specified listing from params
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function readListing(req, res, next) {
    const id = req.params.id;
    const localResponder = generateLocalSendResponse(res);

    try {
        const data = await findFromListingsById(id);

        if (! data) {
            localResponder({
                statusCode: 404,
                message: NonExistentListing,
            });

            return;
        }

        localResponder({
            statusCode: 400,
            data,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** Delete listing frpm database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function deleteListing(req, res, next) {
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
        if (! await findOneFromListings({
            _id: idToDelete,
            seller: id,
        })) {
            localResponder({
                statusCode: 404,
                message: NonExistentListing,
            });
            return;
        }

        await deleteFromListingsById(idToDelete);

        localResponder({
            statusCode: 200,
            message: DataSuccessfullyDeleted,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** Creates a category in database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function createCategory(req, res, next) {
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
        // only create if a category of the same name does not already exist
        if (await findOneFromCategories(body)) {
            localResponder({
                statusCode: 400,
                message: `This category already exists.`,
            });

            return;
        }

        // save to database
        const savedData = await saveDocumentInCategories(body);

        localResponder({
            statusCode: 201,
            message: DataSuccessfullyCreated,
            savedData,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** Reads all categoriess from database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function readCategories(req, res, next) {
    const localResponder = generateLocalSendResponse(res);

    try {
        // read from database
        const data = (await findManyFromCategories({}, {
            _id: false,
            name: true,
        })).map((inp) => inp.name);

        localResponder({
            statusCode: 200,
            data,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

module.exports = {
    readAllListings,
    readListing,
    createListing,
    updateListing,
    deleteListing,
    createCategory,
    readCategories,
};
