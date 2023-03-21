const { Types: { ObjectId, }, } = require('mongoose');
const querystring = require(`querystring`);
const { generateLocalSendResponse, } = require('../../helper/responder');
const { ListingModel, } = require('../../models');

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
        const agg = ListingModel.aggregate();

        // filter category
        if (query.category) {
            agg.match({
                category: new ObjectId(query.category),
            });
        }

        // pagination
        agg.append([
            {
                $skip: parseInt(skip),
            },

            {
                $limit: parseInt(limit),
            },
        ]);

        // execute query
        const data = await agg.exec();

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
};
