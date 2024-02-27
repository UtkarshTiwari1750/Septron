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

// Get Buyed Content
exports.getBuyedContent = async(req, res) => {
    try {
        const userId = req.user.id;

        if(!userId) {
            return res.status(400).json({
                success: false,
                message: "User Id doesn't found",
            });
        }

        let buyedContent = await User.findById({_id: userId},
                'contents contentProgress ratingAndReviews'
        )
        .populate({
            path:"contents",
            populate: {
                path: "ratingAndReviews",
                path: "contentSections",
                populate: {
                    path: "subSections"
                }
            }
        })
        .populate("contentProgress")
        .exec();
        

        var subSectionLength = 0;
        const contents = buyedContent.contents;
        for(var i = 0; i < contents.length; i++) {
            // PENDING
            let totalDurationInSeconds = 0;
            subSectionLength = 0;
            for(var j = 0; j < contents[i].contentSections.length; j++) {
                // totalDurationInSeconds += contents[i].contentSections[j]
                //     .subSections.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0);
                
                // contents[i].totalDuration = conv
                subSectionLength += contents[i].contentSections[j].subSections.length;
            }

            let contentProgressCount = await ContentProgress.findOne({
                contentId: contents[i]._id,
                userId: userId,
            })

            contentProgressCount = contentProgressCount?.completedSubSection.length;
            if(subSectionLength === 0) {
                contents[i].progressPercentage = 100;
            } else {
                const multiplier = 100;
                contents[i].progressPercentage = Math.round((contentProgressCount/ subSectionLength) * 100 * 100) / multiplier;
            }

            totalRating = 0;
            for(var j = 0; j < contents[i].ratingAndReviews.length; j++) {
                totalRating += contents[i].ratingAndReviews[j].rating;
            }
            
            contents[i].totalRating = totalRating;
        }

        if(!buyedContent) {
            return res.status(400).json({
                success: false,
                message: "Could not find user with given id"
            });
        }
        console.log("TOTAL RATING..." , buyedContent.contents[0].totalRating);
        return res.status(200).json({
            success: true,
            message: "User buyed contents found successfully",
            data: buyedContent.contents,
        })
    } catch(error) {
        console.log("GET BUYED CONTENT CONTROLLER ERROR...", error);
        return res.status(500).json({
            success: false,
            message: "GET BUYED CONTENT CONTROLLER ERROR",
            error: error,
        }); 
    }
}


