import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Box, useColorModeValue } from '@chakra-ui/react';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Header from './components/Header';
import Calculator from './components/Calculator';
import Campaigns from './components/Campaigns';

function App() {
  const [username, setUsername] = useState<string>(localStorage.getItem('username') || '');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(Boolean(localStorage.getItem('isAuthenticated')));

  const handleLogin = (user: string, password: string) => {
    if (password === 'admin' && user === 'admin') {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', user);
      setIsAuthenticated(true);
      setUsername(user);
    } else if (password !== '') {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', user);
      setIsAuthenticated(true);
      setUsername(user);
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUsername('');
    // Navigation handled in Header component
  };

  useEffect(() => {
    const authState = Boolean(localStorage.getItem('isAuthenticated'));
    const storedUsername = localStorage.getItem('username');
    if (authState && storedUsername) {
      setIsAuthenticated(authState);
      setUsername(storedUsername);
    }
  }, []);

  const isAdmin = username === 'admin';

  const backgroundColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Router>
      <Box minH="100vh" bg={backgroundColor} color={textColor}>
        {isAuthenticated && <Header isAdmin={isAdmin} onLogout={handleLogout} />}
        <Box p={4}>
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/campaigns" element={isAuthenticated ? <Campaigns /> : <Navigate to="/login" />} />
            {isAdmin && isAuthenticated && (
              <Route path="/calculator" element={<Calculator />} />
            )}
            <Route path="/" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />
            <Route path="*" element={<Navigate to="/dashboard" />} /> {/* Handle undefined routes */}
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
