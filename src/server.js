import http from "http"
import {Server} from "socket.io"
import express from "express"
import { doesNotMatch } from "assert"

const app = express()

app.set('view engine', "pug")
app.set("views", __dirname + "/public/views")
app.use("/public", express.static(__dirname + "/public"))
app.get("/", (req, res) => res.render("home"))

const handleListen = () => console.log(`Listening on http://localhost:3000`)

const httpServer = http.createServer(app)
const ioServer = new Server(httpServer)

ioServer.on("connection", (socket) => {
    socket.onAny((event) => {
        console.log(`Socket Event: ${event}`)
    })

    socket.on("enter_room", (roomName, done) => {
        socket.join(roomName)
        console.log(roomName)
        done()
        socket.to(roomName).emit("welcome")
    })
    socket.on("disconnecting", () => {
        socket.rooms.forEach(room => socket.to(room).emit("bye"))
    })
    socket.on("new_message", (msg, room, done) => {
        socket.to(room).emit("new_message", msg)
        done()
    })
})


httpServer.listen(3000, handleListen)


// function onSocketClosing(){
//     console.log("연결 해제됨.")}
// const wss = new WebSocket.Server({ server })
// const sockets = []
// wss.on("connection",(socket) => {
//     sockets.push(socket)
//     socket["nickname"] = "익명"
//     console.log("연결됨 !")
//     socket.on("close" , onSocketClosing)
//     socket.on("message", (message) => {
//         const msg = JSON.parse(message)
//         switch(msg.type){
//             case "new_message" : 
//                 sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${msg.payload}`))
//             case "nickname" : 
//                 socket["nickname"] = msg.payload
//         }
//     })
//     socket.send("서버에 접속되었습니다.")
// })

