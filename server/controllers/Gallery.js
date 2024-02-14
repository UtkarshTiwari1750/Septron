const Gallery = require("../models/Gallery");
const Content = require("../models/Content");

// Create Gallery
exports.createGallery = async(req, res) => {
    try{
        const {images: _images, videos: _videos, contentId} = req.body;
        const images = JSON.parse(_images);
        const videos = JSON.parse(_videos);

        if((!images && !videos) || !contentId){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const contentDetails = await Content.findById(contentId);

        if(!contentDetails) {
            return res.status(404).json({
                success: false,
                message: "Content Not Found",
            });
        }

        let data = {
            contentId: contentDetails._id,
        };
        if(images.length > 0){
            data["images"] = images;
        }
        if(videos.length > 0){
            data["videos"] = videos;
        }

        const gallery = await Gallery.create(data);

        const newContentDetails = await Content.findByIdAndUpdate(contentId, 
            {
                $push: {
                    gallery: gallery._id
                }
            },
            {new: true}
        );

        return res.status(200).json({
            success: true,
            message: "Gallery Created Successfully",
            data: newContentDetails,
        })

    } catch(error) {
        console.log("CREATE GALLERY CONTROLLER ERROR...", error);
        return res.status(500).json({
            success: false,
            message: "CREATE GALLERY CONTROLLER ERROR",
            error: error,
        }); 
    }
}

// Update Gallery
exports.updateGallery = async(req, res) => {
    try{
        // Fetching data from request
        const {images: _images, videos: _videos, galleryId} = req.body;
        const images = JSON.parse(_images);
        const videos = JSON.parse(_videos);

        // Validating
        if((!images && !videos) || !galleryId) {
            return res.status(404).json({
                success: false,
                message: "All Fields are required",
            });
        }

        // Creating an Updated Data
        let updatedData = {};
        if(images.length > 0) {
            updatedData[images] = images;
        }

        if(videos.length > 0) {
            updatedData[videos] = videos;
        }

        // Updating Database
        const updatedGallery = await Gallery.findByIdAndUpdate(galleryId, data, {new: true});

        // Return Success Response
        return res.status(200).json({
            success: true,
            message: "Gallery Updated Successfully",
        })
    } catch (error) {
        console.log("UPDATE GALLERY CONTROLLER ERROR...", error);
        return res.status(500).json({
            success: false,
            message: "UPDATE GALLERY CONTROLLER ERROR",
            error: error,
        }); 
    }
}

// Delete Gallery
exports.deleteGallery = async(req, res) => {
    try {
        // Fetching data from Request body
        const {galleryId, contentId} = req.body;

        // Validating Data
        if(!galleryId || !contentId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Removing Gallery-Id from Content
        const updatedContent = await Content.findByIdAndUpdate(contentId, 
            {
                $pull: {
                    gallery: galleryId,
                }
            }
        )
        
        // Deleting Gallery from Database
        await Gallery.findByIdAndDelete(galleryId);

        // Return Success Response
        return res.status(200).json({
            success: true,
            message: "Gallery Deleted Successfully",
        })
    } catch(error) {
        console.log("DELETE GALLERY CONTROLLER ERROR...", error);
        return res.status(500).json({
            success: false,
            message: "DELETE GALLERY CONTROLLER ERROR",
            error: error,
        }); 
    }
}

