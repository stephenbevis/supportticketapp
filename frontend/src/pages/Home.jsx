import React, { useState } from 'react'

// Chakra
import {chakra, Box, Tabs, TabList, Tab, TabPanels, TabPanel, FormControl, FormLabel, Input, Button, Text, Textarea } from '@chakra-ui/react'

const Home = () => {
    const [customerData, setCustomerData] = useState({
        nameame: '',
        email: '',
        product: '',
        description: ''
    })

    const categories = [
        'New Ticket',
        'My Tickets'
    ]

    const onSubmit = (e) => {
        e.preventDefault()

        console.log('Submit')
    }

    const handleInput = (e) => {
        setCustomerData({
            ...customerData,
            [e.target.name]: e.target.value
        })
    }

    const CreateTicket = () => {
        return (
            <chakra.form onSubmit={onSubmit} my='5'>
                <FormControl mb='4'>
                    <FormLabel htmlFor="name">Customer Name</FormLabel>
                    <Input type="text" name='name' id='name' value={customerData && customerData.firstname} onInput={handleInput} placeholder='Customer Name' required />
                </FormControl>

                <FormControl mb='4'>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input type="email" name='email' id='email' value={customerData && customerData.email} onInput={handleInput} placeholder='Email' required />
                </FormControl>

                <FormControl mb='4'>
                    <FormLabel htmlFor="product">Product</FormLabel>
                    <Input type="text" name='product' id='product' value={customerData && customerData.product} onInput={handleInput} placeholder='Product' required />
                </FormControl>


                <FormLabel>Description</FormLabel>
                <Textarea name='description' id='description' value={customerData && customerData.description} onInput={handleInput} placeholder='Description' mb='8' required />

                <Button type='submit' colorScheme='teal'>Submit</Button>
            </chakra.form>
        )
    }

    return (
        <Box maxW='450px' my='10' mx='auto'>
            <Tabs>
                <TabList>
                    {categories.map(category => (
                        <Tab fontSize='xl' w='100%'>{category}</Tab>
                    ))}
                </TabList>

                <TabPanels>
                    <TabPanel px='0'>
                        <CreateTicket />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default Home