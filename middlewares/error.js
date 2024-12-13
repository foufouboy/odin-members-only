
const errorHandler = (err, req, res, next) => {

    const statusCode = err.statusCode || 500;
    console.log("Error catched by error handler: ", err);

    res.locals.message = 
        statusCode === 404
        ? "Page not found"
        : "An unexpected error occurred. Please try again later. Sorry :(";

    res.locals.error = req.app.get("env") === "development" 
        ? err 
        : "If you're the dev, check out the server logs!";
    
    res.status(statusCode).render("pages/error");
}


module.exports = errorHandler;