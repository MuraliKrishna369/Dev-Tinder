const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

// fetch all the pending requests 
userRouter.get("/user/request/received", userAuth, async (req, res) => {
    // loggedInUser 
    // fetch based on toUserId and must be intrested
    try{
        const loggedInUser = req.user
        const connectionRequestData = await ConnectionRequest.find({
            toUserId: loggedInUser, status: "intrested"
        }).populate("fromUserId", ["firstName", "lastName"])
        if (!connectionRequestData.length > 0){
            res.status(400).json({message: "No request connections found"})
        }

        res.json({message: "Connection requests fetched successfully", connectionRequestData})
    }
    catch (err) {
        res.status(400).send("ERROR : "+ err.message)
    }
    


})

module.exports = userRouter