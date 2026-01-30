// All URLs must be set in .env file
if (!process.env.API_BASE_URL) {
  throw new Error("API_BASE_URL is not set in .env file");
}
if (!process.env.ADMIN_BACKEND_URL) {
  throw new Error("ADMIN_BACKEND_URL is not set in .env file");
}
if (!process.env.AI_BACKEND_URL) {
  throw new Error("AI_BACKEND_URL is not set in .env file");
}

export const API_BASE_URL = process.env.API_BASE_URL;
export const ADMIN_BACKEND_URL = process.env.ADMIN_BACKEND_URL;
export const AI_BACKEND_URL = process.env.AI_BACKEND_URL; // Python AI Backend

export const API_ENDPOINTS = {
  CHECK_EMAIL: "/auth/check-email",
  SEND_OTP: "/auth/send-otp",
  VERIFY_OTP: "/auth/verify-otp",
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  REFRESH_TOKEN: "/auth/refresh-token",
  LOGOUT: "/auth/logout",
  CHANGE_PASSWORD: "/auth/change-password",
  FORGOT_PASSWORD_SEND_OTP: "/auth/forgot-password/send-otp",
  FORGOT_PASSWORD_RESET: "/auth/forgot-password/reset",
  CREATE_PAYMENT_ORDER: "/payments/create-order",
  VERIFY_PAYMENT: "/payments/verify-payment"
};

export const REGISTRATION_FEE = 4900; // ₹49 in paise

