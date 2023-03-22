const { Router, } = require(`express`);
const { uploadImageController, } = require('../controller/uploadController');
const { checkToken, } = require('../middleware');

// eslint-disable-next-line new-cap
const uploadRouter = Router();

// empty callback added to prevent an error due to setting response twice
uploadRouter.post(`/image`, checkToken, uploadImageController(`file`),
    () => {});

module.exports = {
    uploadRouter,
};
