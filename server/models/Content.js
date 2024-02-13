const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
        contentName:{
            type: String,
            required: [true, "Media Name is Required"],
            trim: true,
        },
        contentDescription: {
            type: String,
            required: [true, "Description is Required"],
            trim: true,
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Creator Id is Required"],

        },
        contentSections:[ 
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
            type: String,
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
        buyers: [
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
        contentType: {
            type: String,
            enum: ["Video", "Book"],
            required: [true, "Content Type is Required"],
            trim: true,
        },
        gallery: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Gallery"
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("Content", contentSchema);