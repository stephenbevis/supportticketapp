// Imports
const asyncHandler = require('express-async-handler')
const ErrorResponse = require('../utils/errorResponse')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Models
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc   Get User Tickets
// @route  Get /api/tickets
// @access Private

const getTickets = asyncHandler(async (req, res) => {
    // Get user using the id by using token
    const user = await User.findById(req.user.id)

    // If user isn't found
    if(!user){
        res.status(401).json({
            success: 'false',
            error: 'User not found'
        })

        throw new Error('User not found')
    }

    // If user is found, get tickets
    const tickets = await Ticket.find({user: req.user.id})

    res.status(200).json({
        success: true,
        data: tickets
    })
})

// @desc   Get User Ticket
// @route  Get /api/tickets/:id
// @access Private

const getTicket = asyncHandler(async (req, res) => {
    // Get user using the id by using token
    const user = await User.findById(req.user.id)

    // If user isn't found
    if(!user){
        res.status(401).json({
            success: 'false',
            error: 'User not found'
        })

        throw new Error('User not found')
    }

    // If user is found, get tickets
    const ticket = await Ticket.findById(req.params.id)

    // If ticket doesn't exist
    if(!ticket){
        res.status(404).json({
            success: 'false',
            error: 'Ticket not found'
        })

        throw new Error('Ticket not found')
    }

    // Limit who can access ticket
    if(ticket.user.toString() !== req.user.id){
        res.status(401).json({
            success: 'false',
            error: 'Not Authorized'
        })

        throw new Error('Not Authorized')
    }

    res.status(200).json({
        success: true,
        data: ticket
    })
})

// @desc   Create New Ticket
// @route  POST /api/tickets
// @access Private

const createTicket = asyncHandler(async (req, res) => {
    // Get product & description from req.body
    const { product, description } = req.body

    // If product & description aren't found
    if(!product || !description){
        res.status(400)
        throw new Error('Please add a product & description')
    }

    // Get user using the id by using token
    const user = await User.findById(req.user.id)

    // If user isn't found
    if(!user){
        res.status(401).json({
            success: 'false',
            error: 'User not found'
        })

        throw new Error('User not found')
    }

    // Create new ticket
    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new'
    })

    res.status(200).json({
        success: true,
        data: ticket
    })
})

// @desc   Update Ticket
// @route  PUT /api/tickets/:id
// @access Private

const updateTicket = asyncHandler(async (req, res) => {
    // Get user using the id by using token
    const user = await User.findById(req.user.id)

    // If user isn't found
    if(!user){
        res.status(401).json({
            success: 'false',
            error: 'User not found'
        })

        throw new Error('User not found')
    }

    // If user is found, get ticket
    const ticket = await Ticket.findById(req.params.id)

    // If ticket doesn't exist
    if(!ticket){
        res.status(404).json({
            success: 'false',
            error: 'Ticket not found'
        })

        throw new Error('Ticket not found')
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json({
        success: true,
        data: updatedTicket
    })
})

// @desc   Delete Ticket
// @route  DELETE /api/tickets/:id
// @access Private

const deleteTicket = asyncHandler(async (req, res) => {
    // Get user using the id by using token
    const user = await User.findById(req.user.id)

    // If user isn't found
    if(!user){
        res.status(401).json({
            success: 'false',
            error: 'User not found'
        })

        throw new Error('User not found')
    }

    // If user is found, get ticket
    const ticket = await Ticket.findById(req.params.id)

    // If ticket doesn't exist
    if(!ticket){
        res.status(404).json({
            success: 'false',
            error: 'Ticket not found'
        })

        throw new Error('Ticket not found')
    }

    // Limit who can delete ticket
    if(ticket.user.toString() !== req.user.id){
        res.status(401).json({
            success: 'false',
            error: 'Not Authorized'
        })

        throw new Error('Not Authorized')
    }

    // Delete ticket
    await ticket.remove() 

    res.status(200).json({
        success: true,
        data: ticket
    })
})

module.exports = {
    getTickets,
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket
}