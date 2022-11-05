const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoute = require('./routes/userRoute')
const chatRoute = require('./routes/chatRoute')
const messageRoute = require('./routes/messageRoute')
const app = express()
// const socketio = require('socket.io');

require('dotenv').config()

app.use(cors())
app.use(express.json())

app.use("/api/auth/", userRoute)
app.use("/api/chat/", chatRoute)
app.use("/api/message/", messageRoute)
// const io = new Server(app)
// io.on("connection", (socket) => {
//     console.log(`User connected ${socket.id}`)
//     socket.on('join_room', (data) => {
//         socket.join(data)
//         console.log(`User with id ${socket.id} joined room ${data}`)
//     })

//     socket.on('send_message',(data) => {
//         socket.to(data.room).emit("receive_message", data)
//     })

//     socket.on("disconnect", () => {
//         console.log("User disconnected", socket.id)
//     })
// })

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err.message))
// io.listen(pro)
const server = app.listen(process.env.PORT, () => console.log(`Server started on port : ${process.env.PORT}`))