
import React from 'react';
import { Box, Flex, HStack, Link, Button, useColorMode, useColorModeValue, Heading, IconButton } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

interface HeaderProps {
  isAdmin: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAdmin, onLogout }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const colorModeText = useColorModeValue('Dark', 'Light');
  const navigate = useNavigate(); // Use navigate for redirection
  const toggleIcon = colorMode === 'light' ? <MoonIcon /> : <SunIcon />;

  const backgroundColor = useColorModeValue('gray.100', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <Box bg={backgroundColor} color={textColor} px={4} shadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Heading size="md">Carbon Footprint Calculator</Heading>
        <HStack spacing={8} alignItems="center">
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            <Link as={RouterLink} to="/dashboard" fontWeight="bold">
              Dashboard
            </Link>
            {isAdmin && (
              <>
                <Link as={RouterLink} to="/calculator" fontWeight="bold">
                  Calculator
                </Link>
                <Link as={RouterLink} to="/campaigns" fontWeight="bold">
                  Campaigns
                </Link>
              </>
            )}
          </HStack>
          <IconButton
            aria-label="Toggle Dark/Light Mode"
            icon={toggleIcon}
            onClick={toggleColorMode}
            variant="ghost"
          />
          <Button colorScheme="red" onClick={handleLogoutClick}>
            Logout
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
