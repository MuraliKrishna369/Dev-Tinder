const express = require("express")
const requestRouter = express.Router()
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const {validateToUserId} = require("../utils/validation")

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        const allowedStatus = ["intrested", "ignored"]
        if (!allowedStatus.includes(status)){
            throw new Error("Invalid status")
        }
        validateToUserId(toUserId)
        const toUser = await User.findById({_id: toUserId})
        if (!toUser){
            return res.status(400).send("Connecting user not found!!!")
        }
        const connectionExisted = await ConnectionRequest.findOne({
            $or : [
                {fromUserId: fromUserId, toUserId: toUserId},
                {fromUserId: toUserId, toUserId: fromUserId}
            ]
        })
        if (connectionExisted){
            return res.status(400).send("Connection already exists")
        }
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });
        await connectionRequest.save()
        res.json({message: "Connection request successful"})
    }
    catch (err) {
        res.status(400).send("ERROR : " + err.message)
    }


   
})

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user
        const {status, requestId} = req.params;
        const allowedStatus = ["accepted", "rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: "Invalid status!"})
        }
        const connectionRequest = await ConnectionRequest.findOne({_id: requestId, toUserId: loggedInUser, status: "intrested"})
        
        if (!connectionRequest){
            return res.status(400).json({message: "Invalid connection request"})
        }
        connectionRequest.status = status
        await connectionRequest.save()
        res.json({message: "Connection request is "+ status})
    }
    catch (err) {
        res.status(400).send("ERROR : "+ err.message)
    }
    
})



module.exports = requestRouter