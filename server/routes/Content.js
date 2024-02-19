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
    getArtistContents,
    getAllContentsName} = require("../controllers/Content");

// Section controllers import 
const {createSection, deleteSection, editSection} = require("../controllers/Section");

// Sub-Section controllers import 
const {createSubSection, deleteSubSection, editSubSection} = require("../controllers/SubSection")

// Genre Controllers import
const {createGenre, getAllGenre} = require("../controllers/Genre");

// Gallery Controllers Import
const {createGallery, updateGallery, deleteGallery} = require("../controllers/Gallery");

// ******************************************************************************************
//                           Content Routes (Only by Artist)
// ******************************************************************************************
router.post("/createContent", auth, isArtist,createContent);
router.put("/editContent", auth, isArtist, editContent);
router.delete("/deleteContent", auth, isArtist, deleteContent);
router.get("getAllContents", getAllContents);
router.post("/getContentDetails", getContentDetails);
router.get("/getArtistContents", auth, isArtist, getArtistContents);
router.get("/getAllContentsName", getAllContentsName);

router.post("/createSection", auth, isArtist,createSection);
router.put("/editSection", auth, isArtist, editSection);
router.delete("/deleteSection", auth, isArtist, deleteSection);

router.post("/createSubSection", auth, isArtist,createSubSection);
router.put("/editSubSection", auth, isArtist, editSubSection);
router.delete("/deleteSubSection", auth, isArtist, deleteSubSection);

router.post("/createGallery",auth, isArtist, createGallery);
router.put("/updateGallery",auth, isArtist, updateGallery);
router.delete("/deleteGallery", auth, isArtist, deleteGallery);

// ******************************************************************************************
//                           Genre Routes (Only by Admin)
// ******************************************************************************************
router.post("/createGenre", auth, isAdmin, createGenre);
router.get("/getAllGenre", getAllGenre);

module.exports = router;