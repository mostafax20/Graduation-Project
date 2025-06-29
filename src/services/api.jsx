import axios from 'axios';

// Get API URL from environment or use default
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// Rest of your code remains the same
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Add request interceptor for API keys if needed
apiClient.interceptors.request.use((config) => {
  const apiKey = localStorage.getItem('api_key');
  if (apiKey) {
    config.headers['X-API-Key'] = apiKey;
  }
  return config;
});

// Helper function to handle errors
const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with an error status
    const errorMsg = error.response.data.detail || error.message;
    throw new Error(errorMsg);
  } else if (error.request) {
    // The request was made but no response was received
    throw new Error('No response received from server. Please check your connection.');
  } else {
    // Something happened in setting up the request
    throw new Error(`Error: ${error.message}`);
  }
};

// API functions
export const analyzePrompt = async (promptData) => {
  try {
    const response = await apiClient.post('/prompts/analyze', promptData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const batchAnalyzePrompts = async (batchData) => {
  try {
    const response = await apiClient.post('/prompts/batch-analyze', batchData);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const getAvailableModels = async () => {
  try {
    const response = await apiClient.get('/models');
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const getModelDetails = async (modelId) => {
  try {
    const response = await apiClient.get(`/models/${modelId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const getExamplePrompts = async () => {
  try {
    const response = await apiClient.get('/prompts/examples');
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const getAnalytics = async (startDate, endDate) => {
  try {
    const params = {};
    if (startDate) params.start_date = startDate.toISOString();
    if (endDate) params.end_date = endDate.toISOString();
    
    const config = { params };
    const response = await apiClient.get('/stats', config);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const checkApiHealth = async () => {
  try {
    const response = await apiClient.get('/health');
    return response.data.status === 'healthy';
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};