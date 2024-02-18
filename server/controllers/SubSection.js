const Content = require("../models/Content");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");

// Create Section
exports.createSubSection = async(req, res) => {
    try {
        // Fetch data from request body
        const {
            sectionId,
            title,
            description,
            url,
        } = req.body;

        // Validating data 
        if(!title || !sectionId || !description) {
            return res.status(400).json({
                success: false,
                message: "All field are required"
            });
        }

        // Create a Section
        const newSubSection = await SubSection.create({
            title,
            description,
            url,
        });

        // Push this section inside content
        const updatedSection = await Section.findByIdAndUpdate(sectionId,{
            $push: {
                subSections: newSubSection._id,
            }
        }, {new: true})
        .populate("subSections");

        return res.status(200).json({
            success: true,
            message: "Sub-Section created successfully",
            data: updatedSection,
        })

    } catch(error) {
        console.log("CREATE SUB-SECTION CONTROLLER ERROR...", error);
        return res.status(500).json({
            success: false,
            message: "CREATE SUB-SECTION CONTROLLER ERROR",
            error: error,
        }); 
    }
}

// Edit Content
exports.editSubSection = async(req, res) => {
    try{
        const {sectionId, subSectionId, title, description} = req.body;
        const files = req.files.file;

        if(!subSectionId) {
            return res.status(400).json({
                success: false,
                message: "SubSectionId not found",
            });
        }

        const subSectionDetails = await Section.findByIdAndUpdate(sectionId, 
            {title, description, url, timeDuration},
            {new: true}
        );

        if(!subSectionDetails) {
            return res.status(400).json({
                success: false,
                message: "Sub-Section not found",
            });
        }

        const updatedSection = await Section.findById(sectionId)
        .populate("subSections");
        
        return res.status(200).json({
            success: true,
            message: "SubSection Edited Successfully",
            data: updatedSection,
        })        

    } catch(error) {
        console.log("EDIT SUBSECTION CONTROLLER ERROR...", error);
        return res.status(500).json({
            success: false,
            message: "EDIT SUBSECTION CONTROLLER ERROR",
            error: error,
        }); 
    }
}

// Delete Content
exports.deleteSubSection = async(req, res) => {
    try{
        // Fetch data from request body
        const {subSectionId, sectionId} = req.body;
        const userId = req.user.id;

        // Validating data
        if(!subSectionId || !userId || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "SubSectionId, UserId or sectionId not found",
            });
        }

        // Finding Content from DB
        const sectionDetails = await Section.findByIdAndUpdate(sectionId, 
            {$pull: {subSections: subSectionId}},
            {new: true}
        );

        if(!sectionDetails) {
            return res.status(400).json({
                success: false,
                message: "Section not found",
            });
        }

        // PENDING :- Code to delete each image from firebase

        await SubSection.findByIdAndDelete(subSectionId);
        
        // Returning success response
        return res.status(200).json({
            success: true,
            message: "Sub-Section Deleted Successfully",
            data: sectionDetails,
        });
    } catch(error) {
        console.log("DELETE SUB-SECTION CONTROLLER ERROR...", error);
        return res.status(500).json({
            success: false,
            message: "DELETE SUB-SECTION CONTROLLER ERROR",
            error: error,
        }); 
    }
}