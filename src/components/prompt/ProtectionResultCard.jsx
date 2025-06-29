import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Flex,
  Badge,
  Progress,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { CheckCircleIcon, WarningTwoIcon } from '@chakra-ui/icons';

const ProtectionResultCard = ({ result }) => {
  const { is_safe, confidence, reason, details } = result;
  
  // Calculate color based on safety and confidence
  const getStatusColor = () => {
    if (is_safe) {
      return confidence > 0.9 ? 'green' : 'yellow';
    }
    return 'red';
  };
  
  const statusColor = getStatusColor();
  
  return (
    <Box 
      borderWidth={2} 
      borderRadius="lg" 
      borderColor={`${statusColor}.300`}
      bg={`${statusColor}.50`}
      p={5}
      boxShadow="sm"
    >
      <VStack spacing={4} align="stretch">
        <Flex justify="space-between" align="center">
          <Heading size="md" display="flex" alignItems="center">
            {is_safe ? (
              <CheckCircleIcon color="green.500" mr={2} />
            ) : (
              <WarningTwoIcon color="red.500" mr={2} />
            )}
            Protection Layer Result
          </Heading>
          <Badge 
            colorScheme={statusColor}
            fontSize="md"
            px={3}
            py={1}
            borderRadius="full"
          >
            {is_safe ? 'SAFE' : 'POTENTIALLY UNSAFE'}
          </Badge>
        </Flex>
        
        <Box>
          <Text fontWeight="bold" mb={1}>Confidence: {(confidence * 100).toFixed(1)}%</Text>
          <Progress 
            value={confidence * 100} 
            colorScheme={statusColor}
            borderRadius="md"
            size="md"
          />
        </Box>
        
        <Box>
          <Text fontWeight="bold">Reason:</Text>
          <Text>{reason}</Text>
        </Box>
        
        {details && Object.keys(details).length > 0 && (
          <Accordion allowToggle>
            <AccordionItem border="none">
              <AccordionButton 
                bg={`${statusColor}.100`} 
                borderRadius="md"
                _hover={{ bg: `${statusColor}.200` }}
              >
                <Box flex="1" textAlign="left" fontWeight="bold">
                  Additional Details
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4} pt={3} bg={`${statusColor}.50`}>
                <VStack align="stretch" spacing={2}>
                  {details.detected_patterns?.length > 0 && (
                    <Box>
                      <Text fontWeight="bold" fontSize="sm">Detected Patterns:</Text>
                      <Box ml={4}>
                        {details.detected_patterns.map((pattern, index) => (
                          <Text key={index} fontSize="sm" as="li">
                            {pattern}
                          </Text>
                        ))}
                      </Box>
                    </Box>
                  )}
                  
                  {details.analysis_time_ms && (
                    <Flex justify="space-between">
                      <Text fontSize="sm">Analysis Time:</Text>
                      <Text fontSize="sm">{details.analysis_time_ms} ms</Text>
                    </Flex>
                  )}
                  
                  {details.text_length && (
                    <Flex justify="space-between">
                      <Text fontSize="sm">Text Length:</Text>
                      <Text fontSize="sm">{details.text_length} characters</Text>
                    </Flex>
                  )}
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        )}
      </VStack>
    </Box>
  );
};

export default ProtectionResultCard;