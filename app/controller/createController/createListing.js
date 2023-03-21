const { verify, } = require('jsonwebtoken');
const { SECRET_KEY, } = require('../../../config');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { retrieveAndValidateUser, } =
require('../../helper/retrieveAndValidateUser');
const { CategoryModel, ListingModel, } = require('../../models');
const { DataSuccessfullyCreated,
    CredentialsCouldNotBeVerified,
    InvalidCategoriesDetected, } = require('../../util/messages');

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
        const categories = await CategoryModel.find({
            _id: {
                $in: body.category,
            },
        }).exec();

        if (categories.length !== body.category.length) {
            localResponder({
                statusCode: 400,
                message: InvalidCategoriesDetected,
            });

            return;
        }

        // generate data
        body.seller = id;
        body.sinceWhen = Date.now();

        // save to database
        const savedData = await new ListingModel(body).save();

        localResponder({
            statusCode: 201,
            message: DataSuccessfullyCreated,
            savedData,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

module.exports = {
    createListing,
};
