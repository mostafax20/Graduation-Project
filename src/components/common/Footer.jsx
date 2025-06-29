import React from 'react';
import {
  Box,
  Flex,
  Text,
  Link,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      borderTop={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Flex
        align={'center'}
        justify={'center'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: 4, md: 0 }}
        wrap="wrap"
      >
        <Text>
          © {new Date().getFullYear()} Prompt Injection Protection Tester
        </Text>
        
        <HStack
          spacing={4}
          ml={{ base: 0, md: 8 }}
          mt={{ base: 2, md: 0 }}
        >
          <Link href="#" color="blue.500">
            Privacy Policy
          </Link>
          <Link href="#" color="blue.500">
            Terms of Service
          </Link>
          <Link href="#" color="blue.500">
            Contact
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Footer;