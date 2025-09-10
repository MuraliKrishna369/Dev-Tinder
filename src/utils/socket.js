const socket = require("socket.io")


intializeSocket = (server) => {
    const io = socket(server, {
        cors : {
            origin: "http://localhost:5173"
        }
    })
    io.on("connection", (socket) => {
        //Hanlde events
        socket.on("joinChat", () => {})
        socket.on("sendMessage", () => {})
        socket.on("disconnect", () => {})
    });
}

module.exports = intializeSocket