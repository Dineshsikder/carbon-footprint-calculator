import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  useColorModeValue,
  Radio,
  RadioGroup,
  Text,
  Stack,
  Checkbox,
  HStack,
  Select,
  Input,
  VStack,
  List,
  ListItem,
} from '@chakra-ui/react';
import { updateFlight } from '../store/actions';
import PaymentModal from './PaymentModal';

const Flight: React.FC = () => {
  const [flightData, setFlightData] = useState({
    from: "",
    to: "",
    via: "",
    class: "Economy",
    trips: 1,
    includeRadiativeForcing: false,
    shortHaul: 0,
    longHaul: 0,
    flightType: "Return",
    totalFootprint: 0,
  });

  const [fromSearchResults, setFromSearchResults] = useState<any[]>([]);
  const [toSearchResults, setToSearchResults] = useState<any[]>([]);
  const [viaSearchResults, setViaSearchResults] = useState<any[]>([]);
  const [inputFields, setInputFields] = useState({ from: "", to: "", via: "" });
  const [isPaymentModalOpen, setPaymentModalOpen] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFlightData({
      ...flightData,
      [name]: name === "trips" ? parseInt(value) : value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlightData({
      ...flightData,
      [e.target.name]: e.target.checked,
    });
  };

  const handleRadioChange = (value: string) => {
    setFlightData({
      ...flightData,
      flightType: value,
    });
  };

  const openPaymentModal = () => {
    setPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setPaymentModalOpen(false);
  };

  const calculateFootprint = () => {
    let total = flightData.trips * (flightData.shortHaul * 0.15 + flightData.longHaul * 0.25);

    if (flightData.class === "Business") total *= 1.5;
    else if (flightData.class === "First") total *= 2.0;
    else if (flightData.class === "Premium Economy") total *= 1.3;

    if (flightData.includeRadiativeForcing) total *= 1.9;

    if (flightData.flightType === "Return") total *= 2;

    setFlightData({
      ...flightData,
      totalFootprint: total,
    });

    dispatch(updateFlight(total));
  };

  const searchLocation = async (query: string, field: string) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
    const data = await response.json();
    
    if (field === 'from') {
      setFromSearchResults(data);
    } else if (field === 'to') {
      setToSearchResults(data);
    } else if (field === 'via') {
      setViaSearchResults(data);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const query = e.target.value;
    setInputFields({ ...inputFields, [field]: query });
    if (query.length > 2) {
      searchLocation(query, field);
    } else {
      if (field === 'from') setFromSearchResults([]);
      if (field === 'to') setToSearchResults([]);
      if (field === 'via') setViaSearchResults([]);
    }
  };

  const handleSearchResultClick = (result: any, field: string) => {
    const location = result.display_name;
    setInputFields({ ...inputFields, [field]: location });
    setFlightData({
      ...flightData,
      [field]: location,
    });

    if (field === 'from') setFromSearchResults([]);
    if (field === 'to') setToSearchResults([]);
    if (field === 'via') setViaSearchResults([]);
  };

  const backgroundColor = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Box p="6" bg={backgroundColor} color={textColor} rounded="md" shadow="md">
      <Heading as="h2" size="lg" mb="6">Flight Carbon Footprint Calculator</Heading>
      <RadioGroup onChange={handleRadioChange} value={flightData.flightType} mb="4">
        <Stack direction="row">
          <Radio value="Return">Return trip</Radio>
          <Radio value="One-way">One-way flight</Radio>
        </Stack>
      </RadioGroup>

      <FormControl id="from" mb="4">
        <FormLabel>From:</FormLabel>
        <Input
          placeholder="Search location"
          value={inputFields.from}
          onChange={(e) => handleSearch(e, 'from')}
        />
        <VStack align="stretch">
          {fromSearchResults.map((result) => (
            <List key={result.place_id}>
              <ListItem
                cursor="pointer"
                onClick={() => handleSearchResultClick(result, 'from')}
              >
                {result.display_name}
              </ListItem>
            </List>
          ))}
        </VStack>
      </FormControl>

      <FormControl id="to" mb="4">
        <FormLabel>To:</FormLabel>
        <Input
          placeholder="Search location"
          value={inputFields.to}
          onChange={(e) => handleSearch(e, 'to')}
        />
        <VStack align="stretch">
          {toSearchResults.map((result) => (
            <List key={result.place_id}>
              <ListItem
                cursor="pointer"
                onClick={() => handleSearchResultClick(result, 'to')}
              >
                {result.display_name}
              </ListItem>
            </List>
          ))}
        </VStack>
      </FormControl>

      <FormControl id="via" mb="4">
        <FormLabel>Via (optional):</FormLabel>
        <Input
          placeholder="Search location"
          value={inputFields.via}
          onChange={(e) => handleSearch(e, 'via')}
        />
        <VStack align="stretch">
          {viaSearchResults.map((result) => (
            <List key={result.place_id}>
              <ListItem
                cursor="pointer"
                onClick={() => handleSearchResultClick(result, 'via')}
              >
                {result.display_name}
              </ListItem>
            </List>
          ))}
        </VStack>
      </FormControl>

      <FormControl id="class" mb="4">
        <FormLabel>Class:</FormLabel>
        <Select name="class" value={flightData.class} onChange={handleInputChange}>
          <option value="Economy">Economy class</option>
          <option value="Premium Economy">Premium Economy</option>
          <option value="Business">Business class</option>
          <option value="First">First class</option>
        </Select>
      </FormControl>

      <FormControl id="trips" mb="4">
        <FormLabel>Trips:</FormLabel>
        <Input type="number" name="trips" value={flightData.trips} onChange={handleInputChange} min={1} />
      </FormControl>

      <Checkbox
        name="includeRadiativeForcing"
        isChecked={flightData.includeRadiativeForcing}
        onChange={handleCheckboxChange}
        mb="4"
      >
        Tick to include radiative forcing
      </Checkbox>

      <HStack spacing="4" mb="4">
        <FormControl id="shortHaul">
          <FormLabel>Short-haul flights (hours)</FormLabel>
          <Input type="number" name="shortHaul" onChange={handleInputChange} />
        </FormControl>
        <FormControl id="longHaul">
          <FormLabel>Long-haul flights (hours)</FormLabel>
          <Input type="number" name="longHaul" onChange={handleInputChange} />
        </FormControl>
      </HStack>

      <Button colorScheme="blue" onClick={calculateFootprint}>Calculate</Button>
      <Text fontSize="xl" mt="4">Total Flights Footprint = {flightData.totalFootprint.toFixed(2)} tonnes of CO2e</Text>
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

export default Flight;
