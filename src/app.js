const express = require("express");
const {connectDB}  = require("./utils/database");
const app = express()

connectDB()
.then(() => {
    console.log("Database connected")
    app.listen(7777, () => console.log("server is running on port 7777"))
})
.catch((e) => console.log(e, "Database connection is failed"))
