const express = require("express");

const router = express.Router();

// Middlewares import
const {auth, isArtist, isNormal, isAdmin} = require("../middlewares/auth")

// Content controllers import
const {createContent, 
    editContent, 
    deleteContent, 
    getAllContents, 
    getContentDetails ,
    getCreatorContents,
    getAllContentsName} = require("../controllers/Content");

// Section controllers import 
const {createSection, deleteSection, editSection} = require("../controllers/Section");

// Sub-Section controllers import 
const {createSubSection, deleteSubSection, editSubSection} = require("../controllers/SubSection")
const upload = require("../middlewares/multer");

// Genre Controllers import
const {createGenre} = require("../controllers/Genre");

// ******************************************************************************************
//                           Content Routes (Only by Instructor)
// ******************************************************************************************
router.post("/createContent", auth, isArtist,createContent);
router.put("/editContent", auth, isArtist, editContent);
router.delete("/deleteContent", auth, isArtist, deleteContent);
router.get("getAllContents", getAllContents);
router.get("/getContentDetails", getContentDetails);
router.get("/getCreatorContents", getCreatorContents);
router.get("/getAllContentsName", getAllContentsName);

router.post("/createSection", auth, isArtist,createSection);
router.put("/editSection", auth, isArtist, editSection);
router.delete("/deleteSection", auth, isArtist, deleteSection);

router.post("/createSubSection", auth, isArtist,createSubSection);
router.put("/editSubSection", auth, isArtist, editSubSection);
router.delete("/deleteSubSection", auth, isArtist, deleteSubSection);


// ******************************************************************************************
//                           Genre Routes (Only by Admin)
// ******************************************************************************************
router.post("/createGenre", createGenre);

module.exports = router;