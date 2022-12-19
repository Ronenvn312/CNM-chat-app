require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const http = require("http")
const { Server } = require("socket.io")

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: "*"
    }
})

io.on("connection", (socket) => {
    // console.log(`User connected ${socket.id}`)
    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`User joined room ${data}`)
    }) 

    socket.on('send_message',(data) => {
        socket.to(data.room).emit("receive_message", data)
    })

    socket.on("disconnect", () => {
        console.log("User disconnected")
    })
})

const userRoute = require('./routes/userRoute')
const chatRoute = require('./routes/chatRoute')
const messageRoute = require('./routes/messageRoute')
const groupMessageRoute = require("./routes/groupMessageRoute")


app.use(cors())
app.use(express.json())

app.use("/api/auth", userRoute)
app.use("/api/chat/", chatRoute)
app.use("/api/message/", messageRoute)
app.use("/api/groupmessage/", groupMessageRoute)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err.message))

server.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))