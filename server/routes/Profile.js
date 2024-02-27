const express = require("express");
const router = express.Router();
const { deleteProfile, updateProfile, getBuyedContent } = require("../controllers/Profile");
const {auth} = require("../middlewares/auth")

router.delete("/deleteProfile", auth, deleteProfile);
router.put("/updateProfile", auth, updateProfile);
router.get("/getBuyedContent", auth, getBuyedContent);

module.exports = router