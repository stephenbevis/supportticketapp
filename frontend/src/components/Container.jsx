import React from 'react'

// Chakra
import { Box } from '@chakra-ui/react'

const Container = ({children}) => {
    return (
        <Box w={['100%', '90%', '80%', '68%']} mx='auto'>{children}</Box>
    )
}

export default Container