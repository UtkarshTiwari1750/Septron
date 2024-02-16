const Profile = require("../models/Profile");
const User = require("../models/User");
const mongoose = require("mongoose");
const Content = require("../models/Content");
const ContentProgress = require("../models/ContentProgress");
// Update Profile 
exports.updateProfile = async(req, res) => {
    try{
        const {
            firstName,
            lastName,
            dateOfBirth,
            about,
            contactNumber,
            gender,
        } = req.body;
        const id = req.user.id;

        // Find the profile by id
        const userDetails = await User.findById(id);
        const profile = await Profile.findById(userDetails.additionalDetails);

        const user = await User.findByIdAndUpdate(id, {
            firstName,
            lastName
        });
        await user.save();

        // Update the profile fields
        profile.dateOfBirth = dateOfBirth;
        profile.about = about;
        profile.contactNumber = contactNumber;
        profile.gender = gender;

        // Save the updated profile
        await profile.save();

        // Find the updated user details
        const updatedUserDetails = await User.findById(id)
            .populate("additionalDetails")
            .exec();
        
        return res.status(200).json({
            success: true,
            message: "Profile updated Successfully",
            updatedUserDetails,
        });

    } catch(error) {
        console.log("UPDATE PROFILE CONTROLLER ERROR...", error);
        return res.status(500).json({
            success: false,
            message: "UPDATE PROFILE CONTROLLER ERROR",
            error: error,
        }); 
    }
}

// Delete Profile
exports.deleteProfile = async(req, res) => {
    try{
        const id = req.user.id;
        const user = await User.findById({_id:id});
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Delete Assosiated Profile with the User
        await Profile.findByIdAndDelete({
            _id: new mongoose.Types.ObjectId(user.additionalDetails),
        });

        for(const contentId of user.contents) {
            await Content.findByIdAndUpdate(
                contentId,
                { $pull: {buyers: id} },
                {new: true}
            )
        }

        // PENDING :- DELETE PROFILE PIC FROM FIREBASE

        await User.findByIdAndDelete(id);
        await ContentProgress.deleteMany({userId: id});
        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        })
    } catch(error) {
        console.log("DELETE PROFILE CONTROLLER ERROR...", error);
        return res.status(500).json({
            success: false,
            message: "DELETE PROFILE CONTROLLER ERROR",
            error: error,
        }); 
    }
}




