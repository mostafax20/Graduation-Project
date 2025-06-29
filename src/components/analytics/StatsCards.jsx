import React from 'react';
import {
  SimpleGrid,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaClock, 
  FaPercent 
} from 'react-icons/fa';

const StatsCards = ({ summary, previousSummary = null }) => {
  // Helper function to calculate percentage change
  const calculateChange = (current, previous) => {
    if (!previous || previous === 0) return null;
    return ((current - previous) / previous) * 100;
  };
  
  // Calculate changes if previous data exists
  const totalChange = calculateChange(summary?.total_prompts, previousSummary?.total_prompts);
  const safeChange = calculateChange(summary?.safe_prompts, previousSummary?.safe_prompts);
  const confidenceChange = calculateChange(summary?.average_confidence, previousSummary?.average_confidence);
  const timeChange = calculateChange(summary?.average_processing_time, previousSummary?.average_processing_time);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5}>
      {/* Total Prompts Card */}
      <Box 
        p={5} 
        borderWidth={1} 
        borderRadius="lg" 
        shadow="sm"
        bg={bgColor}
        borderColor={borderColor}
      >
        <Stat>
          <StatLabel display="flex" alignItems="center">
            Total Prompts Tested
          </StatLabel>
          <StatNumber fontSize="3xl">{summary?.total_prompts || 0}</StatNumber>
          {totalChange !== null && (
            <StatHelpText>
              <StatArrow type={totalChange > 0 ? 'increase' : 'decrease'} />
              {Math.abs(totalChange).toFixed(1)}% from previous period
            </StatHelpText>
          )}
        </Stat>
      </Box>
      
      {/* Safe Prompts Card */}
      <Box 
        p={5} 
        borderWidth={1} 
        borderRadius="lg" 
        shadow="sm"
        bg={bgColor}
        borderColor={borderColor}
      >
        <Stat>
          <StatLabel display="flex" alignItems="center">
            <Icon as={FaCheckCircle} color="green.500" mr={2} />
            Safe Prompts
          </StatLabel>
          <StatNumber fontSize="3xl">
            {summary?.safe_prompts || 0} 
            <Box as="span" fontSize="lg" color="gray.500" ml={2}>
              ({summary?.total_prompts ? ((summary.safe_prompts / summary.total_prompts) * 100).toFixed(1) : 0}%)
            </Box>
          </StatNumber>
          {safeChange !== null && (
            <StatHelpText>
              <StatArrow type={safeChange > 0 ? 'increase' : 'decrease'} />
              {Math.abs(safeChange).toFixed(1)}% from previous period
            </StatHelpText>
          )}
        </Stat>
      </Box>
      
      {/* Average Confidence Card */}
      <Box 
        p={5} 
        borderWidth={1} 
        borderRadius="lg" 
        shadow="sm"
        bg={bgColor}
        borderColor={borderColor}
      >
        <Stat>
          <StatLabel display="flex" alignItems="center">
            <Icon as={FaPercent} color="blue.500" mr={2} />
            Avg. Confidence
          </StatLabel>
          <StatNumber fontSize="3xl">
            {summary?.average_confidence ? (summary.average_confidence * 100).toFixed(1) : 0}%
          </StatNumber>
          {confidenceChange !== null && (
            <StatHelpText>
              <StatArrow type={confidenceChange > 0 ? 'increase' : 'decrease'} />
              {Math.abs(confidenceChange).toFixed(1)}% from previous period
            </StatHelpText>
          )}
        </Stat>
      </Box>
      
      {/* Processing Time Card */}
      <Box 
        p={5} 
        borderWidth={1} 
        borderRadius="lg" 
        shadow="sm"
        bg={bgColor}
        borderColor={borderColor}
      >
        <Stat>
          <StatLabel display="flex" alignItems="center">
            <Icon as={FaClock} color="purple.500" mr={2} />
            Avg. Processing Time
          </StatLabel>
          <StatNumber fontSize="3xl">
            {summary?.average_processing_time ? (summary.average_processing_time * 1000).toFixed(0) : 0} ms
          </StatNumber>
          {timeChange !== null && (
            <StatHelpText>
              <StatArrow type={timeChange < 0 ? 'increase' : 'decrease'} />
              {Math.abs(timeChange).toFixed(1)}% {timeChange < 0 ? 'faster' : 'slower'}
            </StatHelpText>
          )}
        </Stat>
      </Box>
    </SimpleGrid>
  );
};

export default StatsCards;