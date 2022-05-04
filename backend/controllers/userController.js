const asyncHandler = require('express-async-handler')

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

    res.send('Register Route')
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