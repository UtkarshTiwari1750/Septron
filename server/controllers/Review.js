const User = require("../models/User");
const Content = require("../models/Content");
const RatingAndReview = require("../models/RatingAndReview");

exports.createReview = async(req, res) => {
    try {
        const {contentId, review, rating} =  req.body;
        const userId = req.user.id;

        if(!contentId || !review || !rating || !userId) {
            return res.status(400).json({
                success: false, 
                message: "All Fields are Required",
            });
        }

        const contentDetails = await Content.findById({_id: contentId});

        if(!contentDetails) {
            return res.status(400).json({
                success: false,
                message: "Not a Valid Content",
            });
        }

        const reviewDetails = await RatingAndReview.create({
            contentId: contentDetails._id,
            userId: userId,
            rating: rating,
            review: review,
        })

        await Content.findByIdAndUpdate({_id: contentDetails._id},
            {
                $push: {
                    ratingAndReviews: reviewDetails._id,
                }
            }
        )

        return res.status(200).json({
            success: true,
            message: "Review Created Successfully",
            data: reviewDetails,
        })
    } catch(error) {
        console.log("CREATE REVIEW CONTROLLER ERROR...", error);
        return res.status(500).json({
            success: false,
            message: "CREATE REVIEW CONTROLLER ERROR",
            error: error,
        }); 
    }
}

exports.updateReview = async(req, res) => {
    try {
        const { reviewId } =  req.body;
        const updates = req.body;
        const userId = req.user.id;

        if( !updates || !userId || !reviewId) {
            return res.status(400).json({
                success: false, 
                message: "Updates not found",
            });
        }

        const oldReview = await RatingAndReview.findById({_id: reviewId})

        if(!oldReview) {
            return res.status(400).json({
                success: false,
                message: "Review not found",
            });
        }

        for(const key in updates) {
            if(updates.hasOwnProperty(key)) {
                oldReview[key] = updates[key];
            }
        }        

        oldReview.save();

        return res.status(200).json({
            success: true,
            message: "Review Updated Successfully",
            data: reviewDetails,
        })
    } catch(error) {
        console.log("UPDATE REVIEW CONTROLLER ERROR...", error);
        return res.status(500).json({
            success: false,
            message: "UPDATE REVIEW CONTROLLER ERROR",
            error: error,
        }); 
    }
}

exports.deleteReview = async(req, res) => {
    try {
        const {contentId, reviewId} =  req.body;
        const userId = req.user.id;

        if(!contentId || !reviewId || !userId) {
            return res.status(400).json({
                success: false, 
                message: "All Fields are Required",
            });
        }

        const reviewDetails = await RatingAndReview.findById({_id: reviewId});

        if(!reviewDetails) {
            return res.status(400).json({
                success: false,
                message: "Review Not Found",
            })
        }

        const contentDetails = await Content.findByIdAndUpdate({_id: contentId},
            {$pull: {
                ratingAndReviews: reviewDetails._id,
            }},
            {new: true}
        );

        if(!contentDetails) {
            return res.status(400).json({
                success: false,
                message: "Not a Valid Content",
            });
        }

        await RatingAndReview.findByIdAndDelete({_id: reviewDetails._id});

        return res.status(200).json({
            success: true,
            message: "Review Delete Successfully",
        })
    } catch(error) {
        console.log("DELETE REVIEW CONTROLLER ERROR...", error);
        return res.status(500).json({
            success: false,
            message: "DELETE REVIEW CONTROLLER ERROR",
            error: error,
        }); 
    }
}

exports.getAllReviews = async(req, res) => {
    try {
        
    } catch(error) {
        console.log("GET ALL REVIEW CONTROLLER ERROR...", error);
        return res.status(500).json({
            success: false,
            message: "GET ALL REVIEW CONTROLLER ERROR",
            error: error,
        }); 
    }
}

