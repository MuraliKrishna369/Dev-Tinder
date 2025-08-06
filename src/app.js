const express  = require('express');

const app = express()

app.use("/user", (req, res) => {
    res.send("I just execute")
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