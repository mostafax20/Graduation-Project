import React, { useEffect, useState } from 'react';
import {
  FormControl,
  FormLabel,
  Select,
  Box,
  Spinner,
  Text,
  HStack,
} from '@chakra-ui/react';
import { getAvailableModels } from '../../services/api.jsx'; // Adjust the import based on your project structure

const ModelSelector = ({ selectedModel, onSelectModel, isDisabled = false, mb }) => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const loadModels = async () => {
      try {
        setLoading(true);
        const availableModels = await getAvailableModels();
        setModels(availableModels);
        
        // If selected model isn't available, select the first one
        if (availableModels.length > 0 && !availableModels.some(m => m.id === selectedModel)) {
          onSelectModel(availableModels[0].id);
        }
      } catch (error) {
        setError('Failed to load models');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    loadModels();
  }, [selectedModel, onSelectModel]);
  
  const handleChange = (e) => {
    onSelectModel(e.target.value);
  };
  
  return (
    <FormControl mb={mb} maxWidth={{ base: "100%", md: "300px" }}>
      <FormLabel fontWeight="bold">Select LLM Model:</FormLabel>
      
      {loading ? (
        <HStack>
          <Spinner size="sm" />
          <Text>Loading models...</Text>
        </HStack>
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <Select 
          value={selectedModel}
          onChange={handleChange}
          isDisabled={isDisabled || models.length === 0}
        >
          {models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name} ({model.provider})
            </option>
          ))}
        </Select>
      )}
    </FormControl>
  );
};

export default ModelSelector;