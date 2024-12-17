const router = require("express").Router();
const index = require("../controllers/index");
const user = require("../controllers/users");
const post = require("../controllers/posts");
const passport = require("passport");

// POST ROUTES

router.post("/login", 
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
    }),
);
router.post("/new-post", () => {});
router.post("/register", user.register.post);
router.post("/join", () => {});
router.post("delete/:postId", () => {});

// GET ROUTES

router.get("/", index.home);

router.get("/login", user.login.get);
router.get("/register", user.register.get);
router.get("/logout", (req, res, next) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    })
});
router.get("/new-post", post.create.get);
router.get("/members", index.members);

module.exports = router;