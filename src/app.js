const express = require("express");
const connectDB  = require("./config/database");
const User = require("./models/user");
const app = express()

app.get("/user", (req, res) => {
    res.send("Hello World!")
})

app.post("/signup", async (req, res) => {
    const userInfo = {
        firstName: "Murali",
        lastName: "Krishna",
        emailId: "murali@gmail.com",
        password: "murali@1234",
        gender: "male"
    }
    const user = new User(userInfo)
    try{
        await user.save()
        res.send("User created")
    }
    catch(err){
        res.send("User creation failed ", err)
    }
   
    
})

connectDB()
.then(() => {
    console.log("Database connected")
    app.listen(7777, () => console.log("server is running on port 7777"))
})
.catch((err) => console.log(err, "Database connection is failed"))
