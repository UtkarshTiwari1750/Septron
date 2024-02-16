const express = require("express");
const router = express.Router();
const { deleteProfile } = require("../controllers/Profile");
const {auth} = require("../middlewares/auth")

router.delete("/deleteProfile", auth,deleteProfile);

module.exports = router