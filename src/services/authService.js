import apiClient from "./apiService";
import { API_ENDPOINTS } from "../constants/api";

/**
 * Authentication service - handles all auth-related API calls
 */

export const authService = {
  /**
   * Check if email exists in the system
   * @param {string} email
   * @returns {Promise<{exists: boolean}>}
   */
  checkEmail: async (email) => {
    const response = await apiClient.post(API_ENDPOINTS.CHECK_EMAIL, { email });
    return response.data;
  },

  /**
   * Send OTP to email
   * @param {string} email
   * @returns {Promise<{message: string}>}
   */
  sendOtp: async (email) => {
    const response = await apiClient.post(API_ENDPOINTS.SEND_OTP, { email });
    return response.data;
  },

  /**
   * Verify OTP
   * @param {string} email
   * @param {string} otp
   * @returns {Promise<{valid: boolean}>}
   */
  verifyOtp: async (email, otp) => {
    const response = await apiClient.post(API_ENDPOINTS.VERIFY_OTP, {
      email,
      otp
    });
    return response.data;
  },

  /**
   * Register a new candidate
   * @param {Object} payload - {email, otp, fullName, phone, password}
   * @returns {Promise<{message: string}>}
   */
  register: async (payload) => {
    const response = await apiClient.post(API_ENDPOINTS.REGISTER, payload);
    return response.data;
  },

  /**
   * Login with email and password
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{message: string}>}
   */
  login: async (email, password) => {
    const response = await apiClient.post(API_ENDPOINTS.LOGIN, {
      email,
      password
    });
    return response.data;
  },

  /**
   * Refresh access token using refresh token
   * @returns {Promise<{message: string}>}
   */
  refreshToken: async () => {
    const response = await apiClient.post(API_ENDPOINTS.REFRESH_TOKEN);
    return response.data;
  },

  /**
   * Logout the current user
   * @returns {Promise<{message: string}>}
   */
  logout: async () => {
    const response = await apiClient.post(API_ENDPOINTS.LOGOUT);
    return response.data;
  },

  /**
   * Change password for the current user
   * This API call will:
   * 1. Update the password in the database
   * 2. Set password_changed = TRUE in candidate_login table
   * 3. Return the updated passwordChanged status
   * @param {string} currentPassword
   * @param {string} newPassword
   * @returns {Promise<{message: string, success: boolean, passwordChanged: boolean}>}
   */
  changePassword: async (currentPassword, newPassword) => {
    const response = await apiClient.post(API_ENDPOINTS.CHANGE_PASSWORD, {
      currentPassword,
      newPassword
    });
    return response.data;
  },

  /**
   * Send OTP for forgot password
   * @param {string} email
   * @returns {Promise<{message: string, success: boolean}>}
   */
  sendForgotPasswordOtp: async (email) => {
    const response = await apiClient.post(API_ENDPOINTS.FORGOT_PASSWORD_SEND_OTP, { email });
    return response.data;
  },

  /**
   * Reset password using OTP (forgot password flow)
   * This API call will:
   * 1. Verify the OTP
   * 2. Update the password in the database
   * 3. Set password_changed = TRUE in candidate_login table
   * 4. Return the updated passwordChanged status
   * @param {string} email
   * @param {string} otp
   * @param {string} newPassword
   * @returns {Promise<{message: string, success: boolean, passwordChanged: boolean}>}
   */
  resetPassword: async (email, otp, newPassword) => {
    const response = await apiClient.post(API_ENDPOINTS.FORGOT_PASSWORD_RESET, {
      email,
      otp,
      newPassword
    });
    return response.data;
  },

  /**
   * Get current candidate information (after login)
   * @param {boolean} suppressLogging - If true, suppresses logging for this request (used during session check)
   * @returns {Promise<{candidate: object}>}
   */
  getMe: async (suppressLogging = false) => {
    const config = suppressLogging ? {
      _suppressLogging: true,
      _isSessionCheck: true
    } : {};
    const response = await apiClient.get("/auth/me", config);
    // Normalize response: extract candidate object
    if (response.data && response.data.candidate) {
      return response.data.candidate;
    }
    return response.data;
  }
};

