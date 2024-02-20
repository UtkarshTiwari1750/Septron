const Content = require("../models/Content");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const User = require("../models/User");
// Create Section
exports.createSection = async(req, res) => {
    try {
        // Fetch data from request body
        const {
            sectionName,
            sectionDescription,
            sectionImage,
            contentId,
        } = req.body;

        // Validating data 
        if(!sectionName || !contentId) {
            return res.status(400).json({
                success: false,
                message: "Section name id required"
            });
        }
        
        // Creating data object
        let data = {
            "sectionName": sectionName,
        }
        if(sectionDescription) {
            data["sectionDescription"] = sectionDescription;
        }
        if(sectionImage) {
            data["sectionImage"] = sectionImage;
        }
        // Create a Section
        const newSection = await Section.create(data);

        // Push this section inside content
        const updatedContent = await Content.findByIdAndUpdate(contentId,{
            $push: {
                contentSections: newSection._id,
            }
        }, {new: true})
        .populate({
            path: "contentSections",
            populate: {
                path: "subSections",
            }
        })
        .populate("gallery");

        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            data: updatedContent,
        })

    } catch(error) {
        console.log("CREATE SECTION CONTROLLER ERROR...", error);
        return res.status(500).json({
            success: false,
            message: "CREATE SECTION CONTROLLER ERROR",
            error: error,
        }); 
    }
}

// Edit Content
exports.editSection = async(req, res) => {
    try{
        const {sectionId, sectionName, sectionDescription, sectionImage, contentId} = req.body;

        if(!sectionId) {
            return res.status(400).json({
                success: false,
                message: "SectionId not found",
            });
        }

        // Creating data object
        let data = {
            "sectionName": sectionName,
        }
        if(sectionDescription) {
            data["sectionDescription"] = sectionDescription;
        }
        if(sectionImage) {
            data["sectionImage"] = sectionImage;
        }

        const sectionDetails = await Section.findByIdAndUpdate(sectionId, 
            data,
            {new: true}
        );

        if(!sectionDetails) {
            return res.status(400).json({
                success: false,
                message: "Section not found",
            });
        }

        const updatedContent = await Content.findById(contentId)
        .populate({
            path:"contentSection",
            populate: {
                path: "subSections"
            },
        })
        .populate("gallery");
        
        return res.status(200).json({
            success: true,
            message: "Content Edited Successfully",
            data: updatedContent,
        })        

    } catch(error) {
        console.log("EDIT SECTION CONTROLLER ERROR...", error);
        return res.status(500).json({
            success: false,
            message: "EDIT SECTION CONTROLLER ERROR",
            error: error,
        }); 
    }
}

// Delete Content
exports.deleteSection = async(req, res) => {
    try{
        // Fetch data from request body
        const {contentId, sectionId} = req.body;
        const userId = req.user.id;

        // Validating data
        if(!contentId || !userId || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "ContentId, UserId or sectionId not found",
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
                        

        // Deleting each subsection and section from the content 
        const section = await Section.findById(sectionId);
        
        if(section) {
            for(const subSectionId of section.subSections) {
                // PENDING :- Code to delete image/videos from firebase or cloudinary
                await SubSection.findByIdAndDelete(subSectionId);
            }
        }

        await Section.findByIdAndDelete(sectionId);
        
        const updatedContent = await Content.findByIdAndUpdate(contentId,
            {$pull:{contentSections: sectionId}},
            {new: true}
        )
        .populate({
            path: "creator",
            populate: {
                path: "additionalDetails",
            }
        })
        .populate({
            path:"contentSections",
            populate: {
                path: "subSections"
            },
            strictPopulate: false
        })
        .populate("ratingAndReviews")
        .populate("genre")
        .populate("gallery");

        // Returning success response
        return res.status(200).json({
            success: true,
            message: "Section Deleted Successfully",
            data: updatedContent,
        });
    } catch(error) {
        console.log("DELETE SECTION CONTROLLER ERROR...", error);
        return res.status(500).json({
            success: false,
            message: "DELETE SECTION CONTROLLER ERROR",
            error: error,
        }); 
    }
}