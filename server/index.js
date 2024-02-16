const express = require("express");
const app = express();

const fileUpload = require("express-fileupload");
const dotenv = require("dotenv")
const database = require("./config/database");
const {configCloudinary} = require("./config/cloudinary");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Routes
const contentRoutes = require("./routes/Content");
const authRoutes = require("./routes/Auth");
const profileRoutes = require("./routes/Profile");

database.connect();
dotenv.config();
configCloudinary();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"*",
        credentials: true,
    })
)

const PORT = process.env.PORT || 4000;



app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir:"/tmp/",
    })
)

// Mounting Routes
app.use("/api/v1/content", contentRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);

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





