const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
        sectionName:{
            type: String,
            required: [true, "Section Name is Required"],
            trim: true,
        },
        sectionDescription: {
            type: String,
            trim: true,
        },
        subSections: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "SubSection",
            }
        ],
    },
    {timestamps: true}
)

module.exports = mongoose.model("Section", sectionSchema);
