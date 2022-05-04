// Module Imports
const express = require('express')
const dotenv = require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 5000

// Routes
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Home route is working!'
    })
})

app.listen(PORT, () => console.log(`Server Running: Port ${PORT}`))