const express = require("express");
const connectDB  = require("./config/database");
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const {userAuth} = require("./middlewares/auth")
const app = express()
app.use(express.json())
app.use(cookieParser())


app.post("/signup", async (req, res) => {
    // create a instance of user using user model
    const {firstName, lastName, emailId, password} = req.body
    try{
        validateSignUpData(req)
        const passwordHash = await bcrypt.hash(password, 10)
        const user = new User({firstName, lastName, emailId, password: passwordHash})
        await user.save()
        res.send("User created successfully")
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message)
    }
})

app.post("/login",  async (req, res) => {
    const {emailId, password} = req.body
    try{
        const user = await User.findOne({emailId: emailId})
        if (!user){
            throw new Error("Invalid creadintials")
        }
        const isPasswordValid = await user.validatePassword(password)
        if (isPasswordValid){
            const token = await user.getJWT()
            res.cookie("token", token)
            res.send("Login successful")
        }
        else{
            throw new Error("Invalid creadintials")
        }
        
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message)
    }
})

app.get("/profile", userAuth,  (req, res) => {  
   const user = req.user
   res.send(user)
})

app.post("/sendConnection", userAuth, (req, res) => {
    const user = req.user
    // Have to Implement Connection Logic
    res.send(user.firstName + " sent connection to : " + "Elon Musk")
})



connectDB()
.then(() => {
    console.log("Database connected")
    app.listen(7777, () => console.log("server is running on port 7777"))
})
.catch((err) => console.log(err, "Database connection is failed"))
