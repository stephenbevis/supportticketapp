import { configureStore } from '@reduxjs/toolkit'

// Reducers
import authReducer from '../features/auth/authSlice'
import ticketReducer from '../features/tickets/ticketSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        ticket: ticketReducer
    }
})