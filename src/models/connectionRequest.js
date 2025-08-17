const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    status: {
        type: String,
        require: true,
        enum: ["intrested", "ignored", "accepted", "rejected"],
        message: `Invalid Status`
        
    }
}, {timestamps: true})

connectionRequestSchema.pre("save", function (next) {
    const {fromUserId, toUserId} = this;
    if (fromUserId.equals(toUserId)){
        throw new Error("Can't send request to by yourself")
    }
    next()
})

const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema)
module.exports = ConnectionRequest