import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
  Flex,
  useColorModeValue,
  Badge,
  Divider,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaShieldAlt, FaRobot, FaSearch, FaChartBar } from 'react-icons/fa';
import { checkApiHealth } from '../services/api.jsx';

const HomePage = () => {
  const [apiStatus, setApiStatus] = useState(null);
  
  useEffect(() => {
    const checkStatus = async () => {
      const isHealthy = await checkApiHealth();
      setApiStatus(isHealthy);
    };
    
    checkStatus();
  }, []);
  
  const featureBg = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  return (
    <VStack spacing={10} align="stretch">
      {/* Hero Section */}
      <Box 
        textAlign="center" 
        py={10} 
        px={6} 
        borderRadius="lg" 
        bg={useColorModeValue('blue.50', 'blue.900')}
        border="1px"
        borderColor={useColorModeValue('blue.100', 'blue.700')}
      >
        <Heading as="h1" size="2xl" mb={4}>
          Prompt Injection Protection Tester
        </Heading>
        <Text fontSize="xl" maxW="3xl" mx="auto" mb={6}>
          Test your LLM prompts against potential injection attacks with our protection layer analysis tool.
        </Text>
        
        <HStack spacing={4} justify="center" wrap="wrap">
          <Button 
            as={RouterLink} 
            to="/test" 
            colorScheme="blue" 
            size="lg"
            leftIcon={<FaSearch />}
          >
            Test a Prompt
          </Button>
          <Button 
            as={RouterLink} 
            to="/batch" 
            colorScheme="blue" 
            size="lg" 
            variant="outline"
            leftIcon={<FaShieldAlt />}
          >
            Batch Testing
          </Button>
        </HStack>
        
        <Flex justify="center" align="center" mt={4}>
          <Text mr={2}>API Status:</Text>
          {apiStatus === null ? (
            <Badge colorScheme="gray">Checking...</Badge>
          ) : apiStatus ? (
            <Badge colorScheme="green">Online</Badge>
          ) : (
            <Badge colorScheme="red">Offline</Badge>
          )}
        </Flex>
      </Box>
      
      {/* Features Section */}
      <Box>
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          Key Features
        </Heading>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          <Box 
            p={5} 
            borderWidth="1px" 
            borderRadius="lg" 
            bg={featureBg}
            borderColor={borderColor}
          >
            <Icon as={FaShieldAlt} boxSize={10} color="blue.500" mb={4} />
            <Heading as="h3" size="md" mb={2}>
              Protection Layer
            </Heading>
            <Text>
              Analyze prompts with our AI-powered protection layer to identify potential injection attempts.
            </Text>
          </Box>
          
          <Box 
            p={5} 
            borderWidth="1px" 
            borderRadius="lg" 
            bg={featureBg}
            borderColor={borderColor}
          >
            <Icon as={FaRobot} boxSize={10} color="green.500" mb={4} />
            <Heading as="h3" size="md" mb={2}>
              Multiple LLM Support
            </Heading>
            <Text>
              Test prompts against various LLM models to compare protection effectiveness.
            </Text>
          </Box>
          
          <Box 
            p={5} 
            borderWidth="1px" 
            borderRadius="lg" 
            bg={featureBg}
            borderColor={borderColor}
          >
            <Icon as={FaSearch} boxSize={10} color="purple.500" mb={4} />
            <Heading as="h3" size="md" mb={2}>
              Batch Testing
            </Heading>
            <Text>
              Test multiple prompts at once to efficiently evaluate larger datasets.
            </Text>
          </Box>
          
          <Box 
            p={5} 
            borderWidth="1px" 
            borderRadius="lg"
            bg={featureBg}
            borderColor={borderColor}
          >
            <Icon as={FaChartBar} boxSize={10} color="orange.500" mb={4} />
            <Heading as="h3" size="md" mb={2}>
              Analytics
            </Heading>
            <Text>
              Gain insights from testing data with comprehensive analytics and visualizations.
            </Text>
          </Box>
        </SimpleGrid>
      </Box>
      
      <Divider />
      
      {/* Getting Started Section */}
      <Box>
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          Getting Started
        </Heading>
        
        <VStack spacing={4} align="stretch" bg={featureBg} p={6} borderRadius="lg" borderColor={borderColor} borderWidth="1px">
          <Box>
            <Heading as="h3" size="md" mb={2}>
              1. Test Individual Prompts
            </Heading>
            <Text>
              Start by testing individual prompts to see how the protection layer evaluates them.
              Head to the <Button as={RouterLink} to="/test" variant="link" colorScheme="blue">Test a Prompt</Button> page.
            </Text>
          </Box>
          
          <Box>
            <Heading as="h3" size="md" mb={2}>
              2. Try Batch Testing
            </Heading>
            <Text>
              For multiple prompts, use batch testing to analyze many prompts at once.
              Check out the <Button as={RouterLink} to="/batch" variant="link" colorScheme="blue">Batch Testing</Button> page.
            </Text>
          </Box>
          
          <Box>
            <Heading as="h3" size="md" mb={2}>
              3. Review Analytics
            </Heading>
            <Text>
              Monitor protection effectiveness through comprehensive analytics.
              Explore the <Button as={RouterLink} to="/analytics" variant="link" colorScheme="blue">Analytics</Button> page.
            </Text>
          </Box>
        </VStack>
      </Box>
    </VStack>
  );
};

export default HomePage;