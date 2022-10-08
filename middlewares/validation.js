const { check } = require("express-validator");

const validation = [
    check("username", "Please Enter a Valid Username").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
        min: 8
    }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
    check("mobile", "Please enter a valid mobile").isLength({ min: 10})
];

module.exports = validation;