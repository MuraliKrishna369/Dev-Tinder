const express  = require('express');

const app = express()

app.use("/greet",(req, res) => {
    res.send("This message comes from server , Hello Browser")
})
app.use("/test", (req, res) => {
    res.send("Now Your a Devloper")
})


app.listen(3000, () => {
    console.log("server is running on port 3000")
})