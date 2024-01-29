const Content = require("../models/Content");
const User = require("../models/User");
const Genre = require("../models/Genre"); 
exports.createContent = async(req, res) => {
    try {

        const {
            contentName,
            contentDescription,
            price,
            tag,
            genre,
            status,
            instructions,
        } = req.body;
        const thumbnail = req.files.thumbnail;
        const userId = req.user.id;

        // Validating the received data
        if(!contentName || !contentDescription || !price || !tag || !genre 
            || !status || !instructions || !thumbnail) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required",
                });
        }

        






    } catch(error) {
        console.log("CREATE CONTENT CONTROLLER ERROR...", error);
        return res.status(500).json({
            success: false,
            message: "CREATE CONTENT CONTROLLER ERROR",
            error: error,
        }); 
    }
}


