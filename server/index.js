const express = require("express");
const { createServer } = require("http");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv")
const database = require("./config/database");
const {configCloudinary} = require("./config/cloudinary");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {Server} = require("socket.io");

// Socket.io Config
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", 'POST'],
        credentials: true,

    },
});

// Routes
const contentRoutes = require("./routes/Content");
const authRoutes = require("./routes/Auth");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");

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
const CHATTING_PORT = process.env.CHATTING_PORT;

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
app.use("/api/v1/payment", paymentRoutes);

// Testing the server
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

io.on("connection", (socket) => {
    socket.on("comment", (data) => {
        socket.broadcast.emit("receive_comment", data);
    });
})

// app.listen(PORT, () => {
//     console.log(`App is running at ${PORT}`);
// });

server.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
})






