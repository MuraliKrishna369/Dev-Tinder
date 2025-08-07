const express  = require('express');
const { authAdmin, authUser } = require('./middlewares/auth');

const app = express()

//finds mathing route = middleware chain => request handler

app.use("/admin", authAdmin)

app.get("/admin/getUserData", (req, res) => {
    // Logic fetch all user data from database
    console.log("all user data fetched successfully")
    res.send("Data sent")
    
})

app.delete("/admin/deleteUser", (req, res) => {
    console.log("delete the user successfully")
    res.send("User Deleted") 
})

app.post("/user/signup", (req, res) => {
    console.log("user created successfully")
    res.send("User created")
})
app.get("/user/:userId", authUser, (req, res) => {
    console.log("user data fetched successfully")
    res.send("User data sent")
})




app.listen(7777, () => {
    console.log("server is running on port 7777")
})