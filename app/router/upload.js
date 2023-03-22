const { Router, static, } = require(`express`);
const { IMAGEDATABASEURL, } = require('../../config');
const { uploadImageController, } = require('../controller/uploadController');
const { sendResponse, } = require('../helper/responder');
const { checkToken, } = require('../middleware');

// eslint-disable-next-line new-cap
const uploadRouter = Router();

uploadRouter.use(`/image`, static(IMAGEDATABASEURL));

// empty callback added to prevent an error due to setting response twice
uploadRouter.post(`/image`, checkToken, uploadImageController(`file`),
    (req, res) => {
        if (! req.file) {
            return;
        }

        sendResponse(res, {
            statusCode: 200,
            message: `${req.baseUrl}/image/${req.file.filename}`,
        });
    });

module.exports = {
    uploadRouter,
};
