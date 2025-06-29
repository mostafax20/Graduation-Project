import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const ExamplePromptsMenu = ({ examples, onSelect }) => {
  if (!examples || examples.length === 0) {
    return null;
  }
  
  return (
    <Box>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} size="sm" variant="outline">
          Load Example
        </MenuButton>
        <MenuList>
          {examples.map((example, index) => (
            <MenuItem key={index} onClick={() => onSelect(example)}>
              {/* Truncate long examples for the menu */}
              {example.length > 50 ? `${example.substring(0, 50)}...` : example}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default ExamplePromptsMenu;