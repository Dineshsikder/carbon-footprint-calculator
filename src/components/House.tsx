import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, FormControl, FormLabel, Select, Input, Heading, Text, useColorModeValue, VStack, HStack } from '@chakra-ui/react';
import { updateHouse } from '../store/actions';
import PaymentModal from './PaymentModal';

type GasUnit = 'kWh' | 'therms' | 'GBP';
type OilUnit = 'kWh' | 'litres' | 'tonnes' | 'us gallons';
type CoalUnit = 'kWh' | 'tonnes' | '10kg bags' | '20kg bags' | '25kg bags' | '50kg bags';
type LPGUnit = 'kWh' | 'litres' | 'tonnes' | 'us gallons';
type PropaneUnit = 'litres' | 'us gallons';
type WoodUnit = 'tonnes';

interface HouseData {
  electricity: number;
  gas: number;
  gasUnit: GasUnit;
  oil: number;
  oilUnit: OilUnit;
  coal: number;
  coalUnit: CoalUnit;
  lpg: number;
  lpgUnit: LPGUnit;
  propane: number;
  propaneUnit: PropaneUnit;
  wood: number;
  woodUnit: WoodUnit;
  water: number;
  people: number;
}

const House: React.FC = () => {
  const [houseData, setHouseData] = useState<HouseData>({
    electricity: 0,
    gas: 0,
    gasUnit: 'kWh',
    oil: 0,
    oilUnit: 'litres',
    coal: 0,
    coalUnit: 'kWh',
    lpg: 0,
    lpgUnit: 'litres',
    propane: 0,
    propaneUnit: 'litres',
    wood: 0,
    woodUnit: 'tonnes',
    water: 0,
    people: 1,
  });
  const [totalFootprint, setTotalFootprint] = useState<number>(0);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const unitConversions = {
    gas: {
      kWh: 1,
      therms: 29.3,
      GBP: 0.053,
    },
    oil: {
      kWh: 1,
      litres: 11.36,
      tonnes: 11630,
      'us gallons': 43.5,
    },
    coal: {
      kWh: 1,
      tonnes: 29307,
      '10kg bags': 293,
      '20kg bags': 586,
      '25kg bags': 733,
      '50kg bags': 1465,
    },
    lpg: {
      kWh: 1,
      litres: 7.09,
      tonnes: 7091,
      'us gallons': 26.8,
    },
    propane: {
      litres: 1,
      'us gallons': 3.785,
    },
    wood: {
      tonnes: 1,
    },
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setHouseData({
      ...houseData,
      [name]: name.includes('Unit') ? value : parseFloat(value),
    });
  };

  const calculateFootprint = () => {
    const gasInKWh = houseData.gas * unitConversions.gas[houseData.gasUnit];
    const oilInKWh = houseData.oil * unitConversions.oil[houseData.oilUnit];
    const coalInKWh = houseData.coal * unitConversions.coal[houseData.coalUnit];
    const lpgInKWh = houseData.lpg * unitConversions.lpg[houseData.lpgUnit];
    const propaneInLitres = houseData.propane * unitConversions.propane[houseData.propaneUnit];
    const woodInTonnes = houseData.wood * unitConversions.wood[houseData.woodUnit];

    const total =
      (houseData.electricity * 0.225 +
        gasInKWh * 0.2 +
        oilInKWh * 0.3 +
        coalInKWh * 2.2 +
        lpgInKWh * 1.5 +
        propaneInLitres * 1.5 +
        woodInTonnes * 1.8) /
      houseData.people;

    setTotalFootprint(total);
    dispatch(updateHouse(total));
  };

  const openPaymentModal = () => {
    setPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setPaymentModalOpen(false);
  };

  const backgroundColor = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Box p="6" bg={backgroundColor} color={textColor} rounded="md" shadow="md">
      <Heading as="h2" size="lg" mb="6">Household Carbon Footprint Calculator</Heading>
      <VStack spacing="4">
        <FormControl id="people">
          <FormLabel>How many people are in your household?</FormLabel>
          <Select name="people" value={houseData.people} onChange={handleInputChange}>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl id="electricity">
          <FormLabel>Electricity usage (kWh)</FormLabel>
          <Input type="number" name="electricity" onChange={handleInputChange} />
        </FormControl>
        <FormControl id="gas">
          <FormLabel>Natural gas usage</FormLabel>
          <HStack>
            <Input type="number" name="gas" onChange={handleInputChange} />
            <Select name="gasUnit" value={houseData.gasUnit} onChange={handleInputChange}>
              <option value="kWh">kWh</option>
              <option value="therms">therms</option>
              <option value="GBP">GBP</option>
            </Select>
          </HStack>
        </FormControl>
        <FormControl id="oil">
          <FormLabel>Heating oil usage</FormLabel>
          <HStack>
            <Input type="number" name="oil" onChange={handleInputChange} />
            <Select name="oilUnit" value={houseData.oilUnit} onChange={handleInputChange}>
              <option value="kWh">kWh</option>
              <option value="litres">litres</option>
              <option value="tonnes">tonnes</option>
              <option value="us gallons">us gallons</option>
            </Select>
          </HStack>
        </FormControl>
        <FormControl id="coal">
          <FormLabel>Coal usage</FormLabel>
          <HStack>
            <Input type="number" name="coal" onChange={handleInputChange} />
            <Select name="coalUnit" value={houseData.coalUnit} onChange={handleInputChange}>
              <option value="kWh">kWh</option>
              <option value="tonnes">tonnes</option>
              <option value="10kg bags">*10kg bags</option>
              <option value="20kg bags">*20kg bags</option>
              <option value="25kg bags">*25kg bags</option>
              <option value="50kg bags">*50kg bags</option>
            </Select>
          </HStack>
        </FormControl>
        <FormControl id="lpg">
          <FormLabel>LPG usage</FormLabel>
          <HStack>
            <Input type="number" name="lpg" onChange={handleInputChange} />
            <Select name="lpgUnit" value={houseData.lpgUnit} onChange={handleInputChange}>
              <option value="kWh">kWh</option>
              <option value="litres">litres</option>
              <option value="tonnes">tonnes</option>
              <option value="us gallons">us gallons</option>
            </Select>
          </HStack>
        </FormControl>
        <FormControl id="propane">
          <FormLabel>Propane usage</FormLabel>
          <HStack>
            <Input type="number" name="propane" onChange={handleInputChange} />
            <Select name="propaneUnit" value={houseData.propaneUnit} onChange={handleInputChange}>
              <option value="litres">litres</option>
              <option value="us gallons">us gallons</option>
            </Select>
          </HStack>
        </FormControl>
        <FormControl id="wood">
          <FormLabel>Wood usage</FormLabel>
          <HStack>
            <Input type="number" name="wood" onChange={handleInputChange} />
            <Select name="woodUnit" value={houseData.woodUnit} onChange={handleInputChange}>
              <option value="tonnes">tonnes</option>
            </Select>
          </HStack>
        </FormControl>
        <FormControl id="water" mb="4">
          <FormLabel>Water usage (gallons)</FormLabel>
          <Input type="number" name="water" onChange={handleInputChange} />
        </FormControl>
        <Button colorScheme="blue" onClick={calculateFootprint}>Calculate</Button>
        <Text fontSize="xl" mt="4">Total House Footprint = {totalFootprint.toFixed(2)} tonnes of CO2e</Text>
        <Button colorScheme="green" onClick={openPaymentModal}>Offset Now</Button>
      </VStack>
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={closePaymentModal}
        campaignTitle="Household Carbon Footprint Offset"
        onPaymentSuccess={() => console.log('Payment successful!')}
      />
    </Box>
  );
};

export default House;
