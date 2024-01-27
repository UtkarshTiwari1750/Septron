const mongoose = require("mongoose");

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new mongoose.Schema({
        firstName: {
            type: String,
            required: [true, "First-Name is required"],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, "Last-Name is required"],
            trim: true,
        },
        email: {
            type:String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
            unique: true,
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        accounType: {
            type: String,
            enum: {
                values: ['Creator', 'User'],
                message: '{VALUE} is not a Valid Acccount Type',
            },
            trim: true,
        },
        additionalDetails: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile",
            required:[true, "Profile is required"],
        },
        videos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        books: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book"
            }
        ],
        token: {
            type: String,
            trim: true,
            unique: true,
        },
        resetPasswordExpires: {
            type: Date,
        },
    }, 
    {timestamps: true}
);


module.exports = mongoose.model("User", userSchema);
