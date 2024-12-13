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
        .isLength({min: 5, max: 50})
        .withMessage("Username " + lengthMsg),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password " + emptyMsg)
        .isLength({min: 5, max: 50})
        .withMessage("Password " + lengthMsg),
    body("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) throw new Error("Password did not match");
        return true;
    })
        .withMessage("Passwords do not match."),
];