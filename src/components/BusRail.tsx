import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, FormControl, FormLabel, Input, Heading, useColorModeValue } from '@chakra-ui/react';
import { updateBusRail } from '../store/actions';

const BusRail: React.FC = () => {
  const [busRailData, setBusRailData] = useState<{ busMiles: number; railMiles: number }>({
    busMiles: 0,
    railMiles: 0,
  });
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusRailData({
      ...busRailData,
      [e.target.name]: parseFloat(e.target.value),
    });
  };

  const calculateFootprint = () => {
    const total = busRailData.busMiles * 0.1 + busRailData.railMiles * 0.05;
    dispatch(updateBusRail(total));
  };

  const backgroundColor = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Box p="6" bg={backgroundColor} color={textColor} rounded="md" shadow="md">
      <Heading as="h2" size="lg" mb="6">Bus & Rail Carbon Footprint</Heading>
      <FormControl id="busMiles" mb="4">
        <FormLabel>Bus miles driven</FormLabel>
        <Input type="number" name="busMiles" onChange={handleInputChange} />
      </FormControl>
      <FormControl id="railMiles" mb="4">
        <FormLabel>Rail miles driven</FormLabel>
        <Input type="number" name="railMiles" onChange={handleInputChange} />
      </FormControl>
      <Button colorScheme="blue" onClick={calculateFootprint}>Calculate</Button>
    </Box>
  );
};

export default BusRail;
