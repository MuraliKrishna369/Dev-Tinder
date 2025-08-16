const bcrypt = require("bcrypt")
const mongoose  = require("mongoose")
const validator = require("validator")
const validateSignUpData = (req) => {
    const {firstName, lastName, password} = req.body
    if (firstName.length < 4 || firstName.length > 50 && lastName.length < 4 || lastName.length > 50){
        throw new Error("Name is invalid!")
    }
    else if (!validator.isStrongPassword(password)){
        throw new Error("Enter strong password")
    }

}

const validateEditFeilds = (req) => {
    const allowedFeildsToUpdate = ["firstName", "lastName", "age", "gender", "skills", "about"]
    const isAllowedToUpdate = Object.keys(req.body).every(key => allowedFeildsToUpdate.includes(key))
    return isAllowedToUpdate
}

const validatePassword = async (req) => {
    const {currentPassword} = req.body
    const user = req.user
    const storedPasswordInDB = user.password
    const isCorrectPassword = await bcrypt.compare(currentPassword, storedPasswordInDB)
    return isCorrectPassword
}

const validateToUserId =  (id) => {
    if (! mongoose.Types.ObjectId.isValid(id)){
        throw new Error ("Invalid User Id!!!")
    }
}


module.exports = {validateSignUpData, validateEditFeilds, validatePassword, validateToUserId}