import axios from 'axios'

const REGISTER_URL = '/api/users'
const LOGIN_URL = '/api/users/login'
const USER_URL = '/api/user'

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

// Delete User
const deleteUser = async (userData) => {
    const response = await axios.delete(USER_URL, userData)

    return response.data
}

// Logout
const logout = () => localStorage.removeItem('user')

const authService = {
    register,
    login,
    logout,
    deleteUser
}

export default authService