const router = require("express").Router();
const user = require("../controllers/user");
const validation = require("../middlewares/validation");

router.post("/register", validation, user.register);
router.post("/login", validation, user.login);
router.get("/getall", user.getallusers);
router.get("/:id", user.getUserDetails);
router.get("/role/:role", user.searchbyRole);

module.exports = router;