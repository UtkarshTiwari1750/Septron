const express = require("express");

const router = express.Router();

const {auth, isArtist, isNormal} = require("../middlewares/auth")

const {createContent, 
    editContent, 
    deleteContent, 
    getAllContents, 
    getContentDetails ,
    getCreatorContents} = require("../controllers/Content");

const {createSection, deleteSection, editSection} = require("../controllers/Section");
const {createSubSection, deleteSubSection, editSubSection} = require("../controllers/SubSection")
const upload = require("../middlewares/multer");


router.post("/createContent", auth, isArtist,createContent);
router.put("/editContent", auth, isArtist, editContent);
router.delete("/deleteContent", auth, isArtist, deleteContent);
router.get("getAllContents", getAllContents);
router.get("/getContentDetails", getContentDetails);
router.get("/getCreatorContents", getCreatorContents);

router.post("/createSection", auth, isArtist,createSection);
router.put("/editSection", auth, isArtist, editSection);
router.delete("/deleteSection", auth, isArtist, deleteSection);

router.post("/createSubSection", auth, isArtist,createSubSection);
router.put("/editSubSection", auth, isArtist, editSubSection);
router.delete("/deleteSubSection", auth, isArtist, deleteSubSection);

module.exports = router;