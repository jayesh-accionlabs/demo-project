const config = require('../config/config');
const MongoClient = require('mongodb').MongoClient;
const mongoUri = config.mongo.host;
const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
let _db;

const connectDB = async () => {
    try {
        client.connect(async(err, client) => {
            _db = client.db();
            return err
        })
    } catch (e) {
        throw e
    }
}

const getDB = () => {
    return _db;
}

const disconnectDB = () => _db.close()

module.exports = { connectDB, getDB, disconnectDB }