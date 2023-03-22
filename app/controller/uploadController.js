const multer = require('multer');
const { ALLOWEDIMAGEMIMES, } = require('../util/constants');
const uuid = require(`uuid`);
const { sendResponse, } = require('../helper/responder');
const { FILESIZEMAX, IMAGEDATABASEURL, } = require('../../config');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(undefined, IMAGEDATABASEURL);
    },
    filename: function(req, file, cb) {
        const fileName = uuid.v4();

        cb(undefined, fileName);
    },
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
