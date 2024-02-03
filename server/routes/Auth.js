const express = require("express");
const router = express.Router();

const {signUp, sendOtp, login, changePassword} = require("../controllers/Auth");
const { auth } = require("../middlewares/auth");

router.post("/signup", signUp);
router.post("/sendOtp", sendOtp);
router.post("/login", login);
router.post("/changePassword",auth, changePassword);


module.exports = router;