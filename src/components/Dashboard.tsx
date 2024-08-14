import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box, Text, Heading, Stack, VStack, HStack, Image, Divider, useColorMode, useColorModeValue, Link, Button, Collapse, IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import PaymentModal from './PaymentModal';

interface CarbonFootprintState {
  house: number;
  flight: number;
  car: number;
  motorbike: number;
  busRail: number;
}

interface Campaign {
  title: string;
  shortDescription: string;
  details: string;
}

const campaigns: Campaign[] = [
  {
    title: "Reforestation in the Amazon",
    shortDescription: "Help us plant trees in the Amazon to combat deforestation and climate change.",
    details: "This campaign focuses on replanting trees in the deforested areas of the Amazon. By supporting this campaign, you're helping to restore vital ecosystems that are home to thousands of species, absorb carbon dioxide, and regulate our planet's climate.",
  },
  {
    title: "Ocean Cleanup Initiative",
    shortDescription: "Join our efforts to clean up plastic waste from our oceans.",
    details: "The Ocean Cleanup Initiative is dedicated to removing plastic waste from the world's oceans. Your support helps fund innovative technologies that collect and recycle ocean plastic, protecting marine life and preserving water quality.",
  },
  {
    title: "Renewable Energy for Rural Communities",
    shortDescription: "Support the transition to renewable energy in underdeveloped regions.",
    details: "This campaign provides renewable energy solutions to rural communities lacking access to clean electricity. By donating, you help install solar panels and wind turbines, reducing dependency on fossil fuels and promoting sustainable development.",
  },
];

