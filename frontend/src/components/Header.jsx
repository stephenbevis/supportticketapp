// Imports
import { Link as ReactLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

// Chakra
import { Box, Flex, Spacer, Heading, Text, IconButton, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

// Components
import Container from './Container'

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())

        navigate('/login')
    }

    const {colorMode, toggleColorMode} = useColorMode()
 
    return (
        <Box py='3'>
            <Flex alignItems='center' maxW='450px' mx='auto'>
                <ReactLink to='/' className='text-dark text-decoration-none'><Heading as='h1' fontSize='2xl'>Support Desk</Heading></ReactLink>

                <Spacer />

                <Flex alignItems='center'>
                    <IconButton mr='4' icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon /> } isRound='true' onClick={toggleColorMode} />

                    {user && <ReactLink to='/profile'><i class="fa-solid fa-user-astronaut"></i> {user.firstname}</ReactLink>}

                    {user && <Text onClick={onLogout} ml='3'>Logout</Text>}

                    {!user && <ReactLink to='/login'>Login</ReactLink>}

                    {!user && <Box ml='3'><ReactLink to='/register'>Register</ReactLink></Box>}
                </Flex>
            </Flex>
        </Box>
    )
}

export default Header