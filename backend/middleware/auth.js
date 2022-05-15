// Imports
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const ErrorResponse = require('../utils/errorResponse')

// Models
const User = require('../models/userModel')

exports.protect = asyncHandler(async (req, res, next) => {
    let token

    // If a Bearer token has been sent, we use split() to grab just the token.
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    } 
    
    // if(req.cookies.token){
    //     token = req.cookies.token
    // }

    // Make sure token exists
    if(!token){
        return next(new ErrorResponse('Not authorized to access this page', 401))
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Set user 
        req.user = await User.findById(decoded.id)
        
        next()
    } catch (error) {
        return next(new ErrorResponse('Not authorized to access this page', 401))
    }
})