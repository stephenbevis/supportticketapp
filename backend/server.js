// Imports
const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const cors = require('cors')

// Init Server
const app = express()

// Cors
app.use(cors({
    origin: 'http://localhost:5000'
}))

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

// Connect to Database
connectDB()

// Routes
app.use('/api/users', require('./routes/userRoutes'))

app.listen(process.env.PORT, () => console.log(`Server Running: Port ${process.env.PORT}`))