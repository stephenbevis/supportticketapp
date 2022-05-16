// React
import React, { useState, useEffect } from 'react'

// Redux
import { useSelector, useDispatch } from 'react-redux'

// React Router
import { useNavigate } from 'react-router-dom'

// Toastify
import { toast } from 'react-toastify'

// Imports
import { createTicket, reset } from '../features/tickets/ticketSlice'

// Chakra
import { chakra, Heading, Text, Box, FormControl, FormLabel, Input, Button, Textarea, Select, Spinner } from '@chakra-ui/react'

const CreateTicket = (props) => {
    const { user } = useSelector(state => state.auth)
    const { isLoading, isError, isSuccess, message } = useSelector(state => state.ticket)

    const [customerData, setCustomerData] = useState({
        name: `${user && user.firstname} ${user && user.lastname}` || null,
        email: user && user.email || null,
        product: '',
        description: ''
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            dispatch(reset())
            toast.success(message)
        }

        dispatch(reset())
    }, [dispatch, isError, isSuccess, navigate, message])

    const onSubmit = (e) => {
        e.preventDefault()

        setCustomerData({
            name: `${user && user.firstname} ${user && user.lastname}` || null,
            email: user && user.email || null,
            product: '',
            description: ''
        })

        dispatch(createTicket({
            product: customerData.product,
            description: customerData.description
        }))

        props.setCurrentTab(0)
    }

    const handleInput = (e) => {
        setCustomerData({
            ...customerData,
            [e.target.name]: e.target.value
        })
    }

    // Services
    const services = [
        'Select One...',
        'Microsoft Teams',
        'Zoom',
        'Email',
        'Microsoft Office'
    ]

    if (isLoading) {
        return (
            <Box textAlign='center' mt='10'>
                <Spinner size='xl' />
            </Box>
        )
    }

    return (
        <>
            <Heading as='h2'>{user && user.firstname} {user && user.lastname}</Heading>
            <Text mb='8'>{user && user.email}</Text>

            <chakra.form onSubmit={onSubmit} my='2'>
                <FormControl mb='4'>
                    <FormLabel htmlFor="product">Product</FormLabel>
                    <Select name='product' id='product' value={customerData && customerData.product} onChange={handleInput}>
                        {services.map(service => (
                            <option value={service}>{service}</option>
                        ))}
                    </Select>
                </FormControl>

                <FormLabel>Description</FormLabel>
                <Textarea name='description' id='description' value={customerData && customerData.description} onInput={handleInput} placeholder='Description' mb='8' required />

                <Button type='submit' colorScheme='teal'>Submit</Button>
            </chakra.form>
        </>
    )
}

export default CreateTicket