module.exports = {
    SALT: process.env.SALT,
    SECRET_KEY: process.env.SECRET_KEY,
    MONGOURL: process.env.MONGOURL,
    TOKENEXPIRYTIME: 31536000, // 24 * 60 * 60 * 365; Seconds in a year
    HITLOGFILEURL: `./database/logs/hits.log`,
    ERRORLOGDIRECTORYURL: `./database/logs/errors`,
    IMAGEDATABASEURL: `./database/images`,
    FILESIZEMAX: 5242880, // in bytes, 5 MB; 1024 * 1024 * 5
    LOCALLOGGINGDATALIMIT: 10485760, // in bytes, 10 MB, 1024 * 1024 * 10
};
