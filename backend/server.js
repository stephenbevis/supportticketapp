// Module Imports
const express = require('express')
const dotenv = require('dotenv').config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

const PORT = process.env.PORT || 5000

// Routes
app.use('/api/users', require('./routes/userRoutes'))

app.listen(PORT, () => console.log(`Server Running: Port ${PORT}`))