import React, { useState } from "react";
import { Shield, AlertCircle, RotateCw, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

const OtpStep = ({ email, onVerified }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [displayEmail, setDisplayEmail] = useState(email || "");
  const navigate = useNavigate();

  // Update displayEmail when email prop changes
  React.useEffect(() => {
    if (email) {
      setDisplayEmail(email);
    } else {
      // Try to get from localStorage
      const pendingEmail = localStorage.getItem("pendingEmail");
      if (pendingEmail) {
        setDisplayEmail(pendingEmail);
      }
    }
  }, [email]);

  const handleBack = () => {
    // Clear OTP and navigate back to login
    setOtp("");
    setError("");
    navigate("/login", { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!displayEmail) {
      setError("Email not found. Please go back to login.");
      return;
    }

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      const result = await authService.verifyOtp(displayEmail, otp);

      if (result.valid) {
        onVerified(otp);
      } else {
        setError("Invalid or expired OTP. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "OTP verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError("");
    if (!displayEmail) {
      setError("Email not found. Please go back to login.");
      return;
    }
    try {
      setResendLoading(true);
      await authService.sendOtp(displayEmail);
      setOtp("");
      // Show success message
      setError("");
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-4 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Login</span>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <img src="/logo.png" alt="KareerGrowth Logo" className="h-12 w-auto" />
          </div>
          <h1 className="text-lg font-semibold text-gray-900 mb-1">Verify OTP</h1>
          <p className="text-gray-600 text-xs">Enter the 6-digit code from your email</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="mb-4">
            {displayEmail ? (
              <>
                <p className="text-gray-700 text-xs">
                  We sent a 6-digit OTP to <span className="font-semibold text-gray-900">{displayEmail}</span>
                </p>
                <p className="text-gray-600 text-xs mt-1">
                  Please check your inbox and spam folder.
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-700 text-xs">
                  Please enter the 6-digit OTP code sent to your email.
                </p>
                <p className="text-red-600 text-xs mt-1">
                  Email not found. Please go back to login page.
                </p>
              </>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* OTP Input */}
            <div>
              <label className="block text-xs font-medium text-gray-900 mb-1.5">
                OTP Code
              </label>
              <input
                type="text"
                maxLength="6"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setOtp(value);
                }}
                disabled={loading}
                autoFocus
                placeholder="000000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition text-center text-xl tracking-widest font-mono disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <p className="text-xs text-red-600">{error}</p>
              </div>
            )}

            {/* Verify Button */}
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full py-2 px-4 bg-purple-900 hover:bg-purple-800 text-white font-medium text-xs rounded-md transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Verifying...
                </>
              ) : (
                "Verify OTP"
              )}
            </button>

            {/* Resend Button */}
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resendLoading}
              className="w-full py-2 px-4 border border-purple-300 hover:border-purple-600 text-purple-700 hover:text-purple-900 font-medium text-xs rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {resendLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <RotateCw className="w-4 h-4" />
                  Resend OTP
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-[10px] text-gray-500 mt-4">
            Didn't receive the code? Check your spam folder or try resending.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpStep;

