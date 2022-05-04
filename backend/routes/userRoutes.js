const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getUsers } = require('../controllers/userController')

// Register User
router.post('/', registerUser)

// Login User
router.post('/login', loginUser)

// Get Users
router.get('/', getUsers)

module.exports = router