const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv")
dotenv.config();
const database = require("./config/database");
const {configCloudinary} = require("./config/cloudinary");
// database.connect();
configCloudinary();
app.use(express.json());

const PORT = process.env.PORT || 4000;


const contentRoutes = require("./routes/Content");
const authRoutes = require("./routes/Auth");

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir:"/tmp/",
    })
)

app.use("/api/v1/content", contentRoutes);
app.use("/api/v1/auth", authRoutes);

// Testing the server
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});



// const User = require("./models/User");
// const mailSender = require("./utils/mailSender");
// const emailTemplate = require("./mail/templates/emailVerificationTemplate")
// const enter = async() => {
//     try{
//         const res = await mailSender("utkarshtiwari1750@gmail.com", "Testing", emailTemplate(123455))
//         console.log("res", res);
//     }catch(error){
//         console.log("ERROR" ,error.message);
//     }
// }

// enter();





