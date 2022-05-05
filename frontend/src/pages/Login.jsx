// React
import React, { useState } from 'react'

// Toastify
import { toast } from 'react-toastify'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice'

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const dispatch = useDispatch()
    const { user, isLoading, isSuccess, message } = useSelector(state => state.auth)

    const handleInput = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email: loginData.email,
            password: loginData.password
        }

        dispatch(login(userData))
    }

    return (
        <section aria-label='Login to an account' style={{ width: '100%', maxWidth: '325px', margin: '0 auto' }} className='border p-3'>
            <h2 className='text-center'><i class="fa-solid fa-lock"></i> Login</h2>
            <p className='lead text-center'>Login to Your Account</p>

            <form onSubmit={onSubmit}>
                <div class="mb-3">
                    <label htmlFor="email" className='form-label'>Email</label>
                    <input className='form-control' type="email" name='email' id='email' value={loginData && loginData.email} onInput={handleInput} placeholder='Email' required />
                </div>

                <div class="mb-4">
                    <label htmlFor="password" className='form-label'>Password</label>
                    <input className='form-control' type="password" name='password' id='password' value={loginData && loginData.password} onInput={handleInput} placeholder='Password' required />
                </div>

                <button className="btn btn-primary rounded-0 d-block w-100">Login</button>
            </form>
        </section>
    )
}

export default Login