const { Router, } = require(`express`);
const { uploadImageController, } = require('../controller/uploadController');
const { sendResponse, } = require('../helper/responder');
const { checkToken, } = require('../middleware');
const { TOKENTYPES, } = require('../util/constants');
const { NONEXISTENTFILE, } = require('../util/messages');
const mongoose = require('mongoose');

// eslint-disable-next-line new-cap
const uploadRouter = Router();

// empty callback added to prevent an error due to setting response twice
uploadRouter.post(`/image`,
    checkToken(TOKENTYPES.LOGIN),
    uploadImageController(`file`),
    (req, res) => {
        if (! req.file) {
            return;
        }

        sendResponse(res, {
            statusCode: 200,
            filename: req.file.filename,
        });
    }
);

uploadRouter.get(`/image/:filename`,
    (req, res) => {
        const db = mongoose.connections[0].db;
        const bucket = new mongoose.mongo.GridFSBucket(db, {
            bucketName: 'fs',
        });

        const filename = req.params.filename;
        const downloadStream = bucket.openDownloadStreamByName(filename);

        downloadStream.on('error', (err) => {
            res.status(404).send(NONEXISTENTFILE);
        });

        downloadStream.on('file', (file) => {
            res.set('Content-Type', file.contentType);
        });

        res.set('Content-Disposition', `inline; filename='${filename}'`);

        downloadStream.pipe(res);
    }
);

module.exports = {
    uploadRouter,
};
