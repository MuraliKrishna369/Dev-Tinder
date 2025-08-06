const express  = require('express');

const app = express()

app.get("/user/:userId", (req, res) => {
    console.log(req.params)
    res.send("hello browser thanks for sending userId using params")
})

app.get("/user", (req, res) => {
    console.log(req.query.search)
    res.send("hello browser thanks for sending search query using query parameter")
})


app.get("/user", (req, res) => {
    res.send({firstName: "Murali", lastName: "Krishna"})
})

app.post("/user", (req, res) => {
    // Store the data in the database
    res.send("Data stored successfully")
})

app.get("/greet", (req, res) => {
    res.send("Welcome to backend")
})


app.listen(7777, () => {
    console.log("server is running on port 7777")
})