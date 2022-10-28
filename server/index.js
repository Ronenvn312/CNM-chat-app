const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoute = require('./routes/userRoute')

const app = express()
require('dotenv').config()

app.use(cors())
app.use(express.json())

app.use("/api/auth", userRoute)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err.message))

const server = app.listen(process.env.PORT, () => console.log(`Server started on port : ${process.env.PORT}`))