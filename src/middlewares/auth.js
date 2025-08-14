const jwt = require("jsonwebtoken")
const User = require("../models/user")

const userAuth = async (req, res, next) => {
    try{
        const cookie = req.cookies
        const {token} = cookie
        if(!token){
            throw new Error("Token is invalid!!!")
        }
        const decodedObj = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        const {_id} = decodedObj
        const user = await User.findById(_id)
        if (!user){
            throw new Error("User not found")
        }
        req.user = user
        next()

    }
    catch(err){
        res.status(400).send("ERROR : "+ err.message)
    }
    
    

}
module.exports = {userAuth}