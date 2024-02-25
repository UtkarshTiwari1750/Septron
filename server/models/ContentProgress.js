const mongoose = require("mongoose");

const contentProgressSchema = new mongoose.Schema({
        completedSubSection: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "SubSection",
            }
        ],
        contentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Content",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {timestamps:true}
);

module.exports = mongoose.model("ContentProgress", contentProgressSchema);