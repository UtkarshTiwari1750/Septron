const mongoose = require("mongoose")

const genreSchema = new mongoose.Schema({
        name:{
            type: String,
            required: [true, "Genre Name is Required"],
            trim: true,
        },
        contents: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Content",
            }
        ],
        description: {
            type: String,
            required: [true, "Description is Required"],
            trim: true, 
        }
    }
);

module.exports = mongoose.model("Genre", genreSchema);