const Content = require("../models/Content");
const User = require("../models/User");
const Genre = require("../models/Genre"); 
const { uploadToCloudinary } = require("../utils/uploadToCloudinary");
const { uploadToFirebase } = require("../utils/uploadToFirebase");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const RatingAndReview = require("../models/RatingAndReview");

const FILE_TYPE = ['png', 'jpg', 'jpeg'];
// Create Content
exports.createContent = async(req, res) => {
    try {
        const {
            contentName,
            contentDescription,
            price,
            tag: _tag,
            genre,
            status,
            instructions: _instructions,
        } = req.body;
        const thumbnail = req.files.thumbnailImage;

        const tag = JSON.parse(_tag);
        const instructions = JSON.parse(_instructions);

        const userId = req.user.id;

        // Validating the received data
        if(!contentName || !contentDescription || !price || !tag 
            || !genre || !instructions || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Draft is not compulsory option if not given then by-default Set it as "Draft" 
        if(!status || status === undefined) {
            status = "Draft";
        }

        // Check if user is Artist or not
        const userDetails = await User.findById((userId), {
            accounType: "Artist",
        });

        if(!userDetails) {
            return res.status(400).json({
                success: false,
                message: "Only Artist can create content"
            });
        }

        // Check if Genre exist or not
        const genreDetails = await Genre.findById(genre);
        if(!genreDetails) {
            return res.status(400).json({
                success: false,
                message: "Not a valid Genre",
            });
        }

        // Check file type and call upload function
        const fileType = thumbnail.name.split(".").slice(-1);
        if(!FILE_TYPE.includes(fileType[0])) {
            return res.status(400).json({
                success: false,
                message: "Please enter valid file type for thumbnail",
            });
        }

        // const uploadDetails = await uploadToCloudinary(thumbnail, process.env.FOLDER_NAME)

        //  PENDING NOT WORKING API
        const uploadDetails = await uploadToFirebase(thumbnail);
        // console.log("UPLOAD DETAILS...", uploadDetails);
        
        // if(!uploadDetails){
        //     return res.status(400).json({
        //         success: false,
        //         message: "Error in Uploading Image",
        //     });
        // }
        
        const contentDetails = await Content.create({
            contentName,
            contentDescription,
            creator: userDetails._id,
            tag,
            genre: genreDetails._id,
            price,
            // thumbnail: //PENDING
            instructions,
            status,
        });

        const updatedUserDetails = await User.findByIdAndUpdate(
            {userId},
            {$push:{
                contents: contentDetails._id,
            }},
            {new: true}
        );

        const updatedGenre = await Genre.findByIdAndUpdate(
            {id: genreDetails._id},
            {
                $push:{
                    contents: contentDetails._id,
                }
            },
            {new: true}
        );

        return res.status(200).json({
            success: true,
            message: "Content Created Successfully",
            data: contentDetails,
        })

    } catch(error) {
        console.log("CREATE CONTENT CONTROLLER ERROR...", error);
        return res.status(500).json({
            success: false,
            message: "CREATE CONTENT CONTROLLER ERROR",
            error: error,
        }); 
    }
}

// Edit Content
exports.editContent = async(req, res) => {
    try{
        const {contentId} = req.body;
        const updates = req.body;

        if(!contentId) {
            return res.status(400).json({
                success: false,
                message: "ContentId not found",
            });
        }

        const contentDetails = await Content.findById(contentId);

        if(!contentDetails) {
            return res.status(400).json({
                success: false,
                message: "Content not found",
            });
        }

        // if(req.files.thumbnailImage) {
        //     // PENDING
        // }

        for(const key in updates) {
            if(updates.hasOwnProperty(key)) {
                if(key === 'tag' || key === 'instructions') {
                    contentDetails[key] = JSON.parse(updates[key]);
                } else {
                    contentDetails[key] = updates[key];
                }
            }
        }        

        await contentDetails.save();

        const updatedContent = await Content.findById(contentId)
        .populate({
            path: "creator",
            populate: {
                path: "additionalDetails",
            }
        })
        .populate({
            path:"contentSection",
            populate: {
                path: "subSections"
            },
        })
        .populate("ratingAndReviews")
        .populate("genre")
        
        return res.status(200).json({
            success: true,
            message: "Content Edited Successfully",
            data: updatedContent,
        })        

    } catch(error) {
        console.log("UPDATE CONTENT CONTROLLER ERROR...", error);
        return res.status(500).json({
            success: false,
            message: "UPDATE CONTENT CONTROLLER ERROR",
            error: error,
        }); 
    }
}

// Delete Content
exports.deleteContent = async(req, res) => {
    try{
        // Fetch data from request body
        const contentId = req.body;
        const userId = req.user.id;

        // Validating data
        if(!contentId || !userId) {
            return res.status(400).json({
                success: false,
                message: "ContentId or UserId not found",
            });
        }

        // Finding Content from DB
        const contentDetails = await Content.findById(contentId);

        if(!contentDetails) {
            return res.status(400).json({
                success: false,
                message: "Content not found",
            });
        }

        // Finding Creator from DB
        const userDetails = await User.findById(userId);

        if(!userDetails) {
            return res.status(400).json({
                success: false,
                message: "User details not found",
            });
        }

        
        // Checking if user is creator of content or not
        if(!userDetails.contents.includes(contentDetails._id)){
            return res.status(400).json({
                success: false,
                message: "Invalid Access to Course",
            });
        }
        else {
            // Removing Content from Creator's contents list
            const contentIndex = userDetails.contents.indexOf(contentId); 
            userDetails.contents.splice(contentIndex, 1);
            userDetails.save(); 
        }
        
        // Remove content from all the buyers list
        for(const buyerId of contentDetails.buyers){
            await User.findByIdAndUpdate(buyerId,
                {$pull: {contents: contentId}}
            )
        }
        
        // Deleting each section and subsection from the content 
        for(const sectionId of contentDetails.contentSections) {
            const section = await Section.findById(sectionId);
            
            if(section) {
                for(const subSectionId of section.subSections) {
                    await SubSection.findByIdAndDelete(subSectionId);
                }
            }

            await Section.findByIdAndDelete(sectionId);
        }

        // Deleting all the rating and reviews of the content
        for(const ratingId of contentDetails.ratingAndReviews) {
            await RatingAndReview.findByIdAndDelete(ratingId);
        }

        // Deleting this course from it's genre's content list
        const genreDetails = await Genre.findByIdAndUpdate(contentDetails.genre, {
            $pull: {contents: contentId}
        });

        // PENDING :- Code to delete image for firebase or cloudinary
        
        // Deleting content 
        await Content.findByIdAndDelete(contentId);
        
        // Returning success response
        return res.status(200).json({
            success: true,
            message: "Content Deleted Successfully",
        });
    } catch(error) {
        console.log("DELETE CONTENT CONTROLLER ERROR...", error);
        return res.status(500).json({
            success: false,
            message: "DELETE CONTENT CONTROLLER ERROR",
            error: error,
        }); 
    }
}

// Get all contents
exports.getAllContents = async(req, res) => {
    try {
        const allContents = await Content.find(
            {status: "Published"})
        .populate("creator")
        .populate("ratingAndReviews")
        .populate("genre")
        .exec();

        // Calculate Total Rating 
        for(const content of allContents) {
            const totalRating = 0;
            for(const ratingData of content.ratingAndReviews) {
                totalRating += ratingData.rating;
            }
            content.totalRating = totalRating;
            content.totalViwers = content.viwers.length;
        }

        return res.status(200).json({
            success: true,
            message: "All courses fetched successfully",
            data: allContents
        });
    } catch (error) {
        console.log("GET ALL CONTENT CONTROLLER ERROR...", error);
        return res.status(500).json({
            success: false,
            message: "GET ALL CONTENT CONTROLLER ERROR",
            error: error,
        }); 
    }
}

// Get Content Details
exports.getContentDetails = async(req, res) => {
    try {
        // Fetch data from request body
        const contentId = req.body;

        if(!contentId) {
            return res.status(400).json({
                success: false,
                message: "Content-Id not found",
            });
        }

        const contentDetails = await Content.findById(contentId)
        .populate("creator")
        .populate({
            path: "contentSection",
            populate: {
                path: "subSections",
            }
        })
        .populate("ratingAndReviews")
        .populate("genre");



        // Calculate Total Rating 
        const totalRating = 0;
        for(const ratingData of contentDetails.ratingAndReviews) {
            totalRating += ratingData.rating;
        }
        contentDetails.totalRating = totalRating;
        contentDetails.totalViwers = contentDetails.viwers.length;
        
        return res.status(200).json({
            success: true,
            message: "Course Details fetched successfully",
            data: contentDetails,
        });
    } catch (error) {
        console.log("GET CONTENT DETAILS CONTROLLER ERROR...", error);
        return res.status(500).json({
            success: false,
            message: "GET CONTENT DETAILS CONTROLLER ERROR",
            error: error,
        }); 
    }
}

// Get Creator Contents
exports.getCreatorContents = async(req, res) => {
    try{
        const userId = req.user.id;

        if(!userId) {
            return res.status(400).json({
                success: false,
                message: "User-id not found",
            });
        }

        const userContents = await User.findById({userId})
        .populate("contents").exec();

        // OTHER WAY
        // const userContents = await Content.find({
        //     creator: userId,
        // }).sort({createdAt: -1});

        if(!userContents) {
            return res.status(400).json({
                success: false,
                message: "Content not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User content found successfully",
            data: userContents.contents,
        })
    } catch (error) {
        console.log("GET CREATOR CONTENT CONTROLLER ERROR...", error);
        return res.status(500).json({
            success: false,
            message: "GET CREATOR CONTENT CONTROLLER ERROR",
            error: error,
        }); 
    }
}

// Get all Content name
exports.getAllContentsName = async(req, res) => {
    try{
        const allContentName = await Content.find({}).select({contentName: true});
        console.log("ALL CONTENT NAME...", allContentName);

        return res.status(200).json({
            success: true,
            message: "All Content name fetched successfully",
            data: allContentName,
        })
    } catch(error) {
        console.log("GET ALL CONTENT NAME CONTROLLER ERROR...", error);
        return res.status(500).json({
            success: false,
            message: "GET ALL CONTENT NAME CONTROLLER ERROR",
            error: error,
        }); 
    }
}
