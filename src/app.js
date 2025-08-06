const express  = require('express');

const app = express()

// multiple route handler

app.use("/user", 
    // route handler
   
    (req, res, next) => { 
        console.log("This is my 1st route handler")
        next()
        //res.send("response send successfully from route handler 1")
    },
    [
    (req, res, next) => {
        console.log("This is my second route handler")
        //res.send("response from 2nd route handler")
        next()
    },
    (req, res, next) => {
        console.log("this is my third route handler")
        //res.send("response from 3rd route handler")
        next()
    },
    
    (req, res) => {
        console.log("this is my fouth route handler")
        res.send("response from 4th route handler")
    }
    ]
)


app.listen(7777, () => {
    console.log("server is running on port 7777")
})