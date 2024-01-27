const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    image:{
        type: String,
        trim: true,
    },
    gender: {
        type: String,
        enum: {
            values: ["Male", "Female", "Prefer not to say"],
            message: '{VALUE} is not a Valid Option'
        },
        trim: true,
    },
    dateOfBirth: {
        type: Date,
        trim: true,
    },
    contactNumber: {
        type: Number,
        trim: true,   
    }
})


module.exports = mongoose.model("Profile", profileSchema);
