import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Flex,
  useToast,
  Heading,
} from '@chakra-ui/react';
import { CheckIcon, WarningIcon } from '@chakra-ui/icons';
import ModelSelector from './ModelSelector.jsx';
import ExamplePromptsMenu from './ExamplePromptsMenu.jsx';
import { useApi } from '../../hooks/useApi.jsx';
import { analyzePrompt, getExamplePrompts } from '../../services/api.jsx';
import ProtectionResultCard from './ProtectionResultCard.jsx';
import LLMResponseCard from './LLMResponseCard.jsx';

const PromptForm = () => {
  const [promptText, setPromptText] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');
  const [examplePrompts, setExamplePrompts] = useState([]);
  const toast = useToast();
  
  const { 
    data: analysisResult,
    loading,
    error,
    execute: executeAnalysis
  } = useApi(analyzePrompt);
  
  // Load example prompts
  useEffect(() => {
    const loadExamples = async () => {
      try {
        const examples = await getExamplePrompts();
        setExamplePrompts(examples);
      } catch (error) {
        console.error('Failed to load example prompts', error);
      }
    };
    
    loadExamples();
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!promptText.trim()) {
      toast({
        title: 'Empty prompt',
        description: 'Please enter a prompt to test',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    const request = {
      text: promptText,
      model_name: selectedModel
    };
    
    await executeAnalysis(request);
  };
  
  const handleExampleSelect = (example) => {
    setPromptText(example);
  };
  
  // Display error if API call fails
  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error, toast]);
  
  return (
    <VStack spacing={6} align="stretch" width="100%">
      <Heading as="h1" size="xl">Test Prompt Injection Protection</Heading>
      
      <Box as="form" onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel fontWeight="bold">Enter Prompt:</FormLabel>
            <Textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="Type your prompt here to test for potential injections..."
              size="lg"
              rows={6}
              resize="vertical"
              isDisabled={loading}
            />
            <Flex justify="space-between" mt={1}>
              <FormHelperText>
                Try injection techniques or regular prompts to test the system
              </FormHelperText>
              <ExamplePromptsMenu examples={examplePrompts} onSelect={handleExampleSelect} />
            </Flex>
          </FormControl>
          
          <Flex 
            direction={{ base: 'column', md: 'row' }} 
            justify="space-between" 
            align={{ base: 'stretch', md: 'center' }}
            gap={3}
          >
            <ModelSelector
              selectedModel={selectedModel}
              onSelectModel={setSelectedModel}
              isDisabled={loading}
            />
            
            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              isLoading={loading}
              loadingText="Analyzing..."
              width={{ base: '100%', md: 'auto' }}
              rightIcon={<CheckIcon />}
            >
              Test Prompt
            </Button>
          </Flex>
        </VStack>
      </Box>
      
      {analysisResult && (
        <VStack spacing={4} align="stretch" mt={6}>
          <ProtectionResultCard result={analysisResult.protection_result} />
          
          {analysisResult.llm_response ? (
            <LLMResponseCard response={analysisResult.llm_response} />
          ) : analysisResult.protection_result.is_safe ? (
            <Box 
              p={4} 
              borderRadius="md" 
              bg="yellow.50" 
              borderWidth={1} 
              borderColor="yellow.300"
            >
              <Flex align="center">
                <WarningIcon color="yellow.500" mr={2} />
                <Box>
                  The prompt was judged potentially safe, but with a confidence below the threshold for LLM processing.
                </Box>
              </Flex>
            </Box>
          ) : null}
          
          <Box 
            p={4} 
            borderRadius="md" 
            bg="gray.50" 
            borderWidth={1} 
            borderColor="gray.200"
          >
            <Flex justify="space-between">
              <Box fontWeight="bold">Processing Time:</Box>
              <Box>{(analysisResult.processing_time * 1000).toFixed(2)} ms</Box>
            </Flex>
          </Box>
        </VStack>
      )}
    </VStack>
  );
};

export default PromptForm;