const Dashboard: React.FC = () => {
  const house = useSelector((state: CarbonFootprintState) => state.house);
  const flight = useSelector((state: CarbonFootprintState) => state.flight);
  const car = useSelector((state: CarbonFootprintState) => state.car);
  const motorbike = useSelector((state: CarbonFootprintState) => state.motorbike);
  const busRail = useSelector((state: CarbonFootprintState) => state.busRail);

  const totalFootprint = house + flight + car + motorbike + busRail;

  const [expandedCampaign, setExpandedCampaign] = useState<number | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const handleToggle = (index: number) => {
    setExpandedCampaign(expandedCampaign === index ? null : index);
  };

  const handleDonateClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    onOpen();
  };

  const backgroundColor = useColorModeValue('green.50', 'gray.800');
  const textColor = useColorModeValue('green.800', 'white');
  const sectionBgColor = useColorModeValue('white', 'gray.700');
  const campaignBgColor = useColorModeValue('gray.100', 'gray.600');

  return (
    <Box p={{ base: 4, md: 6 }} bg={backgroundColor} color={textColor} rounded="md" shadow="md">
      <Heading as="h2" size="xl" mb={6} textAlign="center">
        Carbon Footprint Dashboard
      </Heading>
      <Stack spacing="8">
        <Box bg={sectionBgColor} p="6" rounded="md" shadow="sm">
          <Heading as="h3" size="lg" mb="6" fontWeight="semibold">
            Your Carbon Footprint
          </Heading>
          <Text fontSize="xl">House: {house.toFixed(2)} tonnes of CO2e</Text>
          <Text fontSize="xl">Flight: {flight.toFixed(2)} tonnes of CO2e</Text>
          <Text fontSize="xl">Car: {car.toFixed(2)} tonnes of CO2e</Text>
          <Text fontSize="xl">Motorbike: {motorbike.toFixed(2)} tonnes of CO2e</Text>
          <Text fontSize="xl">Bus & Rail: {busRail.toFixed(2)} tonnes of CO2e</Text>
          <Divider my="6" />
          <Heading as="h3" size="xl" textAlign="center" fontWeight="bold">
            Total: {totalFootprint.toFixed(2)} tonnes of CO2e
          </Heading>
        </Box>

        <Box bg={sectionBgColor} p="6" rounded="md" shadow="sm">
          <Heading as="h3" size="lg" mb="6" fontWeight="semibold">
            Environmental Campaigns
          </Heading>
          {campaigns.map((campaign, index) => (
            <Box key={index} mb="4">
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontSize="xl" fontWeight="bold">
                  {campaign.title}
                </Text>
                <Button size="sm" onClick={() => handleToggle(index)}>
                  {expandedCampaign === index ? 'Hide Details' : 'Show Details'}
                </Button>
              </HStack>
              <Text fontSize="md" mt="2" mb="2">
                {campaign.shortDescription}
              </Text>
              <Collapse in={expandedCampaign === index} animateOpacity>
                <Box mt="4" p="4" bg={campaignBgColor} rounded="md">
                  <Text mb="4">{campaign.details}</Text>
                  <Button colorScheme="green" onClick={() => handleDonateClick(campaign)}>Donate</Button>
                </Box>
              </Collapse>
            </Box>
          ))}
        </Box>

        {/* Environmental Awareness Section */}
        <Box bg={sectionBgColor} p="6" rounded="md" shadow="sm">
          <Heading as="h3" size="lg" mb="6" fontWeight="semibold">
            Environmental Awareness
          </Heading>
          <Text fontSize="lg" lineHeight="tall">
            Every action we take contributes to the health of our planet. Reducing carbon emissions is critical to mitigating global warming and preserving our environment. Here are some ways to make a difference:
          </Text>
          <HStack spacing="6" mt="6" alignItems="flex-start">
            <VStack>
              <Image
                src="https://images.pexels.com/photos/53435/tree-oak-landscape-view-53435.jpeg"
                alt="Tree Planting"
                boxSize="200px"
                rounded="md"
              />
              <Text fontSize="lg" fontWeight="medium">Plant Trees</Text>
            </VStack>
            <VStack>
              <Box w="100%" h="200px">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/9GorqroigqM"
                  title="The Story of Stuff"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Box>
              <Text fontSize="lg" fontWeight="medium">The Story of Stuff</Text>
            </VStack>
            <VStack>
              <Box w="100%" h="200px">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/ifrHogDujXw"
                  title="What is Climate Change?"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Box>
              <Text fontSize="lg" fontWeight="medium">Understanding Climate Change</Text>
            </VStack>
            <VStack>
              <Box w="100%" h="200px">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/yWOqeyPIVRo"
                  title="How Trees Talk to Each Other"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Box>
              <Text fontSize="lg" fontWeight="medium">How Trees Communicate</Text>
            </VStack>
          </HStack>
        </Box>

        <Box bg={sectionBgColor} p="6" rounded="md" shadow="sm">
          <Heading as="h3" size="lg" mb="6" fontWeight="semibold">
            Global Warming and CO2
          </Heading>
          <Text fontSize="lg" lineHeight="tall">
            The buildup of carbon dioxide (CO2) in our atmosphere is one of the leading causes of global warming. As CO2 levels increase, so do global temperatures, leading to more extreme weather patterns, rising sea levels, and adverse effects on wildlife and ecosystems.
          </Text>
        </Box>

        <Box bg={sectionBgColor} p="6" rounded="md" shadow="sm">
          <Heading as="h3" size="lg" mb="6" fontWeight="semibold">
            Creating a Fruitful Environment for Future Generations
          </Heading>
          <Text fontSize="lg" lineHeight="tall">
            Creating a sustainable environment for future generations is a collective responsibility. Here are some steps you can take to contribute:
          </Text>
          <VStack align="start" mt="6" spacing="4">
            <Text fontSize="lg">
              <strong>1. Conserve Water:</strong> Water is a precious resource. Use it wisely to ensure that future generations have access to clean water.
            </Text>
            <Text fontSize="lg">
              <strong>2. Adopt Sustainable Agriculture:</strong> Support and practice farming methods that preserve the soil and minimize environmental impact.
            </Text>
            <Text fontSize="lg">
              <strong>3. Protect Wildlife:</strong> Conservation efforts help protect endangered species and maintain biodiversity.
            </Text>
            <Text fontSize="lg">
              <strong>4. Educate Others:</strong> Spread awareness about environmental issues and inspire others to take action.
            </Text>
            <Text fontSize="lg">
              <strong>5. Support Green Policies:</strong> Advocate for and support policies that aim to reduce carbon emissions and promote sustainability.
            </Text>
          </VStack>
        </Box>

        <Box bg={sectionBgColor} p="6" rounded="md" shadow="sm">
          <Heading as="h3" size="lg" mb="6" fontWeight="semibold">
            Learn More
          </Heading>
          <Text fontSize="lg" lineHeight="tall">
            Interested in learning more about how you can help? Explore these resources to take action:
          </Text>
          <VStack mt="4" align="start">
            <Link href="https://www.un.org/sustainabledevelopment/climate-change/" isExternal color="blue.500" fontSize="lg" fontWeight="medium">
              United Nations - Climate Change
            </Link>
            <Link href="https://www.worldwildlife.org/initiatives/climate" isExternal color="blue.500" fontSize="lg" fontWeight="medium">
              World Wildlife Fund - Climate
            </Link>
            <Link href="https://www.nature.org/en-us/what-we-do/our-insights/perspectives/climate-change-what-we-know/" isExternal color="blue.500" fontSize="lg" fontWeight="medium">
              The Nature Conservancy - Climate Change
            </Link>
          </VStack>
        </Box>
      </Stack>

      {/* Payment Modal for Donations */}
      <PaymentModal
        isOpen={isOpen}
        onClose={onClose}
        campaignTitle={selectedCampaign?.title}
        onPaymentSuccess={() => console.log('Payment successful!')}
      />
    </Box>
  );
};

export default Dashboard;
