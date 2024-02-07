const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})/;
    return re.test(email)
};

const otpSchema = new mongoose.Schema({
    email: {
        type:String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        // unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})/, 'Please fill a valid email address']
    },
    otp: {
        type: String,
        required: [true, "OTP is required"],
        trim: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5
    },
});

// Define a function to send emails
async function sendVerificationEmail(email, otp) {
    try{
        const mailResponse = await mailSender(
            email,
            "Verification Email",
            emailTemplate(otp)
        );
        console.log("Email sent successfully: ", mailResponse.response);
    } catch(error) {
        console.log("ERROR IN OTP MODEL...", error);
        throw error;
    }
}

// Send mail of otp to User before saving it inside DB
otpSchema.pre("save", async function(next) {
    console.log("New document saved to database");

    // Only send email when a new document is created 
    if(this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }

    next();
})

const OTP = mongoose.model("OTP", otpSchema);

module.exports = OTP;