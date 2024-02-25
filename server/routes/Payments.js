// Import require Modules
const express = require("express")
const router = express.Router();

// Import controllers
const {capturePayment, sendPaymentSuccessEmail, verifyPayment} = require("../controllers/Payment")
const {auth, isAdmin, isArtist, isNormal} = require("../middlewares/auth")

router.post("/capturePayment", auth, isNormal, capturePayment);
router.post("/verifyPayment", auth, isNormal, verifyPayment);
router.post("/sendPaymentSuccessEmail", auth, isNormal, sendPaymentSuccessEmail)

module.exports = router;