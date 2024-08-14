import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react';
import House from './House';
import Flight from './Flight';
import Car from './Car';
import Motorbike from './Motorbike';
import BusRail from './BusRail';

const Calculator: React.FC = () => {
  return (
    <Box p={4}>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>House</Tab>
          <Tab>Flight</Tab>
          <Tab>Car</Tab>
          <Tab>Motorbike</Tab>
          <Tab>Bus & Rail</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <House />
          </TabPanel>
          <TabPanel>
            <Flight />
          </TabPanel>
          <TabPanel>
            <Car />
          </TabPanel>
          <TabPanel>
            <Motorbike />
          </TabPanel>
          <TabPanel>
            <BusRail />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Calculator;
