import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  VStack,
  Heading,
  SimpleGrid,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spinner,
  Text,
  Alert,
  AlertIcon,
  useToast,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useApiNoParams } from '../hooks/useApi.jsx';
import { getAnalytics } from '../services/api.jsx';
import StatsCards from '../components/analytics/StatsCards.jsx';
import AnalyticsChart from '../components/analytics/AnalyticsChart.jsx';

const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState('last7days');
  const toast = useToast();
  
  const {
    data: analyticsData,
    loading,
    error,
    execute: fetchAnalytics
  } = useApiNoParams(getAnalytics);
  
  useEffect(() => {
    // Fetch analytics when component mounts
    fetchAnalytics();
    
    // Set up auto-refresh every 5 minutes
    const refreshInterval = setInterval(() => {
      fetchAnalytics();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, [fetchAnalytics]);
  
  // Handle date range change
  const handleDateRangeChange = (range) => {
    setDateRange(range);
    // In a real app, you would get start/end dates based on the range
    // and pass them to the API
    fetchAnalytics();
  };
  
  return (
    <Box>
      <VStack spacing={6} align="stretch">
        <Flex justify="space-between" align="center">
          <Heading as="h1" size="xl">Analytics Dashboard</Heading>
          
          <HStack>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                {dateRange === 'last7days' && 'Last 7 Days'}
                {dateRange === 'last30days' && 'Last 30 Days'}
                {dateRange === 'thismonth' && 'This Month'}
                {dateRange === 'lastmonth' && 'Last Month'}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => handleDateRangeChange('last7days')}>Last 7 Days</MenuItem>
                <MenuItem onClick={() => handleDateRangeChange('last30days')}>Last 30 Days</MenuItem>
                <MenuItem onClick={() => handleDateRangeChange('thismonth')}>This Month</MenuItem>
                <MenuItem onClick={() => handleDateRangeChange('lastmonth')}>Last Month</MenuItem>
              </MenuList>
            </Menu>
            
            <Button 
              onClick={() => fetchAnalytics()} 
              isLoading={loading}
              loadingText="Refreshing"
            >
              Refresh
            </Button>
          </HStack>
        </Flex>
        
        {loading && !analyticsData && (
          <Box textAlign="center" py={10}>
            <Spinner size="xl" />
            <Text mt={4}>Loading analytics data...</Text>
          </Box>
        )}
        
        {error && (
          <Alert status="error">
            <AlertIcon />
            Failed to load analytics: {error.message}
          </Alert>
        )}
        
        {analyticsData && (
          <>
            <StatsCards summary={analyticsData.summary} />
            
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mt={6}>
              <AnalyticsChart 
                data={analyticsData}
                type="daily"
                title="Daily Prompt Testing Activity"
              />
              
              <AnalyticsChart 
                data={analyticsData}
                type="safety"
                title="Safe vs. Unsafe Prompts"
              />
              
              <AnalyticsChart 
                data={analyticsData}
                type="models"
                title="Model Usage Distribution"
              />
              
              <AnalyticsChart 
                data={analyticsData}
                type="patterns"
                title="Top Injection Patterns Detected"
              />
            </SimpleGrid>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default AnalyticsPage;