require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI 
  ? process.env.MONGODB_URI 
  : (() => { 
      console.error('[MongoDB] URI not provided'); 
      process.exit(1); 
    })();

const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
};

let client;
let isConnected = false;

const connectToMongoDB = async () => {
    if (!client) {
        client = new MongoClient(uri, options);
    }

    if (!isConnected) {
        try {
            await client.connect();
            isConnected = true;
            console.log('[MongoDB] Connected');
        } catch (err) {
            throw new Error('[MongoDB] Connection failed: ' + err.message);
        }
    }
    return client;
};

const getMongoClient = () => {
    if (!isConnected) {
        throw new Error('[MongoDB] Client not initialized');
    }
    return client;
};

module.exports = { connectToMongoDB, getMongoClient };