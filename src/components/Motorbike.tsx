import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, FormControl, FormLabel, Input, Heading, useColorModeValue } from '@chakra-ui/react';
import { updateMotorbike } from '../store/actions';

const Motorbike: React.FC = () => {
  const [motorbikeData, setMotorbikeData] = useState<{ miles: number }>({
    miles: 0,
  });
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMotorbikeData({
      ...motorbikeData,
      [e.target.name]: parseFloat(e.target.value),
    });
  };

  const calculateFootprint = () => {
    const total = motorbikeData.miles * 0.282;
    dispatch(updateMotorbike(total));
  };

  const backgroundColor = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Box p="6" bg={backgroundColor} color={textColor} rounded="md" shadow="md">
      <Heading as="h2" size="lg" mb="6">Motorbike Carbon Footprint</Heading>
      <FormControl id="miles" mb="4">
        <FormLabel>Miles driven</FormLabel>
        <Input type="number" name="miles" onChange={handleInputChange} />
      </FormControl>
      <Button colorScheme="blue" onClick={calculateFootprint}>Calculate</Button>
    </Box>
  );
};

export default Motorbike;
