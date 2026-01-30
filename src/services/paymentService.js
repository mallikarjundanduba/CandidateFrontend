import apiClient from "./apiService";
import { API_ENDPOINTS, REGISTRATION_FEE } from "../constants/api";

/**
 * Payment service - handles payment-related API calls
 */

export const paymentService = {
  /**
   * Create a payment order for registration fee
   * @param {string} email
   * @returns {Promise<{orderId: string, key: string}>}
   */
  createPaymentOrder: async (email, amount) => {
    const fee = amount || REGISTRATION_FEE;
    const response = await apiClient.post(API_ENDPOINTS.CREATE_PAYMENT_ORDER, {
      email,
      amount: fee
    });
    return response.data;
  },

  /**
   * Verify payment after successful Razorpay transaction
   * @param {Object} paymentData - {orderId, paymentId, signature}
   * @returns {Promise<{message: string}>}
   */
  verifyPayment: async (paymentData) => {
    const response = await apiClient.post(API_ENDPOINTS.VERIFY_PAYMENT, paymentData);
    return response.data;
  }
};

