import React from 'react';
import { Flex, Spinner, Text, VStack } from '@chakra-ui/react';

const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <Flex justify="center" align="center" height="200px" width="100%">
      <VStack spacing={3}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <Text>{text}</Text>
      </VStack>
    </Flex>
  );
};

export default LoadingSpinner;