const ApiError = require("../utils/api-error.util");

module.exports = function(err, req, res, next) {
    console.error(err);
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    const errors = err.errors || [];
    if(err instanceof ApiError){
        res.status(status).json({
            status,
            message,
            errors,
        });
    }

    return res.status(status).json({
        status,
        message,
        errors,
    });
}