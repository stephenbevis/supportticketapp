// React
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Register = () => {
    const [registerData, setRegisterData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password2: ''
    })

    const handleInput = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(registerData.password !== registerData.password2){
            toast.error('Passwords do not match')
        }
    }

    return (
        <section aria-label='Register an account' style={{ width: '100%', maxWidth: '325px', margin: '0 auto' }} className='border p-3'>
            <h2 className='text-center'><i class="fa-solid fa-user-astronaut"></i> Register</h2>
            <p className='lead text-center'>Create an Account</p>

            <form onSubmit={onSubmit}>
                <div class="mb-3">
                    <label htmlFor="firstname" className='form-label'>Firstname</label>
                    <input className='form-control' type="text" name='firstname' id='firstname' value={registerData && registerData.firstname} onInput={handleInput} placeholder='Firstname' required />
                </div>

                <div class="mb-3">
                    <label htmlFor="lastname" className='form-label'>Lastname</label>
                    <input className='form-control' type="text" name='lastname' id='lastname' value={registerData && registerData.lastname} onInput={handleInput} placeholder='Lastname' required />
                </div>

                <div class="mb-3">
                    <label htmlFor="email" className='form-label'>Email</label>
                    <input className='form-control' type="email" name='email' id='email' value={registerData && registerData.email} onInput={handleInput} placeholder='Email' required />
                </div>

                <div class="mb-3">
                    <label htmlFor="password" className='form-label'>Password</label>
                    <input className='form-control' type="password" name='password' id='password' value={registerData && registerData.password} onInput={handleInput} placeholder='Password' required />
                </div>

                <div class="mb-4">
                    <label htmlFor="confirm-password" className='form-label'>Confirm Password</label>
                    <input className='form-control' type="password" name='password2' id='confirm-password' value={registerData && registerData.password2} onInput={handleInput} placeholder='Confirm Password' required />
                </div>

                <button className="btn btn-primary rounded-0 d-block w-100">Register</button>
            </form>
        </section>
    )
}

export default Register