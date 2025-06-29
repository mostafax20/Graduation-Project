import React, { useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Text,
  Flex,
  Button,
  Collapse,
  Heading,
  Divider,
  useClipboard,
  HStack,
  Progress,
  VStack,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon, CopyIcon, CheckIcon } from '@chakra-ui/icons';

const BatchResultsTable = ({ results }) => {
  const [expandedRows, setExpandedRows] = useState({});
  const [showOnlySafe, setShowOnlySafe] = useState(false);
  const [showOnlyUnsafe, setShowOnlyUnsafe] = useState(false);
  
  // Toggle row expansion
  const toggleRow = (index) => {
    setExpandedRows({
      ...expandedRows,
      [index]: !expandedRows[index]
    });
  };
  
  // Apply filters
  const filteredResults = results.results.filter(result => {
    if (showOnlySafe && !result.protection_result.is_safe) return false;
    if (showOnlyUnsafe && result.protection_result.is_safe) return false;
    return true;
  });
  
  // Calculate stats
  const totalPrompts = results.results.length;
  const safePrompts = results.results.filter(r => r.protection_result.is_safe).length;
  const unsafePrompts = totalPrompts - safePrompts;
  const averageConfidence = results.results.reduce((sum, r) => sum + r.protection_result.confidence, 0) / totalPrompts;
  
  return (
    <Box>
      <Heading size="md" mb={4}>Batch Analysis Results</Heading>
      
      <VStack spacing={4} align="stretch" mb={6}>
        <Box p={4} borderWidth={1} borderRadius="md" bg="blue.50">
          <Text fontWeight="bold" mb={2}>Batch Summary:</Text>
          <Flex wrap="wrap" gap={4}>
            <Box>
              <Text fontSize="sm">Total Prompts: {totalPrompts}</Text>
            </Box>
            <Box>
              <Text fontSize="sm">Safe Prompts: {safePrompts} ({((safePrompts / totalPrompts) * 100).toFixed(0)}%)</Text>
            </Box>
            <Box>
              <Text fontSize="sm">Unsafe Prompts: {unsafePrompts} ({((unsafePrompts / totalPrompts) * 100).toFixed(0)}%)</Text>
            </Box>
            <Box>
              <Text fontSize="sm">Average Confidence: {(averageConfidence * 100).toFixed(1)}%</Text>
            </Box>
            <Box>
              <Text fontSize="sm">Processing Time: {(results.total_processing_time * 1000).toFixed(0)}ms</Text>
            </Box>
          </Flex>
        </Box>
        
        <HStack spacing={4}>
          <Button
            size="sm"
            variant={showOnlySafe ? "solid" : "outline"}
            colorScheme="green"
            onClick={() => {
              setShowOnlySafe(!showOnlySafe);
              if (!showOnlySafe) setShowOnlyUnsafe(false);
            }}
          >
            Show Only Safe
          </Button>
          <Button
            size="sm"
            variant={showOnlyUnsafe ? "solid" : "outline"}
            colorScheme="red"
            onClick={() => {
              setShowOnlyUnsafe(!showOnlyUnsafe);
              if (!showOnlyUnsafe) setShowOnlySafe(false);
            }}
          >
            Show Only Unsafe
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setShowOnlySafe(false);
              setShowOnlyUnsafe(false);
            }}
            isDisabled={!showOnlySafe && !showOnlyUnsafe}
          >
            Show All
          </Button>
        </HStack>
      </VStack>
      
      <Box overflowX="auto">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th width="50px">#</Th>
              <Th>Prompt</Th>
              <Th width="140px">Safety</Th>
              <Th width="120px">Confidence</Th>
              <Th width="80px">Details</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredResults.map((result, index) => {
              const { input, protection_result, llm_response } = result;
              const { is_safe, confidence } = protection_result;
              const { hasCopied, onCopy } = useClipboard(input);
              
              // Determine status color based on safety and confidence
              const getStatusColor = () => {
                if (is_safe) {
                  return confidence > 0.9 ? 'green' : 'yellow';
                }
                return 'red';
              };
              
              const statusColor = getStatusColor();
              
              return (
                <React.Fragment key={index}>
                  <Tr 
                    _hover={{ bg: "gray.50" }}
                    cursor="pointer"
                    onClick={() => toggleRow(index)}
                  >
                    <Td>{index + 1}</Td>
                    <Td>
                      <Flex justify="space-between" align="center">
                        <Text noOfLines={1} maxWidth="400px">
                          {input}
                        </Text>
                        <Button
                          size="xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            onCopy();
                          }}
                          leftIcon={hasCopied ? <CheckIcon /> : <CopyIcon />}
                          ml={2}
                        >
                          {hasCopied ? "Copied" : "Copy"}
                        </Button>
                      </Flex>
                    </Td>
                    <Td>
                      <Badge colorScheme={statusColor} px={2} py={1} borderRadius="full">
                        {is_safe ? 'SAFE' : 'UNSAFE'}
                      </Badge>
                    </Td>
                    <Td>
                      <Box>
                        <Text fontSize="xs" mb={1} textAlign="center">
                          {(confidence * 100).toFixed(1)}%
                        </Text>
                        <Progress 
                          value={confidence * 100} 
                          colorScheme={statusColor}
                          size="xs"
                          borderRadius="full"
                        />
                      </Box>
                    </Td>
                    <Td>
                      <Button
                        size="xs"
                        rightIcon={expandedRows[index] ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleRow(index);
                        }}
                      >
                        {expandedRows[index] ? "Hide" : "Show"}
                      </Button>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td colSpan={5} p={0}>
                      <Collapse in={expandedRows[index]} animateOpacity>
                        <Box 
                          p={4} 
                          bg={`${statusColor}.50`} 
                          borderBottomWidth={1}
                          borderColor="gray.200"
                        >
                          <Text fontWeight="bold" mb={2}>Reason:</Text>
                          <Text mb={4}>{protection_result.reason}</Text>
                          
                          {llm_response && (
                            <>
                              <Divider my={3} />
                              <Text fontWeight="bold" mb={2}>LLM Response:</Text>
                              <Box 
                                p={3} 
                                bg="white" 
                                borderRadius="md"
                                borderWidth={1}
                                borderColor="gray.200"
                                mb={2}
                                maxHeight="200px"
                                overflowY="auto"
                              >
                                <Text whiteSpace="pre-wrap">{llm_response.text}</Text>
                              </Box>
                              <Text fontSize="sm" color="gray.600">
                                Model: {llm_response.model_used}
                              </Text>
                            </>
                          )}
                          
                          {protection_result.details && protection_result.details.detected_patterns && 
                           protection_result.details.detected_patterns.length > 0 && (
                            <>
                              <Divider my={3} />
                              <Text fontWeight="bold" mb={1}>Detected Patterns:</Text>
                              <Box pl={4}>
                                {protection_result.details.detected_patterns.map((pattern, idx) => (
                                  <Text key={idx} as="li" fontSize="sm">{pattern}</Text>
                                ))}
                              </Box>
                            </>
                          )}
                        </Box>
                      </Collapse>
                    </Td>
                  </Tr>
                </React.Fragment>
              );
            })}
            
            {filteredResults.length === 0 && (
              <Tr>
                <Td colSpan={5} textAlign="center" py={4}>
                  <Text>No results match the current filters.</Text>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default BatchResultsTable;