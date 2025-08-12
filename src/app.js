const express = require("express");
const connectDB  = require("./config/database");
const User = require("./models/user");
const app = express()
app.use(express.json())

// create user
app.post("/signup", async (req, res) => {
    const user = new User(req.body)
    try{
        await user.save()
        res.send("User created")
    }
    catch(err){
        res.status(400).send("User creation failed :" + err)
    }
})

// find user using their first name
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
// Feed API 
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

// Delete a user
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

// Updata the user
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
