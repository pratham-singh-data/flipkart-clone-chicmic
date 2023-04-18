const multer = require('multer');
const { ALLOWEDIMAGEMIMES, } = require('../util/constants');
const { sendResponse, } = require('../helper/responder');
const { FILESIZEMAX, MONGOURL, } = require('../../config');
const { GridFsStorage, } = require('multer-gridfs-storage');

const storage = new GridFsStorage({
    url: MONGOURL,
});

const upload = multer({
    storage,

    fileFilter: (req, file, cb) => {
        if (! ALLOWEDIMAGEMIMES.includes(file.mimetype)) {
            cb(null, false);

            sendResponse(req.res, {
                statusCode: 400,
                message: `File type ${file.mimetype} not allowed`,
            });

            return;
        }

        cb(null, true);
    },

    limits: {
        fileSize: FILESIZEMAX,
    },
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
