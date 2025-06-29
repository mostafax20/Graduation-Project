import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  },
  colors: {
    blue: {
      50: '#e6f5ff',
      100: '#b3e0ff',
      200: '#80ccff',
      300: '#4db8ff',
      400: '#1aa3ff',
      500: '#0091ea',
      600: '#0070b8',
      700: '#005186',
      800: '#003254',
      900: '#001222',
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '600',
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: '700',
      },
    },
  },
});

export default theme;