const mongoose = require('mongoose');

const userStatusSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User",  required: true},
    status: {type: String}
})

const UserStatus = mongoose.model("UserStatus", userStatusSchema)

module.exports = UserStatus