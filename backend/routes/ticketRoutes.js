// Imports
const express = require('express')
const router = express.Router()

// Controllers
const { getTickets, getTicket, createTicket, updateTicket, deleteTicket } = require('../controllers/ticketController')

// Middleware
const { protect } = require('../middleware/auth')

router.route('/')
    .get(protect, getTickets)
    .post(protect, createTicket)

router.route('/:id')
    .get(protect, getTicket)
    .put(protect, updateTicket)
    .delete(protect, deleteTicket)

module.exports = router