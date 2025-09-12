const express = require("express");
const { userAuth } = require("../middlewares/auth");
const Chat = require("../models/chat");
const chatRouter = express.Router()

chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
    try {
        const userId = req.user._id
        const {targetUserId} = req.params;
        const chat = await Chat.findOne({participants: {$all: [userId, targetUserId]}})
        if(!chat){
            res.send("first time chat")
        }
        res.json(chat)
    } catch (error) {
        console.log(error)
    }
})

module.exports = chatRouter