const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../db/queries");

const usersController = {

    login: {
        get: (req, res) => {
            res.render("pages/auth", {route: "login"});
        },

        post: async (req, res) => {

        }
    },

    register: {
        get: (req, res) => {
            res.render("pages/auth", {route: "register"});
        },
        post: async (req, res, next) => {
            try {
                const errors = validationResult(req);

                if (!errors.isEmpty()) {
                    res.render("pages/auth", {
                        route: "register",
                        errors: errors.array(),
                    });
                } else {
                    const {full_name, username, password} = req.body;
                    const hashedPw = await bcrypt.hash(password, 10)

                    await db.createUser(full_name, username, hashedPw);

                    res.render("pages/auth", {
                        route: "register",
                        success: true,
                    });
                }
            } catch (err) {
                next(err);
            }
        }
    }
}

module.exports = usersController;