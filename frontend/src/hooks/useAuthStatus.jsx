// React
import React, { useState, useEffect } from 'react'

// Redux
import { useSelector } from 'react-redux'

const useAuthStatus = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        user ? setIsLoggedIn(true) : setIsLoggedIn(false)

        setIsLoading(false)
    }, [user])

    return {
        isLoggedIn,
        isLoading
    }
}

export default useAuthStatus