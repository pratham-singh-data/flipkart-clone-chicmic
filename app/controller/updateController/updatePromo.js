const { verify, } = require('jsonwebtoken');
const { SECRET_KEY, } = require('../../../config');
const { generateLocalSendResponse, } = require('../../helper/responder');
const { PromoModel, } = require('../../models');
const { DataSuccessfullyUpdated,
    CredentialsCouldNotBeVerified,
    NonExistentPromo,
    PromoDoesNotBelong, } = require('../../util/messages');

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
        const promoData = await PromoModel.findById(idToUpdate).exec();

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
                statusCode: 403,
                message: PromoDoesNotBelong,
            });

            return;
        }

        await PromoModel.updateOne({
            _id: idToUpdate,
        }, {
            $set: body,
        }).exec(),

        // update database
        localResponder({
            statusCode: 200,
            message: DataSuccessfullyUpdated,
        });
    } catch (e) {
        next(new Error(e.message));
    }
}

module.exports = {
    updatePromo,
};
