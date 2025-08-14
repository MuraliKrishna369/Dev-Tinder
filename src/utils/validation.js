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


module.exports = {validateSignUpData}