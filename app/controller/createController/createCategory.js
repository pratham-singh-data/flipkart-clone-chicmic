const Joi = require('joi');
const { verify, } = require('jsonwebtoken');
const { SECRET_KEY, } = require('../../../config');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { retrieveAndValidateUser, } =
require('../../helper/retrieveAndValidateUser');
const { CategoryModel, } = require('../../models/categoryModel');
const { DataSuccessfullyCreated,
    CredentialsCouldNotBeVerified, } = require('../../util/messages');
const { createCategorySchema, } = require('../../validator');

/** Creates a category in database
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 */
async function createCategory(req, res) {
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
    let body;

    try {
        body = Joi.attempt(req.body, createCategorySchema);
    } catch (err) {
        localResponder({
            statusCode: 400,
            message: err.message,
        });

        return;
    }

    // only create if a category of the same name does not already exist
    if (await CategoryModel.findOne(body).exec()) {
        localResponder({
            statusCode: 400,
            message: `This category already exists.`,
        });

        return;
    }


    // save to database
    const savedData = await new CategoryModel(body).save();

    localResponder({
        statusCode: 201,
        message: DataSuccessfullyCreated,
        savedData,
    });
}

module.exports = {
    createCategory,
};
