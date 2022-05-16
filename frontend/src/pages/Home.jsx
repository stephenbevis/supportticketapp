// React
import React, { useState } from 'react'

// Chakra
import {Box, Tabs, TabList, Tab, TabPanels, TabPanel, Text } from '@chakra-ui/react'

// Components
import CreateTicket from '../components/CreateTicket'

const categories = [
    'My Tickets',
    'New Ticket'
]

const Home = () => {
    const [currentTab, setCurrentTab] = useState(0)

    // onChange to set tabs potentially
    return (
        <Box w='90%' maxW='450px' my='3' mx='auto'>
            <Tabs onChange={index => setCurrentTab(index)} index={currentTab}>
                <TabList>
                    {categories.map(category => (
                        <Tab fontSize='xl' w='100%'>{category}</Tab>
                    ))}
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Text textAlign='center' color='gray.600' fontSize='xl'>No Active Tickets</Text>
                    </TabPanel>

                    <TabPanel px='0'>
                        <CreateTicket setCurrentTab={setCurrentTab} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default Home