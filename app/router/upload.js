const { Router, static, } = require(`express`);
const { uploadImageController, } = require('../controller/uploadController');
const { sendResponse, } = require('../helper/responder');
const { checkToken, } = require('../middleware');

// eslint-disable-next-line new-cap
const uploadRouter = Router();

uploadRouter.use(`/static`, static(`./database`));

// empty callback added to prevent an error due to setting response twice
uploadRouter.post(`/image`, checkToken, uploadImageController(`file`),
    (req, res) => {
        if (! req.file) {
            return;
        }

        sendResponse(res, {
            statusCode: 200,
            message: req.file.path,
        });
    });

module.exports = {
    uploadRouter,
};
