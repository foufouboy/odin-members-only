
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
        post: async (req, res) => {

        }
    }
}

module.exports = usersController;