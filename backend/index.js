require('dotenv').config();

const createApp = require('./src/app');
const { connectToMongoDB } = require('./src/config/db.config');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectToMongoDB();
        
        const app = createApp();
        app.listen(PORT, () => {
            console.log(`[Server] Listening on port ${PORT}`);
        });
    } catch (err) {
        console.error('[Startup Error]', err);
        process.exit(1);
    }
};

startServer();