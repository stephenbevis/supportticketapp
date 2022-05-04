// Imports
const jwt = require('jsonwebtoken')
const asynHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asynHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Get Token From Header
            token = req.headers.authorization.split(' ')[1]

            // Verify Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get User From Token
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401).json({
                message: 'Not Authorized'
            })
        }
    }

    if(!token){
        res.status(401).json({
            message: 'Not Authorized'
        })
    }
})

module.exports = { protect }