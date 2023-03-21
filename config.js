module.exports = {
    SALT: process.env.SALT,
    SECRET_KEY: process.env.SECRET_KEY,
    MongoURL: process.env.MONGOURL,
    TokenExpiryTime: 31536000, // 24 * 60 * 60 * 365; Seconds in a year
};
