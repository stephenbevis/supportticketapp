const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getUsers, getUser } = require('../controllers/userController')

// Middleware
const { protect } = require('../middleware/authMiddleware')

// Register User
router.post('/', registerUser)

// Login User
router.post('/login', loginUser)

// Get Users
router.get('/', getUsers)

// Get User
router.get(`/profile`, protect, getUser)

module.exports = router