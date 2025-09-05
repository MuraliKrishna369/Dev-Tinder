const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user")
const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName photoUrl age gender skills about"

userRouter.get("/user/request/received", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user
        const connectionRequestData = await ConnectionRequest.find({
            toUserId: loggedInUser, status: "intrested"
        }).populate("fromUserId", USER_SAFE_DATA)
        if (!connectionRequestData.length > 0){
            res.status(400).json({message: "No request connections found"})
        }

        res.json({message: "Connection requests fetched successfully", connectionRequestData})
    }
    catch (err) {
        res.status(400).send("ERROR : "+ err.message)
    }
    


})


userRouter.get("/user/connections", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user
        const connections = await ConnectionRequest.find({
            $or: [
                {fromUserId: loggedInUser ,status: "accepted"},
                {toUserId: loggedInUser ,status: "accepted"}
            ]
        }).populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA)
        const data = connections.map(row => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId
            }
            return row.fromUserId
        })
        res.json(data)
    }
    catch (err) {
        res.status(400).send("ERROR : "+ err.message)
    }
    
})

userRouter.get("/feed", userAuth, async (req, res) => {

    const page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
    limit = limit > 50? 50 : limit
    const skip = (page - 1) * limit

    try{
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {fromUserId: loggedInUser._id},
                {toUserId: loggedInUser._id}
            ]
        })
        const hideUsersFromFeed = new Set()
        connectionRequests.forEach(req => {
            hideUsersFromFeed.add(req.fromUserId.toString())
            hideUsersFromFeed.add(req.toUserId.toString())
        })
        const users = await User.find({
            $and: [
                {_id: {$nin : Array.from(hideUsersFromFeed)}},
                {_id: {$ne : loggedInUser._id}}
            ]
            
        }).select(USER_SAFE_DATA).skip(skip).limit(limit)
        res.json(users)
    }
    catch(err) {
        res.status(400).send("ERROR : "+ err.message)
    }
})

module.exports = userRouter