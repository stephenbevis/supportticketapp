// React
import React, { useState, useEffect } from 'react'
import { Link as ReactLink, useNavigate } from 'react-router-dom'

// Chakra
import { chakra, Box, Flex, Heading, Text, FormControl, FormLabel, Input, Button, Spinner } from '@chakra-ui/react'

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
        <Box mx='auto' my='3' w='90%' maxW='450px'>
            <Heading as='h2' textAlign='center' mb='2'><i className="fa-solid fa-lock"></i> Login</Heading>
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

                <Flex alignItems='center'>
                    <Button type='submit' colorScheme='teal' mr='5'>Login</Button>
                    <Text>Need an account? <ReactLink to='/register'><chakra.span textDecoration='underline' cursor='pointer'>Register Here</chakra.span></ReactLink></Text>
                </Flex>
            </form>
        </Box>
    )
}

export default Login