// React
import React, { useState, useEffect } from 'react'
import { Link as ReactLink, useNavigate } from 'react-router-dom'

// Chakra
import { chakra, Box, Flex, Heading, Text, FormControl, FormLabel, Input, Button, Spinner } from '@chakra-ui/react'

// Toastify
import { toast } from 'react-toastify'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'

const Register = () => {
    const [registerData, setRegisterData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password2: ''
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
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(registerData.password !== registerData.password2){
            toast.error('Passwords do not match')
        } else {
            const userData = {
                firstname: registerData.firstname,
                lastname: registerData.lastname,
                email: registerData.email,
                password: registerData.password
            }

            dispatch(register(userData))
        }
    }

    if(isLoading){
        return (
            <div className="text-center">
                <Spinner />
            </div>
        )
    }

    return (
        <Box mx='auto' my='3' w='90%' maxW='450px'>
            <Heading as='h2' textAlign='center' mb='2'><i class="fa-solid fa-user-astronaut"></i> Register</Heading>
            <Text textAlign='center' color='gray.600' fontSize='xl' mb='5'>Create An Account</Text>

            <form onSubmit={onSubmit}>
                <FormControl mb='4'>
                    <FormLabel htmlFor="firstname">Firstname</FormLabel>
                    <Input type="text" name='firstname' id='firstname' value={registerData && registerData.firstname} onInput={handleInput} placeholder='Firstname' required />
                </FormControl>

                <FormControl mb='4'>
                    <FormLabel htmlFor="lastname" className='form-label'>Lastname</FormLabel>
                    <Input type="text" name='lastname' id='lastname' value={registerData && registerData.lastname} onInput={handleInput} placeholder='Lastname' required />
                </FormControl>

                <FormControl mb='4'>
                    <FormLabel htmlFor="email" className='form-label'>Email</FormLabel>
                    <Input type="email" name='email' id='email' value={registerData && registerData.email} onInput={handleInput} placeholder='Email' required />
                </FormControl>

                <FormControl mb='4'>
                    <FormLabel htmlFor="password" className='form-label'>Password</FormLabel>
                    <Input type="password" name='password' id='password' value={registerData && registerData.password} onInput={handleInput} placeholder='Password' required />
                </FormControl>

                <FormControl mb='8'>
                    <FormLabel htmlFor="confirm-password" className='form-label'>Confirm Password</FormLabel>
                    <Input type="password" name='password2' id='confirm-password' value={registerData && registerData.password2} onInput={handleInput} placeholder='Confirm Password' required />
                </FormControl>

                <Flex alignItems='center'>
                    <Button type='submit' colorScheme='teal' mr='5'>Register</Button>
                    <Text>Have an account? <ReactLink to='/login'><chakra.span textDecoration='underline' cursor='pointer'>Login</chakra.span></ReactLink></Text>
                </Flex>
            </form>
        </Box>
    )
}

export default Register