import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Heading, useColorModeValue } from '@chakra-ui/react';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const history = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      onLogin(username, password);
      history('/dashboard');
    } else {
      alert('Please enter both username and password.');
    }
  };

  const backgroundColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Box maxW="sm" mx="auto" mt="10" p="6" boxShadow="lg" rounded="md" bg={backgroundColor} color={textColor}>
      <Heading as="h2" size="lg" mb="6">Login</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="username" mb="4">
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </FormControl>
        <FormControl id="password" mb="4">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" width="full">Login</Button>
      </form>
    </Box>
  );
};

export default Login;
