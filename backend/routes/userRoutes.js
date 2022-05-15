// Imports
const express = require('express')
const router = express.Router()

// Controllers
const { registerUser, loginUser, getUsers, getUser, deleteUser } = require('../controllers/userController')

// Middleware
const { protect } = require('../middleware/auth')

router.route('/')
    .get(getUsers)
    .post(registerUser)
    .delete(deleteUser)

router.route('/:id')
    .get(getUser)
    .delete(deleteUser)

router.route('/login')
    .post(loginUser)

router.route('/profile/:id')
    .get(protect, getUser)

module.exports = router