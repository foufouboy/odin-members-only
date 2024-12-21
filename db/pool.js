const pg = require("pg");
require("dotenv").config();

module.exports = new pg.Pool({
    connectionString: process.env.DB_URL_PROD,
});