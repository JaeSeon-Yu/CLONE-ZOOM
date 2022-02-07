import http from "http"
import WebSocket from "ws"
import express from "express"

const app = express()

app.set('view engine', "pug")
app.set("views", __dirname + "/public/views")
app.use("/public", express.static(__dirname + "/public"))
app.get("/", (req, res) => res.render("home"))

const handleListen = () => console.log(`Listening on http://localhost:3000`)

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

function onSocketClosing(){
    console.log("연결 해제됨.")
}

const sockets = []

wss.on("connection",(socket) => {
    sockets.push(socket)
    socket["nickname"] = "익명"
    console.log("연결됨 !")
    socket.on("close" , onSocketClosing)
    socket.on("message", (message) => {
        const msg = JSON.parse(message)
        switch(msg.type){
            case "new_message" : 
                sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${msg.payload}`))
            case "nickname" : 
                socket["nickname"] = msg.payload
        }
    })
    socket.send("서버에 접속되었습니다.")
})


server.listen(3000, handleListen)