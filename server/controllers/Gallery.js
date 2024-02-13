const Gallery = require("../models/Gallery");
const Content = require("../models/Content");

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

        let data = {};
        if(images.length > 0){
            data[images] = images;
        }
        if(videos.length > 0){
            data[videos] = videos;
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

