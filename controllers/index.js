const db = require("../db/queries");

const indexController = {
    home: async (req, res, next) => {
        try {
            const posts = await db.getAllPosts();
            if (posts.length > 0) res.locals.posts = posts;
            res.render("pages/home", {user: req.user});

        } catch (err) {
            console.error(err);
            next(err);
        }
    },

    members: async (req, res, next) => {
        try {
            const users = await db.getAllUsers();
            res.render("pages/members", {users: users});

        } catch (err) {
            console.error(err);
            next(err);
        }
    }
}

module.exports = indexController;