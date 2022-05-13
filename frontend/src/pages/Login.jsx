// React
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Chakra
import { Box, Heading, Text, FormControl, FormLabel, Input, Button, Spinner } from '@chakra-ui/react'

// Toastify
import { toast } from 'react-toastify'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth)

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        // Redirect If Successful Login
        if(isSuccess || user){
            navigate('/')
        }

        dispatch(reset())
    }, [isError, isSuccess, user, message, navigate, dispatch])

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

    if(isLoading){
        return (
            <Box textAlign='center' mt='10'>
                <Spinner size='xl' />
            </Box>
        )
    }

    return (
        <Box mx='auto' my='10' maxW='450px' border='1px' borderColor='gray.300' p='5'>
            <Heading as='h2' textAlign='center' mb='2'><i class="fa-solid fa-lock"></i> Login</Heading>
            <Text textAlign='center' color='gray.600' fontSize='xl' mb='5'>Login to Your Account</Text>

            <form onSubmit={onSubmit}>
                <FormControl mb='4'>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input type="email" name='email' id='email' value={loginData && loginData.email} onInput={handleInput} placeholder='Email' required />
                </FormControl>

                <FormControl mb='8'>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input type="password" name='password' id='password' value={loginData && loginData.password} onInput={handleInput} placeholder='Password' required />
                </FormControl>

                <Button type='submit' colorScheme='teal'>Login</Button>
            </form>
        </Box>
    )
}

export default Login