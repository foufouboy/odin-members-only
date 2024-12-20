const express = require("express");
const createError = require("http-errors");
const passport = require("passport");
const sessionConfig = require("./config/sessionConfig");
const path = require("node:path");
const routes = require("./routes/index");
const errorHandler = require("./middlewares/error").errorHandler;

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


// AUTHENTICATION/SESSION

app.use(sessionConfig());
app.use(passport.session());

app.use((req, res, next) => {
    console.log(req.user);
    next();
})

require("./config/passportConfig");

// ROUTES

app.use(routes);

// ERRORS

app.use((req, res, next) => {
    next(createError(404));
})

app.use(errorHandler);

// SERVER

app.listen(3000, () => console.log("Server running."));
