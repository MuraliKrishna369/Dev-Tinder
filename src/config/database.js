const mongoose = require("mongoose")
const connectDB = async () => {
    await mongoose.connect("mongodb+srv://muralikrishnapogiri369:z8CYtnhrJBpTeIaG@namastenode.zboglvd.mongodb.net/devTinder")
}

module.exports = connectDB
