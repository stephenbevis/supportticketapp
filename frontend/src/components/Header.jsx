// Imports
import { Link as ReactLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset, deleteUser } from '../features/auth/authSlice'

// Chakra
import { Box, Flex, Spacer, Heading, Button, Text, IconButton, useColorMode, Avatar, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react'
import { MoonIcon, SunIcon, ChevronDownIcon } from '@chakra-ui/icons'

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)

    const onLogout = async () => {
        await dispatch(logout())
        await dispatch(reset())

        navigate('login')
    }

    const onDelete = async () => {
        await dispatch(deleteUser())
        navigate('login')
    }

    const {colorMode, toggleColorMode} = useColorMode()
 
    return (
        <Box py='3'>
            <Flex alignItems='center' w='90%' maxW='450px' mx='auto' pb='3' borderBottom='1px' borderColor='gray.300'>
                <ReactLink to='/'><Heading as='h1' fontSize='2xl'>Support Desk</Heading></ReactLink>

                <Spacer />

                <Flex alignItems='center'>
                    {user && 
                        <Menu>
                            <MenuButton as={Button} variant px='0' rightIcon={<ChevronDownIcon />}>
                                <Avatar size='sm' name={`${user.firstname} ${user.lastname}`} />
                            </MenuButton>

                            <MenuList>
                                <MenuItem onClick={onLogout}>
                                    <Text>Logout</Text>
                                </MenuItem>
                                <MenuDivider />
                                <MenuItem onClick={toggleColorMode}>
                                    <Text>{colorMode === 'light' ? <MoonIcon mr='1' /> : <SunIcon mr='1' />} {colorMode === 'light' ? 'Dark' : 'Light' } Mode</Text>
                                </MenuItem>
                                <MenuDivider />
                                <MenuItem>
                                    <Text onClick={onDelete}>Delete Account</Text>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    }

                    {/* {user && <ReactLink to='/profile'><i class="fa-solid fa-user-astronaut"></i> {user.firstname}</ReactLink>} */}

                    {!user && <ReactLink to='/login'><Button colorScheme='teal'>Login</Button></ReactLink>}
                </Flex>
            </Flex>
        </Box>
    )
}

export default Header