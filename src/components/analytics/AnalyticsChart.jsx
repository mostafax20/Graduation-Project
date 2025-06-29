import React from 'react';
import {
  Box,
  Heading,
  VStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Helper function to format dates
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

const AnalyticsChart = ({ data, type = 'daily', title = 'Chart' }) => {
  const lineColor = useColorModeValue('blue.500', 'blue.300');
  const safeColor = useColorModeValue('green.500', 'green.300');
  const unsafeColor = useColorModeValue('red.500', 'red.300');
  const gridColor = useColorModeValue('gray.200', 'gray.700');
  
  // Prepare data based on chart type
  const prepareChartData = () => {
    switch (type) {
      case 'daily':
        // Format daily data for the line chart
        return Object.entries(data.daily_counts || {}).map(([date, count]) => ({
          date: formatDate(date),
          count
        })).sort((a, b) => new Date(a.date) - new Date(b.date));
        
      case 'safety':
        // Format safety data for the pie chart
        return [
          { name: 'Safe', value: data.summary?.safe_prompts || 0, color: safeColor },
          { name: 'Unsafe', value: data.summary?.unsafe_prompts || 0, color: unsafeColor }
        ];
        
      case 'models':
        // Format model usage data for the bar chart
        return Object.entries(data.model_usage || {}).map(([model, count]) => ({
          model,
          count
        })).sort((a, b) => b.count - a.count);
        
      case 'patterns':
        // Format top injection patterns data for the bar chart
        return (data.top_injection_patterns || []).slice(0, 5).map(pattern => ({
          pattern: pattern.pattern,
          count: pattern.count
        })).sort((a, b) => b.count - a.count);
        
      default:
        return [];
    }
  };
  
  const chartData = prepareChartData();
  
  // Render the appropriate chart based on type
  const renderChart = () => {
    switch (type) {
      case 'daily':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="count" 
                name="Prompts Tested" 
                stroke={lineColor} 
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        );
        
      case 'safety':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} prompts`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
        
      case 'models':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="model" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Usage Count" fill={lineColor} />
            </BarChart>
          </ResponsiveContainer>
        );
        
      case 'patterns':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart 
              data={chartData} 
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis type="number" />
              <YAxis dataKey="pattern" type="category" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Occurrence Count" fill={unsafeColor} />
            </BarChart>
          </ResponsiveContainer>
        );
        
      default:
        return <Text>No chart data available</Text>;
    }
  };
  
  return (
    <Box 
      borderWidth={1} 
      borderRadius="lg" 
      p={4} 
      shadow="sm"
      bg={useColorModeValue('white', 'gray.800')}
    >
      <VStack spacing={4} align="stretch">
        <Heading size="md">{title}</Heading>
        {chartData.length > 0 ? (
          renderChart()
        ) : (
          <Box textAlign="center" py={10}>
            <Text color="gray.500">No data available</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default AnalyticsChart;