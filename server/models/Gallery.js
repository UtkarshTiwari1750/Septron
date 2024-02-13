const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
    contentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Content",
        required: [true, "Content-Id is Required"]
    },
    images:{
        type: [String],
    },
    videos: {
        type: [String],
    }
})

module.exports = mongoose.model("Gallery", gallerySchema);
