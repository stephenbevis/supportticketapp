// React
import React from 'react'

// Redux
import { useSelector } from 'react-redux'

// Chakra
import { Box, Heading, Text } from '@chakra-ui/react'

const Profile = () => {
    const { user } = useSelector(state => state.auth)

    return (
        <Box maxW='450px' mx='auto' my='10'>
            <Heading as='h1' mb='3'>{user.firstname} {user.lastname}</Heading>
            <Text fontSize='xl'>{user.email}</Text>
        </Box>
    )
}

export default Profile