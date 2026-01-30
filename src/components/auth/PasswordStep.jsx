import React, { useState } from "react";
import { Lock, AlertCircle, Mail, CheckCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/slices/authSlice";
import { setProfile } from "../../store/slices/profileSlice";
import { authService } from "../../services/authService";

const PasswordStep = ({ email, onLoggedIn, onNeedsPayment, onPasswordChanged }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Forgot password states
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Use Redux thunk for login - profile data is included in login response
      const result = await dispatch(loginUser({ email, password }));

      if (loginUser.fulfilled.match(result)) {
        const response = result.payload;

        // Profile data is already stored in localStorage by the thunk
        // Set profile in Redux state
        if (response.profile) {
          dispatch(setProfile(response.profile));
        }

        // Handle passwordChanged flag
        if (response.passwordChanged !== undefined && onPasswordChanged) {
          onPasswordChanged(response.passwordChanged);
        }

        // Navigate based on registration/payment status
        if (response.registrationPaid && !response.needsPayment) {
          onLoggedIn();
        } else if (response.needsPayment) {
          if (onNeedsPayment) {
            onNeedsPayment();
          } else {
            onLoggedIn();
          }
        } else {
          onLoggedIn();
        }
      } else {
        // Login failed
        setError(result.payload || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setError("");
    setSuccess("");
    
    if (!email || !email.trim()) {
      setError("Email is required");
      return;
    }

    setSendingOtp(true);
    try {
      const response = await authService.sendForgotPasswordOtp(email.trim());
      if (response.success) {
        setSuccess("OTP sent successfully to your email!");
        setOtpSent(true);
      } else {
        setError(response.message || "Failed to send OTP");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleUpdatePassword = async () => {
    setError("");
    setSuccess("");

    if (!otp || otp.trim().length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    setUpdatingPassword(true);
    try {
      // This will verify OTP and update password in one call
      const response = await authService.resetPassword(email.trim(), otp.trim(), newPassword);
      
      if (response.success) {
        setSuccess("Password updated successfully! You can now login.");
        setOtpVerified(true);
      } else {
        setError(response.message || "Failed to update password. Please check your OTP.");
        setOtpVerified(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while updating password. Please check your OTP.");
      setOtpVerified(false);
    } finally {
      setUpdatingPassword(false);
    }
  };

  const handleLoginAfterReset = async () => {
    if (!newPassword || newPassword.length < 6) {
      setError("Please update your password first");
      return;
    }

    // Use the new password to login
    setPassword(newPassword);
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      setLoading(true);
      setError("");

      // Use Redux thunk for login after password reset
      const result = await dispatch(loginUser({ email, password: newPassword }));

      if (loginUser.fulfilled.match(result)) {
        const response = result.payload;

        // Profile data is already stored in localStorage by the thunk
        // Set profile in Redux state
        if (response.profile) {
          dispatch(setProfile(response.profile));
        }

        // Handle passwordChanged flag
        if (response.passwordChanged !== undefined && onPasswordChanged) {
          onPasswordChanged(response.passwordChanged);
        }

        // Navigate based on registration/payment status
        if (response.registrationPaid && !response.needsPayment) {
          onLoggedIn();
        } else if (response.needsPayment) {
          if (onNeedsPayment) {
            onNeedsPayment();
          } else {
            onLoggedIn();
          }
        } else {
          onLoggedIn();
        }
      } else {
        // Login failed
        setError(result.payload || "Login failed. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setOtpSent(false);
    setOtpVerified(false);
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess("");
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <img src="/logo.png" alt="KareerGrowth Logo" className="h-12 w-auto" />
            </div>
            <h1 className="text-lg font-semibold text-gray-900 mb-1">Forgot Password</h1>
            <p className="text-gray-600 text-xs">Reset your password using OTP</p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="mb-4">
              <p className="text-gray-700 text-xs">
                Account: <span className="font-semibold text-gray-900">{email}</span>
              </p>
            </div>

            <div className="space-y-3">
              {/* Send OTP Section */}
              {!otpSent && (
                <>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={sendingOtp}
                    className="w-full py-2 px-4 bg-purple-900 hover:bg-purple-800 text-white font-medium text-xs rounded-md transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
                  >
                    {sendingOtp ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        Send OTP to Email
                      </>
                    )}
                  </button>
                </>
              )}

              {/* OTP Input Section */}
              {otpSent && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-gray-900 mb-1.5">
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      disabled={updatingPassword || otpVerified}
                      autoFocus
                      placeholder="000000"
                      maxLength={6}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition text-center text-lg tracking-widest disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                    <p className="text-[10px] text-gray-500 mt-1">Check your email for the OTP code</p>
                  </div>

                  {/* New Password - Show after OTP is entered (6 digits) */}
                  {otp && otp.length === 6 && (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-gray-900 mb-1.5">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          disabled={updatingPassword || otpVerified}
                          placeholder="Enter new password (min 6 characters)"
                          className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <label className="block text-xs font-medium text-gray-900 mb-1.5">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          disabled={updatingPassword || otpVerified}
                          placeholder="Confirm new password"
                          className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                      </div>

                      {/* Show 2 buttons: Update Password and Login */}
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={handleUpdatePassword}
                          disabled={updatingPassword || otpVerified || !newPassword || newPassword.length < 6 || newPassword !== confirmPassword}
                          className="flex-1 py-2 px-4 bg-purple-900 hover:bg-purple-800 text-white font-medium text-xs rounded-md transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
                        >
                          {updatingPassword ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Updating...
                            </>
                          ) : (
                            "Update Password"
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={handleLoginAfterReset}
                          disabled={loading || !otpVerified || !newPassword || newPassword.length < 6}
                          className="flex-1 py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-medium text-xs rounded-md transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Logging in...
                            </>
                          ) : (
                            "Login"
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}

              {/* Success Message */}
              {success && (
                <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded-md">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <p className="text-xs text-green-600">{success}</p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-md">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <p className="text-xs text-red-600">{error}</p>
                </div>
              )}

              {/* Back to Login */}
              <button
                type="button"
                onClick={handleBackToLogin}
                className="w-full py-2 px-4 text-gray-600 hover:text-gray-900 text-xs font-medium transition"
              >
                ← Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <img src="/logo.png" alt="KareerGrowth Logo" className="h-12 w-auto" />
          </div>
          <h1 className="text-lg font-semibold text-gray-900 mb-1">Welcome Back</h1>
          <p className="text-gray-600 text-xs">Enter your password to continue</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="mb-4">
            <p className="text-gray-700 text-xs">
              Account found for <span className="font-semibold text-gray-900">{email}</span>
            </p>
            <p className="text-gray-600 text-xs mt-1">
              Please enter your password to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Password Input */}
            <div>
              <label className="block text-xs font-medium text-gray-900 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                autoFocus
                placeholder="Enter your password"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-xs text-purple-600 hover:text-purple-800 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <p className="text-xs text-red-600">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded-md">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <p className="text-xs text-green-600">{success}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-2 px-4 bg-purple-900 hover:bg-purple-800 text-white font-medium text-xs rounded-md transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-[10px] text-gray-500 mt-4">
            🔒 Your password is securely encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordStep;

