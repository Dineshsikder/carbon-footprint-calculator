import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box, Button, FormControl, FormLabel, Input, Heading, useColorModeValue, Select as ChakraSelect, Text, HStack, useColorMode,
} from '@chakra-ui/react';
import ReactSelect from 'react-select';
import { updateCar } from '../store/actions';
import PaymentModal from './PaymentModal';

const Car: React.FC = () => {
  const { colorMode } = useColorMode();
  
  const [carData, setCarData] = useState({
    mileage: 0,
    mileageUnit: 'miles',
    brand: '',
    model: '',
    year: '',
    efficiency: '',
    efficiencyUnit: 'mpg (US)',
    fuelType: 'petrol',
  });

  const [totalFootprint, setTotalFootprint] = useState(0);
  const [makes, setMakes] = useState<{ label: string; value: string }[]>([]);
  const [models, setModels] = useState<{ label: string; value: string }[]>([]);
  const [years, setYears] = useState<{ label: string; value: string }[]>([]);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchMakes();
    fetchYears();
  }, []);

  const fetchMakes = async () => {
    try {
      const response = await fetch('https://fueleconomy.gov/ws/rest/vehicle/menu/make?year=2022');
      const textData = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(textData, 'application/xml');
      const makeOptions = Array.from(xml.getElementsByTagName('menuItem')).map((item) => ({
        label: item.getElementsByTagName('value')[0].textContent!,
        value: item.getElementsByTagName('value')[0].textContent!,
      }));
      setMakes(makeOptions);
    } catch (error) {
      console.error("Failed to fetch vehicle makes:", error);
      alert("There was an error fetching vehicle makes. Please try again later.");
    }
  };

  const fetchYears = async () => {
    try {
      const response = await fetch('https://fueleconomy.gov/ws/rest/vehicle/menu/year');
      const textData = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(textData, 'application/xml');
      const yearOptions = Array.from(xml.getElementsByTagName('menuItem')).map((item) => ({
        label: item.getElementsByTagName('value')[0].textContent!,
        value: item.getElementsByTagName('value')[0].textContent!,
      }));
      setYears(yearOptions);
    } catch (error) {
      console.error("Failed to fetch vehicle years:", error);
      alert("There was an error fetching vehicle years. Please try again later.");
    }
  };

  const handleYearChange = async (selectedOption: any) => {
    setCarData({ ...carData, year: selectedOption.value });
    fetchMakes();
  };

  const handleMakeChange = async (selectedOption: any) => {
    setCarData({ ...carData, brand: selectedOption.value });
    fetchModels(selectedOption.value, carData.year);
  };

  const fetchModels = async (make: string, year: string) => {
    try {
      const encodedMake = encodeURIComponent(make);
      const response = await fetch(`https://fueleconomy.gov/ws/rest/vehicle/menu/model?year=${year}&make=${encodedMake}`);
      const textData = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(textData, 'application/xml');
      const modelOptions = Array.from(xml.getElementsByTagName('menuItem')).map((item) => ({
        label: item.getElementsByTagName('value')[0].textContent!,
        value: item.getElementsByTagName('value')[0].textContent!,
      }));
      setModels(modelOptions);
    } catch (error) {
      console.error("Failed to fetch vehicle models:", error);
      alert("There was an error fetching vehicle models. Please try again later.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCarData({
      ...carData,
      [e.target.name]: e.target.value,
    });
  };

  const openPaymentModal = () => {
    setPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setPaymentModalOpen(false);
  };

  const calculateFootprint = () => {
    let mileage = parseFloat(carData.mileage.toString());
    let efficiency = parseFloat(carData.efficiency.toString());

    // Convert mileage to miles if it's in kilometers
    if (carData.mileageUnit === 'km') {
      mileage = mileage * 0.621371; // Convert km to miles
    }

    let total = 0;

    // Adjust calculations based on the efficiency unit
    if (carData.efficiencyUnit.includes('mpg')) {
      // Calculate footprint based on efficiency in mpg
      total = (mileage / efficiency) * 0.411;
    } else if (carData.efficiencyUnit.includes('g/km')) {
      total = (mileage * efficiency * 0.000001) * 0.411;
    } else if (carData.efficiencyUnit.includes('L/100km')) {
      total = (mileage * efficiency * 0.01) * 2.352145833; // Convert L/100km to mpg (US)
      total *= 0.411;
    }

    setTotalFootprint(total);
    dispatch(updateCar(total));
  };

  const backgroundColor = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  
  // Custom styles for ReactSelect based on color mode
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: colorMode === 'dark' ? '#2D3748' : '#EDF2F7',
      borderColor: colorMode === 'dark' ? '#4A5568' : '#CBD5E0',
      color: colorMode === 'dark' ? '#E2E8F0' : '#2D3748',
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: colorMode === 'dark' ? '#2D3748' : '#EDF2F7',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: colorMode === 'dark' ? '#E2E8F0' : '#2D3748',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? colorMode === 'dark' ? '#4A5568' : '#E2E8F0'
        : colorMode === 'dark' ? '#2D3748' : '#EDF2F7',
      color: colorMode === 'dark' ? '#E2E8F0' : '#2D3748',
    }),
  };

  return (
    <Box p="6" bg={backgroundColor} color={textColor} rounded="md" shadow="md">
      <Heading as="h2" size="lg" mb="6">Car Carbon Footprint Calculator</Heading>
      
      <FormControl id="mileage" mb="4">
        <FormLabel>Mileage:</FormLabel>
        <HStack>
          <Input type="number" name="mileage" value={carData.mileage} onChange={handleInputChange} />
          <ChakraSelect name="mileageUnit" value={carData.mileageUnit} onChange={handleInputChange}>
            <option value="miles">miles</option>
            <option value="km">km</option>
          </ChakraSelect>
        </HStack>
      </FormControl>

      <FormControl id="year" mb="4">
        <FormLabel>Choose Year:</FormLabel>
        <ReactSelect
          options={years}
          onChange={handleYearChange}
          placeholder="Select a year"
          styles={customStyles}
        />
      </FormControl>

      <FormControl id="brand" mb="4">
        <FormLabel>Choose Make:</FormLabel>
        <ReactSelect
          options={makes}
          onChange={handleMakeChange}
          placeholder="Select a make"
          styles={customStyles}
        />
      </FormControl>

      <FormControl id="model" mb="4">
        <FormLabel>Choose Model:</FormLabel>
        <ReactSelect
          options={models}
          onChange={(selectedOption: any) => setCarData({ ...carData, model: selectedOption.value })}
          placeholder="Select a model"
          styles={customStyles}
        />
      </FormControl>

      <FormControl id="efficiency" mb="4">
        <FormLabel>Or enter efficiency:</FormLabel>
        <HStack>
          <Input type="number" name="efficiency" value={carData.efficiency} onChange={handleInputChange} />
          <ChakraSelect name="efficiencyUnit" value={carData.efficiencyUnit} onChange={handleInputChange}>
            <option value="g/km">g/km</option>
            <option value="L/100km">L/100km</option>
            <option value="mpg (UK)">mpg (UK)</option>
            <option value="mpg (US)">mpg (US)</option>
          </ChakraSelect>
          <ChakraSelect name="fuelType" value={carData.fuelType} onChange={handleInputChange}>
            <option value="petrol">petrol</option>
            <option value="diesel">diesel</option>
            <option value="lpg">lpg</option>
            <option value="cng">cng</option>
          </ChakraSelect>
        </HStack>
      </FormControl>

      <Button colorScheme="blue" onClick={calculateFootprint}>Calculate</Button>
      
      <Text fontSize="xl" mt="4">Total Car Footprint = {totalFootprint.toFixed(2)} tonnes of CO2e</Text>
      <Button colorScheme="green" mt="4" onClick={openPaymentModal}>Offset Now</Button>
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={closePaymentModal}
        campaignTitle="Household Carbon Footprint Offset"
        onPaymentSuccess={() => console.log('Payment successful!')}
      />
    </Box>
  );
};

export default Car;
