const session = require("express-session");
const pool = require("../db/pool");
const pgConnect = require("connect-pg-simple");
const PgStore = pgConnect(session);

module.exports = () =>
    session({
        secret: "cats",
        resave: false,
        saveUninitialized: false,
        store: new PgStore({pool: pool, createTableIfMissing: true}),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 30,
        }
    });