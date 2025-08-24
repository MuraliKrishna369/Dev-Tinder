const express = require("express")
const profileRouter = express.Router()
const {userAuth} = require("../middlewares/auth")
const {validateEditFeilds, validatePassword} = require("../utils/validation")
const bcrypt = require("bcrypt")

profileRouter.get("/profile/view", userAuth,  (req, res) => {  
   const user = req.user
   res.send(user)
})

profileRouter.put("/profile/edit", userAuth, async (req, res) => {
   try{
      if(!validateEditFeilds(req)){
         throw new Error("Update feilds are mismatched!")
      }
      const user = req.user
      Object.keys(req.body).forEach(key => user[key] = req.body[key])
      const data = await user.save()
      res.json(data)
      
   }
   catch (err) {
      res.status(400).send("ERROR : " + err.message)
   }
})

profileRouter.patch("/profile/password/edit", userAuth, async (req, res) => {
   try{
      if(!validatePassword(req)){
         throw new Error("Wrong password entered!!!")
      }
      const {newPassword} = req.body
      const newHashedPassword = await bcrypt.hash(newPassword, 10)
      const user = req.user
      user.password = newHashedPassword
      await user.save()
      res.send("Password updated succesfully")
   }
   catch (err){
      res.status(400).send("ERROR : " + err.message)
   }
   
})
module.exports = profileRouter