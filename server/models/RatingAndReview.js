const mongoose = require("mongoose");

const ratingAndReviewSchema = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User Id is Required"],
        },
        contentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Content",
            required: [true, "Content Id is Required"],
        },
        review: {
            type: String,
            required: [true, "Review is Required"],
            trim: true,
        },
        rating: {
            type: Number,
            required: [true, "Rating is Required"],
            trim: true,
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);