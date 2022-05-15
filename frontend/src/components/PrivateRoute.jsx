// React
import React from 'react'

// React Router
import { Navigate, Outlet } from 'react-router-dom'

// Custom Hooks
import isAuthStatus from '../hooks/useAuthStatus'

// Chakra
import { Box, Spinner } from '@chakra-ui/react'

const PrivateRoute = () => {
    const { isLoggedIn, isLoading } = isAuthStatus()

    if(isLoading){
        return (
            <Box textAlign='center' mt='10'>
                <Spinner size='xl' />
            </Box>
        )
    }

    return isLoggedIn ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute