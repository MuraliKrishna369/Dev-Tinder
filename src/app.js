const express  = require('express');
const app = express()
console.log("3 rd line")
app.listen(1234)
console.log("4 th line")
app.get("/", (req, res) => {
    res.send("Hello world!")
    console.log("8th line")
})
console.log("9th line")


/**
 * 8 th line is not executed why?
 * our app object has super powers of express get, post , listen, etc..
 * listen function calls directly
 * but http methods are works like callback it only calls 
 * when the specific routes path matches it executes the routes handler function
 * whenever the http method executes it must send the response to the client
 * otherwise the our response is hanging leads to server freez
 */