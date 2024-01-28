const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
        mediaName:{
            type: String,
            required: [true, "Media Name is Required"],
            trim: true,
        },
        mediaDescription: {
            type: String,
            required: [true, "Description is Required"],
            trim: true,
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        mediaContent:[ 
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Section",
            }
        ],
        ratingAndReviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "RatingAndReview",
            }
        ],
        price: {
            type: {
                enum: [Number, String],
                message: "Not a Valid type of Price"
            },
            required: [true, "Price is Required"],
        },
        thumbnail: {
            type:String,
            required: [true, "Thumbnail is Required"],
            trim: true,
        },
        tag: {
            type: [String],
            required: [true, "Tag is Required"],
            trim: true,
        },
        genre: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Genre",
            required: [true, "Genre is Required"],
            trim: true,
        },
        viwers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ],
        instructions: {
            type: [String],
            trim: true,
        },
        status: {
            type: String,
            enum: ["Published", "Draft"],
            required: [true, "Status is Required"],
            trim: true,
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("Content", contentSchema);