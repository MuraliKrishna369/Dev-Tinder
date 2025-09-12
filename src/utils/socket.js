const socket = require("socket.io");
const Chat = require("../models/chat");


intializeSocket = (server) => {
    const io = socket(server, {
        cors : {
            origin: "http://localhost:5173"
        }
    })
    io.on("connection", (socket) => {
        //Hanlde events
      
        socket.on("joinChat", ({firstName, userId, targetUserId}) => {
            // We have should same room for both
            const roomId = [userId, targetUserId].sort().join("_")
            console.log(firstName + " joined room " + roomId)
            socket.join(roomId)
        })
        socket.on("sendMessage", async ({firstName, text, userId, targetUserId}) => {
            const roomId = [userId, targetUserId].sort().join("_")
            try{
                const chat = await Chat.findOne({participants: {$all : [userId, targetUserId]}})
                if (!chat){
                    const chat = new Chat({participants: [userId, targetUserId], messages: [{senderId: userId, message: text}]})
                    await chat.save()
                   
                }
                else{
                    chat.messages.push({senderId: userId, message: text})
                    await chat.save()
                    socket.to(roomId).emit("receiveMessage", {firstName, text})
                }
                
            }
            catch(err){
                console.log(err)
            }
            
            
        })
        socket.on("disconnect", () => {})
    });
}

module.exports = intializeSocket