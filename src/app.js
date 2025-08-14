const express = require("express");
const connectDB  = require("./config/database");
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt")
const app = express()
app.use(express.json())


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

app.post("/login", async (req, res) => {
    const {emailId, password} = req.body
    try{
        const user = await User.findOne({emailId: emailId})
        if (!user){
            throw new Error("Invalid creadintials")
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid){
            throw new Error("Invalid creadintials")
        }
        res.send("Login successful")
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message)
    }
})

app.post("/profile", async (req, res) => {  
    try{

        const profile = await User.findOne({firstName: req.body.firstName})
        if (!profile){
            res.send("Profile not found")
        }
        else{
            res.send(profile)
        }
        
    }
    catch (err){
        res.status(400).send("Profile not found")
    }
})

app.get("/feed", async (req, res) => {  
    try{
        const users = await User.find({})
        if (users.length === 0) {
            res.send("Users not found")
        }
        else{
            res.send(users)
        }
        
    }
    catch (err){
        res.status(400).send("Users not found ", err)
    }

})

app.delete("/user", async (req, res) => {
    const userId = req.body.userId
    try{
        await User.findByIdAndDelete({_id: userId})
        res.send("User Deleted")
    }
    catch (error) {
        res.status(400).send("Something went wrong")
    }
})

app.patch("/user/:userId", async (req, res) => {
    const userId = req.params.userId
    const data = req.body
    try{
        if (data.skills.length > 10){
            throw new Error("Max skills should be 10 only")
        }
        const ALLOWED_UPDATES = ["skills", "gender", "age"]
        const isAllowedUpdates = Object.keys(data).every(k => ALLOWED_UPDATES.includes(k))
        if (!isAllowedUpdates){
            throw new Error("Update those fields not allowed")
        }
        await User.findByIdAndUpdate({_id: userId}, data, {returnDocument: 'after', runValidators: true}) 
        res.send("User updated")
    }
    catch (err) {
        res.status(400).send("Something went wrong: " + err.message)
    }
})

connectDB()
.then(() => {
    console.log("Database connected")
    app.listen(7777, () => console.log("server is running on port 7777"))
})
.catch((err) => console.log(err, "Database connection is failed"))
