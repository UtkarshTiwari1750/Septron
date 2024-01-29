const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

exports.auth = async(req, res, next) => {
    try {
        const token = req.body.token 
                        || req.cookies.token
                        || req.header("Authorization").replace("Bearer ", "");

        // Check if token missing
        if(!token) {
            return res.status(400).json({
                success: false,
                message: "Token is missing",
            });
        }

        // Verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            console.log("DECODE...", decode);
            req.user = decode;
        } catch(error) {
            console.log("TOKEN VERIFICATION ERROR...", error);
            return res.status(400).json({
                success: false,
                message: "TOKEN VERIFICATION ERROR",
                error: error,
            })
        }
        next();
    } catch(error) {
        console.log("AUTHENTICATION ERROR...", error);
        return res.status(400).json({
            success: false,
            message: "AUTHENTICATION ERROR...",
            error: error,
        }); 
    }
} 


exports.isStudent = async(req, res, next) => {
    try {        
        if(req.user.accountType !== "Normal") {
            return res.status(400).json({
                success: false,
                message: "This is Protected route for Student only",
            });
        }

        next();
    } catch(error) {
        console.log("IS Normal ERROR...", error);
        return res.status(400).json({
            success: false,
            message: "IS Normal ERROR...",
            error: error,
        });
    }
}

exports.isInstructor = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Artist") {
            return res.status(400).json({
                success: false,
                message: "This is protected route for Instructor only"
            });
        }

        next();
    } catch (error) {
        console.log("IS Artist ERROR...", error);
        return res.status(400).json({
            success: false,
            message: "IS Artist ERROR...",
            error: error,
        });
    }
}





