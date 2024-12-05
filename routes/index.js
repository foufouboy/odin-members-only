const router = require("express").Router();
const index = require("../controllers/index");
const user = require("../controllers/users");
const post = require("../controllers/posts");

// POST ROUTES

router.post("/login", () => {});
router.post("/new-post", () => {});
router.post("/register", () => {});
router.post("/join", () => {});
router.post("delete/:postId", () => {});

// GET ROUTES

router.get("/", index.home);

router.get("/login", user.login.get);
router.get("/register", user.register.get);
router.get("/logout", () => {});
router.get("/new-post", post.create.get);
router.get("/members", index.members);

module.exports = router;