const express = require("express")
const profileRouter = express.Router()
const {userAuth} = require("../middlewares/auth")

profileRouter.get("/profile", userAuth,  (req, res) => {  
   const user = req.user
   res.send(user)
})

module.exports = profileRouter