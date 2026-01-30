import axios from "axios";
import { AI_BACKEND_URL } from "../constants/api";

/**
 * Axios instance configured for AI Backend (Python) API calls
 * This is used for direct communication with the Python backend for AI features
 */
const aiBackendClient = axios.create({
  baseURL: AI_BACKEND_URL,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 60000 // 60 seconds timeout for AI generation
});

// Request interceptor
aiBackendClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
aiBackendClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle errors - preserve the original error structure for better handling
    if (error.response) {
      // Server responded with error status
      // Preserve the error response structure so components can access error.response.data
      const errorMessage = error.response.data?.detail || error.response.data?.message || error.message;
      error.message = errorMessage;
      return Promise.reject(error);
    } else if (error.request) {
      // Request was made but no response received
      return Promise.reject(new Error("AI backend is not responding. Please check if the service is running."));
    } else {
      // Something else happened
      return Promise.reject(error);
    }
  }
);

export default aiBackendClient;

