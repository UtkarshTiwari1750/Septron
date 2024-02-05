const Genre = require("../models/Genre");

exports.createGenre = async(req, res) => {
    try{
        const {name, description} = req.body;
        
        if(!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if(req?.user?.accountType !== 'Admin') {
            return res.status(400).json({
                success: false,
                message: "Only Admin can create genre",
            });
        }

        const genreDetails = await Genre.create({
            name,
            description,
        });

        return res.status(200).json({
            success: true,
            message: "Genre Created successfully",
        })

    } catch(error) {
        console.log("CREATE GENRE CONTROLLER ERROR...", error);
        return res.status(500).json({
            success: false,
            message: "CREATE GENRE CONTROLLER ERROR",
            error: error,
        }); 
    }
}
