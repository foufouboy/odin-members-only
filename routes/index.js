const router = require("express").Router();
const index = require("../controllers/index");
const user = require("../controllers/users");
const post = require("../controllers/posts");
const { isAuth, isAdmin } = require("../middlewares/auth");
const { signupValidation, postValidation } = require("../middlewares/validation");

router.all("*", (req, res, next) => {
    if (req.user) res.locals.user = req.user;
    next();
})

// POST ROUTES

router.post("/login", user.login.post);
router.post("/new-post", postValidation, post.create.post);
router.post("/register", signupValidation, user.register.post);
router.post("/join", isAuth, user.join);
router.post("/delete-post/:postId", isAdmin, post.delete);

// GET ROUTES

router.get("/", index.home);

router.get("/login", user.login.get);
router.get("/register", user.register.get);
router.get("/logout", isAuth, user.logout);
router.get("/new-post", isAuth, post.create.get);
router.get("/members", isAuth, index.members);

module.exports = router;