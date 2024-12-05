const postsController = {
    create: {
        get: (req, res, next) => {
            res.render("pages/new-post");
        },

        post: async (req, res, next) => {

        },
    }
}

module.exports = postsController;