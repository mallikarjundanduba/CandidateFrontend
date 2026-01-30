import axios from "axios";
import { API_BASE_URL } from "../constants/api";

/**
 * Axios instance configured for API calls
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add any auth headers if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle 401 errors and refresh token if needed
    if (error.response?.status === 401) {
      // Could implement token refresh logic here
    }
    return Promise.reject(error);
  }
);

export default apiClient;

