const express = require("express");
const router = express.Router();
const {registerUser, loginUser}= require("../Controllers/auth.controller");
router.post("/register", registerUser);
console.log(registerUser);
router.post("/login", loginUser);
console.log(loginUser);
module.exports = router;
