const mongoose = require(`mongoose`);
const { MongoURL, } = require('../../config');

/** Asyncronously connects to mongoose server
 */
async function mongoConnect() {
    await mongoose.connect(MongoURL);
    console.log(`Successfully connected to MongoDB at ${MongoURL}`);
}

module.exports = mongoConnect;
