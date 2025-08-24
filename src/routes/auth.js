const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt")

authRouter.post("/signup", async (req, res) => {
    // create a instance of user using user model
    const {firstName, lastName, emailId, password, age, gender, photoUrl, skills, about} = req.body
    try{
        validateSignUpData(req)
        const passwordHash = await bcrypt.hash(password, 10)
        const user = new User({firstName, lastName, emailId, password: passwordHash,about,  age, gender, photoUrl, skills})
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
            res.cookie("token", token, {expires: new Date(Date.now() + 1000 * 86400)})
            res.json(user)
        }
        else{
            throw new Error("Invalid creadintials")
        }
        
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message)
    }
})

authRouter.post("/logout", (req, res) => {
    res.cookie("token", null, {expires: new Date(Date.now())})
    res.send("Logout successful")
})



module.exports = authRouter