const multer = require('multer');
const { sendResponse, } = require('../../helper/responder');
const { ImageDatabaseURL, } = require('../../util/constants');
const uuid = require(`uuid`);

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(undefined, ImageDatabaseURL);
    },
    filename: function(req, file, cb) {
        const fileName = uuid.v4();

        cb(undefined, fileName);

        sendResponse(req.res, {
            statusCode: 201,
            fileName: ImageDatabaseURL + `/` + fileName,
        });
    },
});

const upload = multer({
    storage,
});

/** Function to upload images and return their address
 * @param {String} fieldName Name of filed containing file
 * @return {Function} multer middleware function
*/
function uploadImageController(fieldName) {
    return upload.single(fieldName);
}

module.exports = {
    uploadImageController,
};
