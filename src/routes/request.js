const express = require("express")
const requestRouter = express.Router()
const {userAuth} = require("../middlewares/auth")

requestRouter.post("/sendConnection", userAuth, (req, res) => {
    const user = req.user
    // Have to Implement Connection Logic
    res.send(user.firstName + " sent connection to : " + "Elon Musk")
})


module.exports = requestRouter