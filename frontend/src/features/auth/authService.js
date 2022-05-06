import axios from 'axios'

const REGISTER_URL = '/api/users'
const LOGIN_URL = '/api/users/login'

// Register User
const register = async (userData) => {
    const response = await axios.post(REGISTER_URL, userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Login User
const login = async (userData) => {
    const response = await axios.post(LOGIN_URL, userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Logout
const logout = () => localStorage.removeItem('user')

const authService = {
    register,
    login,
    logout
}

export default authService