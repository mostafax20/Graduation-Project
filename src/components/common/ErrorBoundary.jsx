import React from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  Button, 
  VStack, 
  Code, 
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription 
} from '@chakra-ui/react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Box p={5} borderRadius="md" borderWidth={1} borderColor="red.300" bg="red.50">
          <Alert 
            status="error" 
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            borderRadius="md"
            py={4}
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Something went wrong
            </AlertTitle>
            <AlertDescription maxWidth="md">
              <Text mb={4}>
                An error occurred in the application. Please try refreshing the page or contact support if the problem persists.
              </Text>
              
              {this.state.error && (
                <VStack align="stretch" spacing={2} mt={3}>
                  <Text fontWeight="bold" fontSize="sm">Error details:</Text>
                  <Code p={2} borderRadius="md" whiteSpace="pre-wrap" fontSize="xs">
                    {this.state.error.toString()}
                  </Code>
                </VStack>
              )}
              
              <Button 
                mt={4} 
                colorScheme="red" 
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
            </AlertDescription>
          </Alert>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;