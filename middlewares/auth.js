const UnauthorizedError = require("./error").UnauthorizedError;

module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        next(new UnauthorizedError());
    }
}

module.exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.member_status === "admin") {
        next();
    } else {
        next(new UnauthorizedError());
    }
}