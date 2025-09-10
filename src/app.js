const express = require("express");
const cors = require("cors")
const connectDB  = require("./config/database");
const cookieParser = require("cookie-parser")
require("dotenv").config()
const http = require('http')
const intializeSocket = require("./utils/socket")
const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")
const userRouter = require("./routes/user")

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter)

const server = http.createServer(app)
intializeSocket(server)

connectDB()
.then(() => {
    console.log("Database connected")
    server.listen(7777, () => console.log("server is running on port 7777"))
})
.catch((err) => console.log(err, "Database connection is failed"))
