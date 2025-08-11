const express = require("express");
const connectDB  = require("./config/database");
const User = require("./models/user");
const app = express()
app.use(express.json())


app.post("/signup", async (req, res) => {
    const user = new User(req.body)
    try{
        await user.save()
        res.send("User created")
    }
    catch(err){
        res.status(400).send("User creation failed ", err)
    }
})

// find one user in the feed based on their name or email or age or gender
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
app.patch("/user", async (req, res) => {
    const userId = req.body.userId
    const data = req.body
    try{
        await User.findByIdAndUpdate({_id: userId}, data) 
        res.send("User updated")
    }
    catch (err) {
        res.status(400).send("Something went wrong")
    }
})

connectDB()
.then(() => {
    console.log("Database connected")
    app.listen(7777, () => console.log("server is running on port 7777"))
})
.catch((err) => console.log(err, "Database connection is failed"))
