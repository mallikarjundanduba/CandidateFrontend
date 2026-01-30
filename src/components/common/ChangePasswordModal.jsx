import React, { useState } from "react";
import { X, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { authService } from "../../services/authService";

const ChangePasswordModal = ({ isOpen, onClose, onSuccess, forceOpen = false }) => {
  const [mode, setMode] = useState("change"); // "change" or "forgot"
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Forgot password fields
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    if (currentPassword === newPassword) {
      setError("New password must be different from current password");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Call API to change password - this will also update password_changed status to true in backend
      console.log("Calling change password API...");
      const response = await authService.changePassword(currentPassword, newPassword);
      
      if (response.success) {
        console.log("Password changed successfully. Response:", response);
        
        // Get the updated passwordChanged status from API response
        // Backend sets password_changed = TRUE and returns it in the response
        const updatedPasswordChanged = response.passwordChanged !== undefined ? response.passwordChanged : true;
        console.log("Updated passwordChanged status from API:", updatedPasswordChanged);
        
        setSuccess("Password changed successfully! Your password has been updated.");
        
        // Reset form
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        
        // Call onSuccess callback with the updated status
        // This will update passwordChanged status in parent components and refresh profile
        setTimeout(() => {
          if (onSuccess) {
            console.log("Calling onSuccess callback with passwordChanged status:", updatedPasswordChanged);
            onSuccess(updatedPasswordChanged);
          }
          // Only close if not forced open (passwordChanged was false)
          if (!forceOpen) {
            onClose();
          }
        }, 1500);
      } else {
        setError(response.message || "Failed to change password. Please check your current password.");
      }
    } catch (err) {
      console.error("Error changing password:", err);
      setError(err.response?.data?.message || "An error occurred while changing password");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setError("");
    setSuccess("");
    
    if (!forgotEmail || !forgotEmail.trim()) {
      setError("Please enter your email address");
      return;
    }

    setSendingOtp(true);
    try {
      const response = await authService.sendForgotPasswordOtp(forgotEmail.trim());
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

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!forgotEmail || !otp || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Call API to reset password - this will also update password_changed status to true in backend
      console.log("Calling reset password API...");
      const response = await authService.resetPassword(forgotEmail.trim(), otp.trim(), newPassword);
      
      if (response.success) {
        console.log("Password reset successfully. Response:", response);
        
        // Get the updated passwordChanged status from API response
        // Backend sets password_changed = TRUE and returns it in the response
        const updatedPasswordChanged = response.passwordChanged !== undefined ? response.passwordChanged : true;
        console.log("Updated passwordChanged status from API:", updatedPasswordChanged);
        
        setSuccess("Password reset successfully!");
        
        // Reset form
        setForgotEmail("");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
        setOtpSent(false);
        
        // Call onSuccess callback with the updated status
        setTimeout(() => {
          if (onSuccess) {
            console.log("Calling onSuccess callback with passwordChanged status:", updatedPasswordChanged);
            onSuccess(updatedPasswordChanged);
          }
          handleClose();
        }, 1500);
      } else {
        setError(response.message || "Failed to reset password. Please check your OTP.");
      }
    } catch (err) {
      console.error("Error resetting password:", err);
      setError(err.response?.data?.message || "An error occurred while resetting password");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setForgotEmail("");
    setOtp("");
    setOtpSent(false);
    setMode("change");
    setError("");
    setSuccess("");
    onClose();
  };

  const switchToForgotPassword = () => {
    setMode("forgot");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess("");
  };

  const switchToChangePassword = () => {
    setMode("change");
    setForgotEmail("");
    setOtp("");
    setOtpSent(false);
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6 relative">
        {/* Close Button - Hide if forced open (passwordChanged is false) */}
        {!forceOpen && (
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        
        {/* Warning Message if forced to change password */}
        {forceOpen && (
          <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-400 font-medium">
              ⚠️ You must change your password before continuing.
            </p>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#3631A4]/10 rounded-lg">
            {mode === "forgot" ? (
              <Mail className="h-5 w-5 text-[#3631A4]" />
            ) : (
              <Lock className="h-5 w-5 text-[#3631A4]" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {mode === "forgot" ? "Forgot Password" : "Change Password"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {mode === "forgot" 
                ? "Reset your password using OTP" 
                : "Update your account password"}
            </p>
          </div>
        </div>

        {/* Form */}
        {mode === "change" ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2.5 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#3631A4] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter current password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#3631A4] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter new password (min 6 characters)"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showNewPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#3631A4] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Confirm new password"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
            </div>
          )}

            {/* Forgot Password Link */}
            <div className="text-right">
              <button
                type="button"
                onClick={switchToForgotPassword}
                className="text-sm text-[#3631A4] hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              {!forceOpen && (
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className={`${forceOpen ? 'w-full' : 'flex-1'} px-4 py-2.5 bg-[#3631A4] hover:bg-[#2a2569] disabled:bg-[#3631A4]/50 text-white rounded-lg transition-colors font-medium`}
              >
                {loading ? "Changing..." : "Change Password"}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#3631A4] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter your email"
                required
                disabled={otpSent}
              />
            </div>

            {/* Send OTP Button */}
            {!otpSent && (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={sendingOtp}
                className="w-full px-4 py-2.5 bg-[#3631A4] hover:bg-[#2a2569] disabled:bg-[#3631A4]/50 text-white rounded-lg transition-colors font-medium"
              >
                {sendingOtp ? "Sending..." : "Send OTP"}
              </button>
            )}

            {/* OTP Input */}
            {otpSent && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#3631A4] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-center text-2xl tracking-widest"
                    placeholder="000000"
                    maxLength={6}
                    required
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Check your email for the OTP code
                  </p>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2.5 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#3631A4] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter new password (min 6 characters)"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2.5 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#3631A4] focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Confirm new password"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-sm text-green-600 dark:text-green-400">{success}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={otpSent ? switchToChangePassword : handleClose}
                className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                {otpSent ? "Back" : "Cancel"}
              </button>
              {otpSent && (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 bg-[#3631A4] hover:bg-[#2a2569] disabled:bg-[#3631A4]/50 text-white rounded-lg transition-colors font-medium"
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordModal;

