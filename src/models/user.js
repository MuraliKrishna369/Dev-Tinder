const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true, minLength: 4, maxLength: 50},
    lastName: {type: String, minLength: 4, maxLength: 50},
    emailId: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true, unique: true},
    age: {type: Number, min: 18},
    gender: {type: String, validate: {
        validator: function(v){
            if (!["male", "female", "other"].includes(v)){
                throw new Error("Gender data is invalid")
            }
        }
    }},
    skills: {type: [String], default: "javascript"}
}, {timestamps: true})
const User = mongoose.model("User", userSchema)
module.exports = User