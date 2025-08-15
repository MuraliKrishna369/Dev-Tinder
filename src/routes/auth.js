const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt")

authRouter.post("/signup", async (req, res) => {
    // create a instance of user using user model
    const {firstName, lastName, emailId, password} = req.body
    try{
        validateSignUpData(req)
        const passwordHash = await bcrypt.hash(password, 10)
        const user = new User({firstName, lastName, emailId, password: passwordHash})
        await user.save()
        res.send("User created successfully")
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message)
    }
})


authRouter.post("/login",  async (req, res) => {
    const {emailId, password} = req.body
    try{
        const user = await User.findOne({emailId: emailId})
        if (!user){
            throw new Error("Invalid creadintials")
        }
        const isPasswordValid = await user.validatePassword(password)
        if (isPasswordValid){
            const token = await user.getJWT()
            res.cookie("token", token)
            res.send("Login successful")
        }
        else{
            throw new Error("Invalid creadintials")
        }
        
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message)
    }
})

module.exports = authRouter