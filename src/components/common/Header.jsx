import React from 'react';
import {
  Box,
  Flex,
  Link,
  Button,
  Stack,
  useDisclosure,
  useColorModeValue,
  Image,
  Heading,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useLocation } from 'react-router-dom';

// Navigation items
const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Test Prompts', path: '/test' },
  { label: 'Batch Testing', path: '/batch' },
  { label: 'Analytics', path: '/analytics' },
  { label: 'About', path: '/about' },
];

const Header = () => {
  const { isOpen, onToggle } = useDisclosure();
  const location = useLocation();
  
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      position="sticky"
      top={0}
      zIndex={10}
      boxShadow="sm"
    >
      <Flex
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4, md: 8 }}
        align={'center'}
        justify="space-between"
      >
        <Flex flex={{ base: 1 }} justify={{ base: 'start', md: 'start' }}>
          <RouterLink to="/">
            <HStack spacing={3}>
              {/* Replace with your logo if you have one */}
              <Box 
                bg="blue.500" 
                color="white" 
                p={2} 
                borderRadius="md"
                fontSize="xl"
                fontWeight="bold"
              >
                PI
              </Box>
              <Heading size="md" display={{ base: 'none', md: 'block' }}>
                Prompt Protection Tester
              </Heading>
            </HStack>
          </RouterLink>
        </Flex>

        <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
          <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
              <Button
                key={navItem.label}
                as={RouterLink}
                to={navItem.path}
                fontSize={'sm'}
                fontWeight={600}
                variant={location.pathname === navItem.path ? 'solid' : 'ghost'}
                colorScheme={location.pathname === navItem.path ? 'blue' : 'gray'}
              >
                {navItem.label}
              </Button>
            ))}
          </Stack>
        </Flex>
        
        <Flex display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
      </Flex>

      {/* Mobile navigation */}
      {isOpen && (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4} p={4}>
            {NAV_ITEMS.map((navItem) => (
              <Button
                key={navItem.label}
                as={RouterLink}
                to={navItem.path}
                w="full"
                fontSize={'sm'}
                fontWeight={600}
                variant={location.pathname === navItem.path ? 'solid' : 'ghost'}
                colorScheme={location.pathname === navItem.path ? 'blue' : 'gray'}
                onClick={onToggle}
              >
                {navItem.label}
              </Button>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Header;
