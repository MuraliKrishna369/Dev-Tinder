const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true, minLength: 4, maxLength: 50},
    lastName: {type: String, minLength: 4, maxLength: 50},
    emailId: {type: String, required: true, unique: true, lowercase: true,
        validate (value){
            if (!validator.isEmail(value)){
                throw new Error("Invalid Email Address " + value)
            }
        }

    },
    password: {type: String, required: true, unique: true},
    age: {type: Number, min: 18},
    gender: {type: String, validate(v) { 
            if (!["male", "female", "other"].includes(v)){
                throw new Error("Gender data is invalid")
            }   
    }},
    skills: {type: [String], default: "javascript"}
}, {timestamps: true})


userSchema.methods.validatePassword = async function (passwordByInputUser) {
    const user = this;
    const passwordHash = user.password
    const isPasswordValid = await bcrypt.compare(passwordByInputUser, passwordHash)
    return isPasswordValid
}

userSchema.methods.getJWT = async function () {
    const user = this;
    const {_id} = user
    const token = await jwt.sign({_id: _id}, process.env.JWT_SECRET_KEY, {expiresIn: "7d"})
    return token
}


const User = mongoose.model("User", userSchema)
module.exports = User