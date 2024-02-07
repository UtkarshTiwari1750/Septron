const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const {passwordUpdate} = require("../mail/templates/passwordUpdate")

exports.signUp = async(req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp
        } = req.body;

        // Validating the received data
        if(!firstName || !lastName || !email || !password 
            || !confirmPassword || !accountType || !otp){
            return res.status(500).json({
                success: false,
                message: "All fields are required",
            });
        }
        
        // Checking if Password and Conirm Password are equal or not
        if(password !== confirmPassword) {
            return res.status(500).json({
                success: false,
                message: "Password and Confirm Password don't match",
            });
        }

        // Checking if User is already Signup or not
        const existingUser = await User.findOne({email: email});
        if(existingUser) {
            return res.status(500).json({
                success: false,
                message: "Email is already Registered",
            });
        }

        // Finding most recent otp send to the email
        const sendOtp = await OTP.find({email}).sort({createdAt: -1}).limit(1);
        if(sendOtp.length === 0) {
            return res.status(400).json({
                success: false,
                message: "OTP not found for this Email",
            });
        } else if(otp !== sendOtp) {
            return res.status(400).json({
                success: false,
                message: "OTP does not match",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        // Creating Profile for the user
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            contactNumber:null,
        });

        const userDetails = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        return res.status(200).json({
            success: true,
            message: "Signup Successful",
            data: userDetails,
        })

    } catch(error) {
        console.log("SIGNUP CONTROLLER ERROR...", error);
        return res.status(500).json({
            success: false,
            message: "SIGNUP CONTROLLER ERROR",
            error: error,
        });
    }
}

// Loign Controller for authenticating users
exports.login = async(req, res) => {
    try {
        // Fetching data from request body
        const {email, password} = req.body;

        // Validating data
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All field are required",
            });
        }

        // Checking if user has signup or not
        const user = await User.findOne({email: email});
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User has not Signup yet",
            });
        }
        
        // If password match
        if(await bcrypt.compare(password, user.password)) {
            // Creating JWT token for the user
            const token = jwt.sign(
                {email: user.email, id: user._id, accountType: user.accounType},
                process.env.JWT_SECRET,
                {
                    expiresIn: "24h",
                }
            );

            // Save token to user document in database
            user.token = token;
            user.password = undefined;
            
            // Set cookie for token 
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User Login Success",
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Incorrect Password",
            })
        }
    } catch(error) {
        console.log("LOGIN ERROR...", error);
        return res.status(400).json({
            success: false,
            message: "LOGIN ERROR...",
            error: error,
        });
    }
}

// Send OTP for Email Verification
exports.sendOtp = async(req, res) => {
    try {
        // Fetching User email
        const {email} = req.body;
        //Validating fetched data
        if(!email) {
            return res.status(400).json({
                success: false,
                message: "Email is Required",
            });
        } 

        // Checking if user already signup or not
        const userDetail = await User.findOne({email:email});
        if(userDetail) {
            return res.status(400).json({
                success: false,
                message: "User is already sign up",
            });
        }

        // Create new otp 
        var otp = otpGenerator.generate(6, {
            digits: true, 
            lowerCaseAlphabets: false, 
            specialChars: false, 
            upperCaseAlphabets: false
        });

        const result = await OTP.findOne({otp: otp});
        while(result) {
            otp = otpGenerator.generate(6, {
                digits: true, 
                lowerCaseAlphabets: false, 
                specialChars: false, 
                upperCaseAlphabets: false
            });
        }
        const otpBody = await OTP.create({
            email,
            otp
        });

        return res.status(200).json({
            success: true,
            message: "OTP Sent Successfully",
            otp,
        });
    } catch(error) {
        console.log("SEND OTP ERROR...", error);
        return res.status(400).json({
            success: false,
            message: "SEND OTP ERROR...",
            error: error,
        });
    }
}

// Controller for Changing Password
exports.changePassword = async(req, res) => {
    try {
        // Fetching data from request body
        const {oldPassword, newPassword, confirmNewPassword} = req.body;
        const userId = req.user.id;

        // Validating fetched data
        if(!oldPassword || !newPassword || !confirmNewPassword || !userId) {
            return res.status(400).json({
                success: false,
                message: "All Fields are required",
            });
        }

        // Check if newPassword is equal to confirmNewPassword
        if(newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "New Password and Confirm new password don't match",
            });
        }
        
        // Check if user old password is correct or not
        const userDetail = await User.findById(userId);
        
        if(!userDetail) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        const isPasswordMatch = await bcrypt.compare(oldPassword, userDetail.password);
        if(!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Old password don't match",
            });
        }

        const newHashPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(
            userId,
            {password: newHashPassword},
            {new:true}
        );

        // Sending confirmation email
        try {
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                "Password Updation",
                passwordUpdate(userDetail.email, `${userDetail.firstName} ${userDetail.lastName}`)
            );
            
        } catch(error) {
            console.log("Error occured while sending mail...", error);
            return res.status(400).json({
                success: false,
                message:"Error occurred while sending email",
                error: error,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Password Updated Successfully",
            data: userDetail,
        })
    } catch(error) {
        console.log("SEND OTP ERROR...", error);
        return res.status(400).json({
            success: false,
            message: "SEND OTP ERROR...",
            error: error,
        }); 
    }
}