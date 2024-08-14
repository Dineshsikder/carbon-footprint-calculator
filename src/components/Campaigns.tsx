import React, { useState } from 'react';
import { Box, Heading, Text, Stack, Button, Image, AspectRatio, Flex, useDisclosure } from '@chakra-ui/react';
import PaymentModal from './PaymentModal';

interface Campaign {
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  investmentDetails: string;
  organizer: string;
}

const campaigns: Campaign[] = [
  {
    title: "Reforestation in the Amazon",
    description: "Help us plant trees in the Amazon to combat deforestation and climate change.",
    imageUrl: "https://images.pexels.com/photos/462118/pexels-photo-462118.jpeg",
    videoUrl: "https://www.youtube.com/embed/9GorqroigqM",
    investmentDetails: "Funds will be used to purchase and plant native trees in deforested areas of the Amazon, supporting local communities and biodiversity.",
    organizer: "Amazon Conservation Team",
  },
  {
    title: "Ocean Cleanup Initiative",
    description: "Join our efforts to clean up plastic waste from our oceans.",
    imageUrl: "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg",
    videoUrl: "https://www.youtube.com/embed/d6jxBPAc-W0",
    investmentDetails: "Donations will fund advanced ocean cleanup technologies and support research to prevent further plastic pollution.",
    organizer: "The Ocean Cleanup Foundation",
  },
  {
    title: "Renewable Energy for Rural Communities",
    description: "Support the transition to renewable energy in underdeveloped regions.",
    imageUrl: "https://images.pexels.com/photos/691614/pexels-photo-691614.jpeg",
    videoUrl: "https://www.youtube.com/embed/6GN34E1e9Gs",
    investmentDetails: "Funds will be used to install solar panels and wind turbines in rural areas, providing sustainable energy solutions to communities.",
    organizer: "Global Renewable Energy Initiative",
  },
  {
    title: "Wildlife Protection Program",
    description: "Help protect endangered species and preserve biodiversity.",
    imageUrl: "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg",
    videoUrl: "https://www.youtube.com/embed/e2b4Xpb0YOg",
    investmentDetails: "Your donation will go towards anti-poaching efforts, habitat restoration, and wildlife monitoring programs.",
    organizer: "World Wildlife Fund",
  },
  {
    title: "Sustainable Agriculture Project",
    description: "Promote sustainable farming practices to reduce environmental impact.",
    imageUrl: "https://images.pexels.com/photos/733182/pexels-photo-733182.jpeg",
    investmentDetails: "Donations will support farmers in adopting eco-friendly practices, reducing chemical use, and improving soil health.",
    organizer: "Sustainable Farming Association",
  },
  {
    title: "Clean Water Access Initiative",
    description: "Provide clean water to communities in need and reduce waterborne diseases.",
    imageUrl: "https://images.pexels.com/photos/301599/pexels-photo-301599.jpeg",
    videoUrl: "https://www.youtube.com/embed/6GN34E1e9Gs",
    investmentDetails: "Funds will be invested in building wells, purifying water systems, and educating communities on safe water practices.",
    organizer: "Clean Water for All",
  },
  {
    title: "Climate Change Education",
    description: "Raise awareness and educate the public on the effects of climate change.",
    imageUrl: "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg",
    investmentDetails: "Donations will be used to develop educational materials, host workshops, and promote climate literacy in schools.",
    organizer: "Climate Education Alliance",
  },
  {
    title: "Renewable Energy Research",
    description: "Fund research into new renewable energy technologies.",
    imageUrl: "https://images.pexels.com/photos/280193/pexels-photo-280193.jpeg",
    videoUrl: "https://www.youtube.com/embed/2rSg2GoPVNs",
    investmentDetails: "Your support will accelerate research into innovative renewable energy solutions, such as advanced solar and wind technologies.",
    organizer: "Renewable Research Institute",
  },
  {
    title: "Plastic Waste Reduction Campaign",
    description: "Encourage the reduction of single-use plastics and promote recycling.",
    imageUrl: "https://images.pexels.com/photos/254758/pexels-photo-254758.jpeg",
    investmentDetails: "Funds will be used to launch awareness campaigns, provide reusable alternatives, and support recycling programs.",
    organizer: "Plastic-Free Earth",
  },
  {
    title: "Carbon Offset Program",
    description: "Offset your carbon footprint by supporting carbon reduction projects.",
    imageUrl: "https://images.pexels.com/photos/356123/pexels-photo-356123.jpeg",
    investmentDetails: "Donations will support projects such as reforestation, renewable energy installations, and methane capture.",
    organizer: "Carbon Neutrality Project",
  },
];

const Campaigns: React.FC = () => {
    const [imageError, setImageError] = useState<boolean[]>(new Array(campaigns.length).fill(false));
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  
    const handleImageError = (index: number) => {
      const updatedErrors = [...imageError];
      updatedErrors[index] = true;
      setImageError(updatedErrors);
    };
  
    const handleDonateClick = (campaign: Campaign) => {
      setSelectedCampaign(campaign);
      onOpen();
    };
  
    return (
      <Box p={4}>
        <Heading as="h2" size="xl" mb={6} textAlign="center">
          Environmental Campaigns
        </Heading>
        <Stack spacing={8}>
          {campaigns.map((campaign, index) => (
            <Box key={index} p={5} shadow="md" borderWidth="1px" rounded="md">
              <Heading as="h3" size="lg" mb={3}>
                {campaign.title}
              </Heading>
              <Text mb={3}>{campaign.description}</Text>
              <Flex mb={3} alignItems="center">
                {campaign.imageUrl && !imageError[index] && (
                  <Image
                    src={campaign.imageUrl}
                    alt={campaign.title}
                    borderRadius="md"
                    boxSize="300px"
                    objectFit="cover"
                    onError={() => handleImageError(index)}
                    mr={4}
                  />
                )}
                {imageError[index] && (
                  <Box
                    boxSize="300px"
                    bg="gray.200"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="md"
                    mr={4}
                  >
                    <Text>No Image Available</Text>
                  </Box>
                )}
                {campaign.videoUrl && (
                  <AspectRatio ratio={4 / 3} w="300px" h="300px">
                    <iframe
                      title={campaign.title}
                      src={campaign.videoUrl}
                      allowFullScreen
                      style={{ borderRadius: '8px' }}
                    />
                  </AspectRatio>
                )}
              </Flex>
              <Text fontWeight="bold" mt={3}>How Your Donation Helps:</Text>
              <Text mb={3}>{campaign.investmentDetails}</Text>
              <Text fontWeight="bold" mt={3}>Organizer:</Text>
              <Text mb={3}>{campaign.organizer}</Text>
              <Button colorScheme="green" onClick={() => handleDonateClick(campaign)}>Donate</Button>
            </Box>
          ))}
        </Stack>
  
        <PaymentModal
          isOpen={isOpen}
          onClose={onClose}
          campaignTitle={selectedCampaign?.title}
          onPaymentSuccess={() => console.log('Payment successful!')}
        />
      </Box>
    );
  };
  
  export default Campaigns;
