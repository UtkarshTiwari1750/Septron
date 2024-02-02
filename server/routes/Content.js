const express = require("express");

const router = express.Router();

const {createContent} = require("../controllers/Content");
const upload = require("../middlewares/multer");
router.post("/createContent", createContent);

module.exports = router;