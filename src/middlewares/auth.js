const authAdmin  = (req, res, next) => {
    console.log("passing through middleware")
    // athorize admin
    const token = "xyz" // admin will sent the token or password
    // you will check whether it is valid or not through db
    const isAdminAuthrized = "xyz" === token
    if (!isAdminAuthrized){
        res.status(401).send("Admin unathorized")
        
    }
    else{
        next()
    }
}
const authUser  = (req, res, next) => {
    console.log("passing through middleware")
    // athorize admin
    const token = "xyz" // admin will sent the token or password
    // you will check whether it is valid or not through db
    const isUserAuthrized = "xyz" === token
    if (!isUserAuthrized){
        res.status(401).send("User unathorized")
        
    }
    else{
        next()
    }
}
module.exports = {
    authAdmin,
    authUser
}