
const errorHandler = (err, req, res, next) => {

    const statusCode = err.statusCode || 500;
    console.log("Error catched by error handler: ", err);

    res.locals.message = 
        statusCode === 404
        ? "Page not found"
        : err.message;

    res.locals.error = err;
    
    res.status(statusCode).render("pages/error");
}

class UnauthorizedError extends Error {
    constructor() {
        super("You're not authorized to access this page!");
        this.statusCode = 401;
    }
}


module.exports.UnauthorizedError = UnauthorizedError;
module.exports.errorHandler = errorHandler;