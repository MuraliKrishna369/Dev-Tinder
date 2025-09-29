const express = require("express");
const { userAuth } = require("../middlewares/auth");
const Chat = require("../models/chat");
const { validateToUserId } = require("../utils/validation");
const ConnectionRequest = require("../models/connectionRequest");
const chatRouter = express.Router()

chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
    const page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 10
    limit = limit > 20? 20 : limit
    const skip = (page - 1) * limit 
    try {
        const userId = req.user._id
        const {targetUserId} = req.params;
        validateToUserId(targetUserId)
        const connectionExisted = await ConnectionRequest.findOne({
            $or : [
                {fromUserId: userId, toUserId: targetUserId},
                {fromUserId: targetUserId, toUserId: userId}
            ]
        })
        if (!connectionExisted){
            return res.status(400).send("connection not exist")
        }
        let chat = await Chat.findOne({participants: {$all: [userId, targetUserId]}}).select({ messages: { $slice: [skip, limit] } })
         if (!chat) {
            chat = new Chat({
                participants: [userId, targetUserId],
                messages: [],
            });
            await chat.save();   
        }
    
        res.json(chat)
        
    } catch (error) {
        console.log(error)
    }
})


module.exports = chatRouter