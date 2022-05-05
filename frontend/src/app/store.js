import { configureStore } from '@reduxjs/toolkit'

// Reducers
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})