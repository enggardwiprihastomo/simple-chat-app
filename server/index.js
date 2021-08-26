const io = require("socket.io")(8080, {
    cors: {
        origin: ["http://localhost:3000"]
    }
})

io.on("connection", socket => {
    socket.on("send", data => {
        socket.broadcast.emit("receive", data)
    })
})
