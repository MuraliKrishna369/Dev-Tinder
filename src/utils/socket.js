const socket = require("socket.io");
const Chat = require("../models/chat");
const UserStatus = require("../models/status");



intializeSocket = (server) => {
    const io = socket(server, {
        cors : {
           origin: "https://techmates.online"     // bind a domain
                    
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
        socket.on("sendMessage", async ({text, userId, targetUserId}) => {
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
                    io.to(roomId).emit("receiveMessage", {senderId: userId, message: text})
                }
                
            }
            catch(err){
                console.log(err)
            }
            
            
        })

        // socket.on("sendStatus", async ({firstName, userId, targetUserId, status}) => {
        //     const roomId = [userId, targetUserId].sort().join("_")
        //     console.log(roomId)
        //     console.log(firstName + " " + status)
        //     try {
        //         const userStatus = await UserStatus.findOne({userId})
        //         if (!userStatus){
        //             const userStatus = new UserStatus({userId, status})
        //             await userStatus.save()
        //         }
        //         userStatus.status = status
        //         await userStatus.save()

        //         const targetUserStatus = await UserStatus.findOne({userId: targetUserId})
        //         io.to(roomId).emit("receiveStatus", {targetUserStatus})
                
                

        //     } catch (error) {
        //         console.log(error)
        //     }
            
                    
        // })          
    
       
        socket.on("disconnect", () => {})
    });
}

module.exports = intializeSocket