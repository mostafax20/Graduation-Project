 # Prompt Injection Protection Tester - Complete Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Installation & Setup](#installation--setup)
6. [API Documentation](#api-documentation)
7. [Component Documentation](#component-documentation)
8. [Hooks Documentation](#hooks-documentation)
9. [Services Documentation](#services-documentation)
10. [Pages Documentation](#pages-documentation)
11. [Configuration](#configuration)
12. [Development Guidelines](#development-guidelines)
13. [Deployment](#deployment)
14. [Troubleshooting](#troubleshooting)

## Project Overview

The **Prompt Injection Protection Tester** is a React-based web application designed to test and analyze prompts against potential injection attacks. The application provides a comprehensive testing environment for evaluating the effectiveness of protection layers in Large Language Model (LLM) systems.

### Key Features
- **Individual Prompt Testing**: Test single prompts against protection layers
- **Batch Testing**: Process multiple prompts simultaneously
- **Analytics Dashboard**: Comprehensive insights and visualizations
- **Multiple LLM Support**: Test against various language models
- **Real-time Analysis**: Instant feedback on prompt safety
- **Example Prompts**: Pre-built examples for testing

### Use Cases
- Security researchers testing prompt injection vulnerabilities
- AI developers validating protection mechanisms
- Organizations auditing their LLM security measures
- Educational purposes for understanding prompt injection techniques

## Architecture

The application follows a modern React architecture with the following patterns:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Components    │    │      Hooks      │    │     Services    │
│                 │    │                 │    │                 │
│ - UI Components │◄──►│ - useApi        │◄──►│ - API Client    │
│ - Pages         │    │ - useLocalStorage│   │ - HTTP Requests │
│ - Forms         │    │                 │    │ - Error Handling│
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   State Mgmt    │    │   Routing       │    │   External API  │
│                 │    │                 │    │                 │
│ - React State   │    │ - React Router  │    │ - Backend API   │
│ - Local Storage │    │ - Navigation    │    │ - Model APIs    │
│ - Context       │    │ - Route Guards  │    │ - Analytics     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Technology Stack

### Frontend
- **React 19.1.0**: Modern React with latest features
- **Vite 6.3.5**: Fast build tool and development server
- **Chakra UI 2.8.2**: Component library for consistent UI
- **React Router DOM 7.6.0**: Client-side routing
- **Axios 1.9.0**: HTTP client for API requests
- **Recharts 2.15.3**: Data visualization library
- **Framer Motion 6.5.1**: Animation library
- **React Icons 5.5.0**: Icon library

### Development Tools
- **ESLint 9.25.0**: Code linting and formatting
- **TypeScript Types**: Type definitions for better development experience

## Project Structure

```
Tester_V2/
├── public/                     # Static assets
│   └── vite.svg
├── src/
│   ├── assets/                 # Images and static files
│   │   └── react.svg
│   ├── components/             # Reusable UI components
│   │   ├── analytics/          # Analytics-specific components
│   │   │   ├── AnalyticsChart.jsx
│   │   │   └── StatsCards.jsx
│   │   ├── batch/              # Batch testing components
│   │   │   ├── BatchPromptForm.jsx
│   │   │   └── BatchResultsTable.jsx
│   │   ├── common/             # Shared components
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   └── prompt/             # Prompt testing components
│   │       ├── ExamplePromptsMenu.jsx
│   │       ├── LLMResponseCard.jsx
│   │       ├── ModelSelector.jsx
│   │       ├── PromptForm.jsx
│   │       └── ProtectionResultCard.jsx
│   ├── hooks/                  # Custom React hooks
│   │   ├── useApi.jsx
│   │   └── useLocalStorage.jsx
│   ├── pages/                  # Page components
│   │   ├── AboutPage.jsx
│   │   ├── AnalyticsPage.jsx
│   │   ├── BatchTestPage.jsx
│   │   ├── HomePage.jsx
│   │   └── TestPage.jsx
│   ├── services/               # API and external services
│   │   └── api.jsx
│   ├── App.css                 # Global styles
│   ├── App.jsx                 # Main application component
│   ├── index.css               # Base styles
│   ├── main.jsx                # Application entry point
│   └── theme.js                # Chakra UI theme configuration
├── index.html                  # HTML template
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
└── eslint.config.js            # ESLint configuration
```

## Installation & Setup

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Tester_V2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:8000/api/v1
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build

## API Documentation

### Base Configuration
The application uses Axios for HTTP requests with the following configuration:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});
```

### API Endpoints

#### 1. Prompt Analysis
```javascript
POST /prompts/analyze
```
**Purpose**: Analyze a single prompt for injection attempts

**Request Body**:
```json
{
  "text": "string",
  "model_name": "string"
}
```

**Response**:
```json
{
  "protection_result": {
    "is_safe": boolean,
    "confidence": number,
    "reason": "string",
    "details": object
  },
  "llm_response": "string",
  "processing_time": number
}
```

#### 2. Batch Prompt Analysis
```javascript
POST /prompts/batch-analyze
```
**Purpose**: Analyze multiple prompts simultaneously

**Request Body**:
```json
{
  "prompts": [
    {"text": "string"}
  ],
  "model_name": "string"
}
```

**Response**:
```json
{
  "results": [
    {
      "prompt": "string",
      "protection_result": object,
      "llm_response": "string",
      "processing_time": number
    }
  ],
  "summary": {
    "total_prompts": number,
    "safe_prompts": number,
    "average_confidence": number,
    "average_processing_time": number
  }
}
```

#### 3. Available Models
```javascript
GET /models
```
**Purpose**: Get list of available LLM models

**Response**:
```json
{
  "models": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "capabilities": ["string"]
    }
  ]
}
```

#### 4. Model Details
```javascript
GET /models/{modelId}
```
**Purpose**: Get detailed information about a specific model

**Response**:
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "capabilities": ["string"],
  "parameters": object,
  "performance_metrics": object
}
```

#### 5. Example Prompts
```javascript
GET /prompts/examples
```
**Purpose**: Get pre-built example prompts for testing

**Response**:
```json
{
  "examples": [
    {
      "id": "string",
      "text": "string",
      "category": "string",
      "description": "string"
    }
  ]
}
```

#### 6. Analytics Data
```javascript
GET /stats
```
**Purpose**: Get analytics and statistics data

**Query Parameters**:
- `start_date`: ISO date string (optional)
- `end_date`: ISO date string (optional)

**Response**:
```json
{
  "summary": {
    "total_prompts": number,
    "safe_prompts": number,
    "average_confidence": number,
    "average_processing_time": number
  },
  "daily_data": [
    {
      "date": "string",
      "total_prompts": number,
      "safe_prompts": number
    }
  ],
  "model_usage": [
    {
      "model": "string",
      "usage_count": number
    }
  ],
  "injection_patterns": [
    {
      "pattern": "string",
      "detection_count": number
    }
  ]
}
```

#### 7. Health Check
```javascript
GET /health
```
**Purpose**: Check API health status

**Response**:
```json
{
  "status": "healthy",
  "timestamp": "string"
}
```

## Component Documentation

### Core Components

#### 1. App.jsx
**Location**: `src/App.jsx`
**Purpose**: Main application component with routing setup

**Features**:
- Chakra UI provider setup
- React Router configuration
- Layout structure with header, content, and footer

**Props**: None
**State**: None

#### 2. Header.jsx
**Location**: `src/components/common/Header.jsx`
**Purpose**: Application header with navigation

**Features**:
- Navigation menu
- Responsive design
- Brand/logo display

#### 3. Footer.jsx
**Location**: `src/components/common/Footer.jsx`
**Purpose**: Application footer

**Features**:
- Copyright information
- Links to additional resources
- Version information

### Prompt Testing Components

#### 1. PromptForm.jsx
**Location**: `src/components/prompt/PromptForm.jsx`
**Purpose**: Main form for individual prompt testing

**State**:
- `promptText`: Current prompt input
- `selectedModel`: Selected LLM model
- `examplePrompts`: Available example prompts

**Features**:
- Text input for prompts
- Model selection
- Example prompts menu
- Form validation
- Loading states
- Error handling

**Props**: None

#### 2. ModelSelector.jsx
**Location**: `src/components/prompt/ModelSelector.jsx`
**Purpose**: Dropdown for selecting LLM models

**Props**:
- `selectedModel`: Currently selected model
- `onSelectModel`: Callback for model selection
- `isDisabled`: Disable the selector

#### 3. ProtectionResultCard.jsx
**Location**: `src/components/prompt/ProtectionResultCard.jsx`
**Purpose**: Display protection analysis results

**Props**:
- `result`: Protection analysis result object

**Features**:
- Safety status display
- Confidence visualization
- Detailed reasoning
- Expandable details section

#### 4. LLMResponseCard.jsx
**Location**: `src/components/prompt/LLMResponseCard.jsx`
**Purpose**: Display LLM response when prompt is safe

**Props**:
- `response`: LLM response text

### Batch Testing Components

#### 1. BatchPromptForm.jsx
**Location**: `src/components/batch/BatchPromptForm.jsx`
**Purpose**: Form for batch prompt testing

**State**:
- `prompts`: Array of prompt inputs
- `inputMethod`: Input method (manual/bulk/random)
- `bulkInput`: Bulk text input
- `separator`: Separator for bulk input
- `selectedModel`: Selected LLM model

**Features**:
- Multiple input methods
- Dynamic prompt addition/removal
- Bulk text processing
- Random prompt generation
- Form validation

#### 2. BatchResultsTable.jsx
**Location**: `src/components/batch/BatchResultsTable.jsx`
**Purpose**: Display batch testing results

**Props**:
- `results`: Array of batch results
- `summary`: Summary statistics

**Features**:
- Tabular results display
- Sorting capabilities
- Export functionality
- Summary statistics

### Analytics Components

#### 1. StatsCards.jsx
**Location**: `src/components/analytics/StatsCards.jsx`
**Purpose**: Display key statistics cards

**Props**:
- `summary`: Summary statistics object
- `previousSummary`: Previous period summary (optional)

**Features**:
- Four key metrics display
- Percentage change indicators
- Responsive grid layout

#### 2. AnalyticsChart.jsx
**Location**: `src/components/analytics/AnalyticsChart.jsx`
**Purpose**: Data visualization charts

**Props**:
- `data`: Analytics data
- `type`: Chart type (daily/safety/models/patterns)
- `title`: Chart title

**Features**:
- Multiple chart types
- Interactive visualizations
- Responsive design

### Common Components

#### 1. ErrorBoundary.jsx
**Location**: `src/components/common/ErrorBoundary.jsx`
**Purpose**: React error boundary for error handling

**Features**:
- Catches JavaScript errors
- Displays fallback UI
- Error logging

#### 2. LoadingSpinner.jsx
**Location**: `src/components/common/LoadingSpinner.jsx`
**Purpose**: Loading indicator component

**Props**:
- `size`: Spinner size
- `text`: Loading text

## Hooks Documentation

### 1. useApi.jsx
**Location**: `src/hooks/useApi.jsx`

**Purpose**: Custom hook for API calls with loading and error states

**Usage**:
```javascript
const { data, loading, error, execute, reset } = useApi(apiFunction);
```

**Returns**:
- `data`: API response data
- `loading`: Loading state boolean
- `error`: Error object if any
- `execute`: Function to execute API call
- `reset`: Function to reset state

**Variants**:
- `useApi(apiFunction)`: For API calls with parameters
- `useApiNoParams(apiFunction)`: For API calls without parameters

### 2. useLocalStorage.jsx
**Location**: `src/hooks/useLocalStorage.jsx`

**Purpose**: Custom hook for localStorage management

**Usage**:
```javascript
const [value, setValue] = useLocalStorage('key', defaultValue);
```

**Returns**:
- `value`: Current stored value
- `setValue`: Function to update stored value

## Services Documentation

### api.jsx
**Location**: `src/services/api.jsx`

**Purpose**: Centralized API service layer

**Features**:
- Axios client configuration
- Request/response interceptors
- Error handling
- API key management
- Health check functionality

**Key Functions**:
- `analyzePrompt(promptData)`: Analyze single prompt
- `batchAnalyzePrompts(batchData)`: Analyze multiple prompts
- `getAvailableModels()`: Get available LLM models
- `getModelDetails(modelId)`: Get specific model details
- `getExamplePrompts()`: Get example prompts
- `getAnalytics(startDate, endDate)`: Get analytics data
- `checkApiHealth()`: Check API health status

## Pages Documentation

### 1. HomePage.jsx
**Location**: `src/pages/HomePage.jsx`
**Route**: `/`

**Purpose**: Landing page with feature overview and navigation

**Features**:
- Hero section with call-to-action
- Feature highlights
- Getting started guide
- API status indicator

### 2. TestPage.jsx
**Location**: `src/pages/TestPage.jsx`
**Route**: `/test`

**Purpose**: Individual prompt testing page

**Features**:
- Prompt input form
- Model selection
- Results display
- Example prompts

### 3. BatchTestPage.jsx
**Location**: `src/pages/BatchTestPage.jsx`
**Route**: `/batch`

**Purpose**: Batch prompt testing page

**Features**:
- Multiple input methods
- Batch processing
- Results table
- Export functionality

### 4. AnalyticsPage.jsx
**Location**: `src/pages/AnalyticsPage.jsx`
**Route**: `/analytics`

**Purpose**: Analytics dashboard page

**Features**:
- Statistics cards
- Data visualizations
- Date range selection
- Auto-refresh functionality

### 5. AboutPage.jsx
**Location**: `src/pages/AboutPage.jsx`
**Route**: `/about`

**Purpose**: Information about the application

**Features**:
- Project description
- Technology stack
- Usage guidelines
- Contact information

## Configuration

### Environment Variables
- `VITE_API_URL`: Backend API URL (default: `http://localhost:8000/api/v1`)

### Theme Configuration
**Location**: `src/theme.js`

**Features**:
- Custom color palette
- Typography settings
- Component style overrides
- Responsive design tokens

### Vite Configuration
**Location**: `vite.config.js`

**Features**:
- React plugin configuration
- Build optimization
- Development server settings

### ESLint Configuration
**Location**: `eslint.config.js`

**Features**:
- React-specific rules
- Hooks rules
- Code formatting standards

## Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Implement proper error handling
- Use TypeScript-like prop validation
- Maintain consistent naming conventions

### Component Structure
```javascript
import React from 'react';
import { ComponentProps } from '@chakra-ui/react';

const ComponentName = ({ prop1, prop2 }) => {
  // State and hooks
  const [state, setState] = useState(initialValue);
  
  // Event handlers
  const handleEvent = () => {
    // Event logic
  };
  
  // Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  // Render
  return (
    <Component>
      {/* JSX content */}
    </Component>
  );
};

export default ComponentName;
```

### State Management
- Use React's built-in state management
- Implement custom hooks for reusable logic
- Use localStorage for persistence when needed
- Avoid prop drilling with proper component composition

### Error Handling
- Implement error boundaries for component errors
- Use try-catch blocks for async operations
- Display user-friendly error messages
- Log errors for debugging

### Performance Optimization
- Use React.memo for expensive components
- Implement proper dependency arrays in useEffect
- Lazy load components when appropriate
- Optimize re-renders with useCallback and useMemo

## Deployment

### Build Process
1. Run `npm run build` to create production build
2. Build artifacts are created in `dist/` directory
3. Deploy `dist/` contents to web server

### Environment Setup
1. Set `VITE_API_URL` to production API endpoint
2. Configure CORS on backend if needed
3. Set up proper SSL certificates

### Deployment Options
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: CloudFlare, AWS CloudFront
- **Container**: Docker with nginx
- **Server**: Apache, nginx, or Node.js server

### Docker Deployment
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Troubleshooting

### Common Issues

#### 1. API Connection Errors
**Symptoms**: Network errors, timeout errors
**Solutions**:
- Check `VITE_API_URL` environment variable
- Verify backend server is running
- Check CORS configuration
- Test API endpoints directly

#### 2. Build Errors
**Symptoms**: Build fails, missing dependencies
**Solutions**:
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for version conflicts in package.json
- Update dependencies: `npm update`
- Check for syntax errors in code

#### 3. Runtime Errors
**Symptoms**: JavaScript errors in browser console
**Solutions**:
- Check browser console for specific error messages
- Verify all required props are passed to components
- Check for undefined/null values
- Review error boundary implementation

#### 4. Performance Issues
**Symptoms**: Slow loading, unresponsive UI
**Solutions**:
- Check for infinite re-renders
- Optimize component dependencies
- Implement proper memoization
- Check for memory leaks

### Debug Tools
- React Developer Tools browser extension
- Network tab for API debugging
- Console logging for state debugging
- Performance profiling tools

### Logging
- Use console.log for development debugging
- Implement proper error logging
- Monitor API response times
- Track user interactions for analytics

---

## Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make changes following coding standards
4. Test thoroughly
5. Submit a pull request

### Testing
- Test all user flows
- Verify API integration
- Check responsive design
- Validate accessibility

### Documentation Updates
- Update this documentation for new features
- Maintain API documentation
- Keep installation instructions current
- Document breaking changes

---

*This documentation covers the complete Prompt Injection Protection Tester application. For additional support or questions, please refer to the project repository or contact the development team.*