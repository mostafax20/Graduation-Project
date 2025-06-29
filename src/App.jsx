import React from 'react';
import { ChakraProvider, Box, Container } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import TestPage from './pages/TestPage.jsx';
import BatchTestPage from './pages/BatchTestPage.jsx';
import AnalyticsPage from './pages/AnalyticsPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import theme from './theme.js';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box minHeight="100vh" display="flex" flexDirection="column">
          <Header />
          
          <Container maxW="container.xl" flex="1" py={8}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="/batch" element={<BatchTestPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Container>
          
          <Footer />
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;