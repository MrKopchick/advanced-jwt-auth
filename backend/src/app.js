const express = require('express');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const moongoose = require('mongoose');
const router = require('./routes/index.routes');

const errorMiddleware = require('./middleware/error.middleware');

const createApp = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(cookieParser());
    app.use('/api', router);
    app.use(errorMiddleware);

    app.use((err, req, res, next) => {
        console.error('[Unhandled Error]', err);
        res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
    });

    return app;
};

module.exports = createApp;