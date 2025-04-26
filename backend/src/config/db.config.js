require('dotenv').config();

const mongoose = require('mongoose');


const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('[MongoDB] Connected via Mongoose');
    } catch (error) {
        console.error('[MongoDB Connection Error]', error);
        throw error;
    }
};

module.exports = { connectToMongoDB };