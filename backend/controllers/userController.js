// Imports
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

// Models
const User = require('../models/userModel')

// @desc   Register User
// @route  /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, password } = req.body

    // Validation
    if(!firstname || !lastname || !email || !password){
        return res.status(400).json({
            message: 'Please Provide All Information'
        })
    }

    // Does User Already Exist?
    const userExists = await User.findOne({ email })

    userExists && res.status(400).json({
        message: 'User already exists'
    })

    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create User
    const user = await User.create({
        firstname,
        lastname,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
        })
    } else {
        res.status(400).json({
            message: 'Invalid user data'
        })
    }
})

// @desc   Login User
// @route  /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    res.send('Login Route')
})

// @desc   Get Users
// @route  /api/users
// @access Public
const getUsers = (req, res) => {
    res.json({
        message: 'List of Users'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUsers
}