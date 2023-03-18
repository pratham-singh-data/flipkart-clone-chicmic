module.exports = {
    SALT: process.env.SALT,
    SECRET_KEY: process.env.SECRET_KEY,
    MongoURL: `mongodb://127.0.0.1:27017/flipkart-clone`,
    TokenExpiryTime: 180000,
};
