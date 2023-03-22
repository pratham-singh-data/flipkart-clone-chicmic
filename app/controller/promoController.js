const { verify, } = require('jsonwebtoken');
const { SECRET_KEY, } = require('../../config');
const { generateLocalSendResponse,
    sendResponse, } = require('../helper/responder');
const { retrieveAndValidateUser, } =
    require('../helper/retrieveAndValidateUser');
const { deleteFromPromoById,
    findFromPromoById,
    findManyFromPromo,
    saveDocumentInPromos,
    updatePromoById, } = require('../service');
const { getWeightedRandom, } = require('../util/getWeightedRandom');
const { DataSuccessfullyUpdated,
    PromoDoesNotBelong,
    NonExistentPromo,
    CredentialsCouldNotBeVerified,
    DataSuccessfullyCreated,
    DataSuccessfullyDeleted, } = require('../util/messages');

/** Updates an promo in the database; id from query
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function updatePromo(req, res, next) {
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
        const promoData = await findFromPromoById(idToUpdate);

        if (! promoData) {
            localResponder({
                statusCode: 400,
                message: NonExistentPromo,
            });

            return;
        }

        // can only update if address belongs to current user
        if (String(promoData.user) !== id) {
            localResponder({
                statusCode: 401,
                message: PromoDoesNotBelong,
            });

            return;
        }

        await updatePromoById(idToUpdate, {
            $set: body,
        });

        // update database
        localResponder({
            statusCode: 200,
            message: DataSuccessfullyUpdated,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** Register promo click
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function registerPromoClick(req, res, next) {
    const localResponder = generateLocalSendResponse(res);
    const id = req.params.id;

    try {
        // check that promo exists
        const data = await findFromPromoById(id);

        if (! data) {
            localResponder({
                statusCode: 404,
                message: NonExistentPromo,
            });

            return;
        }

        // update database
        await updatePromoById(id, {
            $set: {
                clicks: data.clicks + 1,
            },
        });

        localResponder({
            statusCode: 200,
            message: DataSuccessfullyUpdated,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** Register promo view
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function registerPromoView(req, res, next) {
    const localResponder = generateLocalSendResponse(res);
    const id = req.params.id;

    try {
        // check that promo exists
        const data = await findFromPromoById(id);

        if (! data) {
            localResponder({
                statusCode: 404,
                message: NonExistentPromo,
            });

            return;
        }

        // update database
        await updatePromoById(id, {
            $set: {
                views: data.views + 1,
            },
        });

        localResponder({
            statusCode: 200,
            message: DataSuccessfullyUpdated,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** reads the specified promo from params
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function readPromo(req, res, next) {
    const id = req.params.id;
    const localResponder = generateLocalSendResponse(res);

    try {
        const data = await findFromPromoById(id);

        if (! data) {
            localResponder({
                statusCode: 404,
                message: NonExistentPromo,
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

/** reads all promos in the database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function readAllPromos(req, res, next) {
    const localResponder = generateLocalSendResponse(res);

    try {
        const data = await findManyFromPromo();

        localResponder({
            statusCode: 400,
            data,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** Creates a promo in database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function createPromo(req, res, next) {
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

    // generate data
    body.clicks = body.views = 0;
    body.user = id;

    try {
        // save to database
        const savedData = await saveDocumentInPromos(body);

        localResponder({
            statusCode: 201,
            message: DataSuccessfullyCreated,
            savedData,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

/** reads a random promo from the database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function readRandomPromo(req, res, next) {
    try {
        const promos = await findManyFromPromo({}, {
            _id: true,
            priority: true,
        });

        const randomId = getWeightedRandom(promos.map((inp) => {
            return [ String(inp._id), inp.priority, ];
        }));

        sendResponse(req.res, {
            statusCode: 200,
            data: await findFromPromoById(randomId),
        });
    } catch (err) {
        next(new Error(err.message));
    }
}

/** Delete promo frpm database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {Function} next Express next function
 */
async function deletePromo(req, res, next) {
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
        if (! await findFromPromoById(idToDelete)) {
            localResponder({
                statusCode: 404,
                message: NonExistentPromo,
            });

            return;
        }

        await deleteFromPromoById(idToDelete);

        localResponder({
            statusCode: 200,
            message: DataSuccessfullyDeleted,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

module.exports = {
    updatePromo,
    registerPromoClick,
    registerPromoView,
    readPromo,
    readAllPromos,
    createPromo,
    readRandomPromo,
    deletePromo,
};
