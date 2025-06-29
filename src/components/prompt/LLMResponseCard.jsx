import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Flex,
  Badge,
  Divider,
  useClipboard,
  Button,
  Code,
} from '@chakra-ui/react';
import { CheckIcon, CopyIcon } from '@chakra-ui/icons';

const LLMResponseCard = ({ response }) => {
  const { text, model_used, metadata } = response;
  const { hasCopied, onCopy } = useClipboard(text);
  
  return (
    <Box 
      borderWidth={2} 
      borderRadius="lg" 
      borderColor="blue.300"
      bg="blue.50"
      p={5}
      boxShadow="sm"
    >
      <VStack spacing={4} align="stretch">
        <Flex justify="space-between" align="center">
          <Heading size="md">LLM Response</Heading>
          <Badge 
            colorScheme="blue"
            fontSize="md"
            px={3}
            py={1}
            borderRadius="full"
          >
            {model_used}
          </Badge>
        </Flex>
        
        <Divider />
        
        <Box position="relative">
          <Box 
            bg="white" 
            p={4} 
            borderRadius="md" 
            borderWidth={1}
            borderColor="gray.200"
            maxHeight="400px"
            overflowY="auto"
            whiteSpace="pre-wrap"
          >
            <Text>{text}</Text>
          </Box>
          
          <Button
            position="absolute"
            top={2}
            right={2}
            size="sm"
            onClick={onCopy}
            leftIcon={hasCopied ? <CheckIcon /> : <CopyIcon />}
            colorScheme={hasCopied ? "green" : "gray"}
            variant="solid"
            opacity={0.8}
            _hover={{ opacity: 1 }}
          >
            {hasCopied ? "Copied" : "Copy"}
          </Button>
        </Box>
        
        {metadata && Object.keys(metadata).length > 0 && (
          <Box>
            <Text fontWeight="bold" mb={2}>Metadata:</Text>
            <Code p={2} borderRadius="md" display="block">
              {JSON.stringify(metadata, null, 2)}
            </Code>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default LLMResponseCard;