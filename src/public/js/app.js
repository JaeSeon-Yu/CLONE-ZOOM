const socket = io()

const welcome = document.querySelector("#welcome")
const form = welcome.querySelector("form")
const room = document.querySelector("#room")

let roomName

function addMessage(msg){
    const ul = room.querySelector("ul")
    const li = document.createElement("li")
    li.innerText = msg
    ul.appendChild(li)
}

function handleMessageSubmit(event){
    event.preventDefault()
    const value = input.value
    const input = room.querySelector("input")
    socket.emit("new_message", input.value, roomName, () => {
        addMessage(`You : ${input.value}`)
    })
//1200
    input.value = ""
}

function showRoom(){
    welcome.hidden = true
    room.hidden = false
    const h3 = room.querySelector("h3")
    h3.innerText = `Room ${roomName}`

    const form = room.querySelector("form")

    form.addEventListener("submit", handleMessageSubmit)
}

function handleRoomSubmit(event){
    event.preventDefault()
    const input = form.querySelector("input")

    socket.emit("enter_room", input.value, showRoom)
    roomName = input.value

    input.value = ""
}

form.addEventListener("submit", handleRoomSubmit)



socket.on("welcome", () => {
    addMessage("환영합니다!")
})


socket.on("bye", () => {
    addMessage("ㅂ2")
})

socket.on("new_message", addMessage)





// const messageList = document.querySelector("ul")
// const messageForm = document.querySelector("#message")
// const nicknameForm = document.querySelector("#nickname")
// const socket = new WebSocket(`ws://${window.location.host}`)

// function makeMessage(type, payload){
//     const msg = {type, payload}
//     return JSON.stringify(msg)
// }


// socket.addEventListener("open", () => {
//     console.log("Connected to server")
// })

// socket.addEventListener("message", (message) => {
//     const li = document.createElement("li")
//     li.innerText = message.data
//     messageList.append(li)
// })

// socket.addEventListener("close", () => {
//     console.log("unConneted to server")
// })


// function handleSubmit(event){
//     event.preventDefault()
//     const input = messageForm.querySelector("input")
//     socket.send(makeMessage("new_message", input.value))
//     const li = document.createElement("li")
//     li.innerText = `나 : ${input.value}`
//     messageList.append(li)
//     input.value = ""
// }

// function handleNicknameSubmit(event){
//     event.preventDefault()
//     const input = nicknameForm.querySelector("input")
//     socket.send(makeMessage("nickname", input.value))
//     input.value = ""
// }

// messageForm.addEventListener("submit",handleSubmit)


// nicknameForm.addEventListener("submit",handleNicknameSubmit)