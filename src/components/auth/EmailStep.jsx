import React, { useState } from "react";
import { Mail, AlertCircle } from "lucide-react";
import { authService } from "../../services/authService";

const EmailStep = ({ onExistingUser, onNewUser, setEmail }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!value || !value.trim()) {
      setError("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      setEmail(value.trim());
      const result = await authService.checkEmail(value.trim());

      if (result.exists) {
        onExistingUser();
      } else {
        await authService.sendOtp(value.trim());
        onNewUser();
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <img src="/logo.png" alt="KareerGrowth Logo" className="h-12 w-auto" />
          </div>
          <p className="text-gray-600 text-xs">Candidate Login / Register</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="mb-4">
            <p className="text-gray-700 text-xs leading-relaxed">
              Enter your email. If you are new, we will send an OTP. If you already registered, you will be asked for password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Email Input */}
            <div>
              <label className="block text-xs font-medium text-gray-900 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={loading}
                autoFocus
                placeholder="your@email.com"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <p className="text-xs text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !value.trim()}
              className="w-full py-2 px-4 bg-purple-900 hover:bg-purple-800 text-white font-medium text-xs rounded-md transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                "Continue"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-[10px] text-gray-500 mt-4">
            🔒 Your data is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailStep;

