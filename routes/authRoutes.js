const express = require("express");
// const { signin } = require("../controllers/authController");
const { signup, signin, logout } = require("../controllers/authController");
const router = express.Router();
///api/signup
router.post("/signup", signup);
// /api/signin
router.post("/signin", signin);
// /api/logout
router.get("/logout", logout);
module.exports = router;
