// Imports
const asyncHandler = require('express-async-handler')
const ErrorResponse = require('../utils/errorResponse')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Models
const User = require('../models/userModel')

// Generat Json Web Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

// @desc   Register User
// @route  POST /api/users
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

    if(userExists){ 
        return res.status(400).json({
            message: 'User already exists'
        })
    }

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
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400).json({
            message: 'Invalid user data'
        })
    }
})

// @desc   Login User
// @route  POST /api/users/login
// @access Public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    // Confirm User Exists and Password Matches
    if(user && (await bcrypt.compare(password, user.password))){
        return res.status(200).json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            token: generateToken(user._id),
            message: 'Success'
        })
    } else {
        res.status(401).json({
            message: 'Invalid credentials'
        })
    }
})

// @desc   Get Users
// @route  GET /api/users
// @access Public

const getUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find()

        res.status(200).json({
            success: true,
            data: users
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            data: {}
        })
    }
})

// @desc   Get User
// @route  GET /api/user/id
// @access Private

const getUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        // If id passed in is formatted incorrectly
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'No user matches the id passed in'
            })
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({
            success: false,
            data: {}
        })
    }
})

// @desc     Delete User
// @route    DELETE /api/profile/:id
// @access   Private

const deleteUser = asyncHandler(async (req, res, next) => {
    const currentUser = getUser()
    const user = await User.findById(currentUser._id)

    if(!user){
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404))
    }

    user.remove()

    res.status(204).json({
        success: true,
        data: {}
    })
})

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    getUser,
    deleteUser
}