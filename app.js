const express = require("express");
const passport = require("passport");
const path = require("node:path");
const routes = require("./routes/index");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// ROUTES

app.use(routes);

// SERVER

app.listen(3000, () => console.log("Server running."));
