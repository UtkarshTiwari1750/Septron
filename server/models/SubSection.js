const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
        title: {
            type: String,
            required: [true, "Title is Required"],
            trim: true,
        },
        timeDuration: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        url:[
            {
                type: String,
                required: [true, "Url is Required"],
                trim: true,
            }
        ] 
    },  
    {timestamps: true}
);

module.exports = mongoose.model("SubSection", subSectionSchema);
