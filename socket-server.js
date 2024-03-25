const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const server = http.createServer();

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

io.on("connection", (socket) => {
    console.log("jsem tu");

    socket.on("add", ({ record }) => {
        socket.emit("addedRecord", record);
    });

    socket.on("delete", id => {
        socket.emit("removedRecord", id);
    })

    socket.on("add-notification", ({ notification }) => {
        socket.emit("new-notification", notification);
    })

    socket.on("disconnect", () => {
        console.log("byee");
    });
});

server.listen(3001, () => {
    console.log("Server běží na 3001 portu");
})
