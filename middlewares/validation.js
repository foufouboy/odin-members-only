const { body } = require("express-validator");

const emptyMsg = "cannot be empty";
const lengthMsg = "should be between 5 and 50 characters";

module.exports.signupValidation = [
    body("full_name")
        .trim()
        .notEmpty()
        .withMessage("Full name " + emptyMsg)
        .isLength({min: 5, max: 50})
        .withMessage("Full name " + lengthMsg),
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username " + emptyMsg)
        .isLength({min: 4, max: 50})
        .withMessage("Username " + lengthMsg),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password " + emptyMsg)
        .isLength({min: 5, max: 50})
        .withMessage("Password " + lengthMsg),
    body("conf-password").custom((value, { req }) => {
        console.log(value, req.body.password);
        if (value !== req.body.password) throw new Error("Password did not match");
        return true;
    })
        .withMessage("Passwords do not match."),
];

module.exports.postValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage(`Title ${emptyMsg}`)
        .isLength({ min: 5, max: 100 })
        .withMessage('Title should be between 5 - 100 characters!'),
    body('content')
        .trim()
        .notEmpty()
        .withMessage(`Content ${emptyMsg}`)
        .isLength({ min: 10, max: 500 })
        .withMessage('Content should be between 10 - 500 characters!'),
];