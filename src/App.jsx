import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EmailStep from "./components/auth/EmailStep";
import OtpStep from "./components/auth/OtpStep";
import OtpRouteWrapper from "./components/auth/OtpRouteWrapper";
import LoginRouteWrapper from "./components/auth/LoginRouteWrapper";
import PasswordStep from "./components/auth/PasswordStep";
import RegistrationStep from "./components/auth/RegistrationStep";
import PublicRegistration from "./components/auth/PublicRegistration";
import PaymentStep from "./components/payment/PaymentStep";
import SnackbarAlert from "./components/common/SnackbarAlert";
import Dashboard from "./components/dashboard/Dashboard";
import { STEPS } from "./constants/steps";
import { authService } from "./services/authService";
import { candidateService } from "./services/candidateService";
import { clearAuthCookies, setAuthenticated, isAuthenticated } from "./utils/cookieUtils";
import { getCandidateData } from "./utils/candidateUtils";
import { ThemeProvider } from "./contexts/ThemeContext";
import { fetchProfile, setProfile } from "./store/slices/profileSlice";
import { logoutUser, clearCredentials } from "./store/slices/authSlice";

const App = () => {
  const dispatch = useDispatch();
  // Get profile from Redux store (might be cached from previous session)
  const profileData = useSelector((state) => state.profile?.data);
  
  const [step, setStep] = useState(STEPS.EMAIL);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const showMessage = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Store email in localStorage when it changes
  useEffect(() => {
    if (email) {
      localStorage.setItem("pendingEmail", email);
    }
  }, [email]);

  const navigate = useNavigate();
  const location = useLocation();

  // Store current path in sessionStorage for persistence (excluding auth paths)
  useEffect(() => {
    const authPaths = ["/login", "/otp", "/password", "/register", "/payment", "/"];
    // Skip public registration routes (e.g., /register/:token)
    if (location.pathname.startsWith("/register/") && location.pathname !== "/register") {
      return; // Don't store public registration paths
    }
    if (step === STEPS.DONE && !authPaths.includes(location.pathname)) {
      sessionStorage.setItem("lastPath", location.pathname);
    }
  }, [location.pathname, step]);

  // Sync URL with step - update URL when step changes
  useEffect(() => {
    // Wait for session initialization to complete before performing any navigation
    if (loading) return;

    const currentPath = location.pathname;
    
    // Skip redirects for public registration routes (e.g., /register/:token)
    if (currentPath.startsWith("/register/") && currentPath !== "/register") {
      return; // Don't redirect public registration links
    }

    if (step === STEPS.DONE) {
      // If already on a dashboard path, don't redirect to /dashboard
      const authPaths = ["/login", "/otp", "/password", "/register", "/payment", "/"];
      if (authPaths.includes(currentPath)) {
        navigate("/dashboard", { replace: true });
      }
    } else if (step === STEPS.EMAIL && currentPath !== "/login") {
      navigate("/login", { replace: true });
    } else if (step === STEPS.OTP && currentPath !== "/otp") {
      navigate("/otp", { replace: true });
    } else if (step === STEPS.PASSWORD && currentPath !== "/password" && currentPath !== "/login") {
      navigate("/login", { replace: true });
    } else if (step === STEPS.REGISTRATION && currentPath !== "/register") {
      navigate("/register", { replace: true });
    } else if (step === STEPS.PAYMENT && currentPath !== "/payment") {
      navigate("/payment", { replace: true });
    }
  }, [step, location.pathname, navigate, loading]);

  // Restore email from localStorage on mount
  useEffect(() => {
    const pendingEmail = localStorage.getItem("pendingEmail");
    if (pendingEmail && !email) {
      setEmail(pendingEmail);
    }
  }, []);

  const initialized = useRef(false);

  // Check for existing session on app mount
  useEffect(() => {
    // Skip session check for public registration routes
    if (location.pathname.startsWith("/register/") && location.pathname !== "/register") {
      setLoading(false);
      return; // Don't check session for public registration links
    }
    
    if (initialized.current) return;
    initialized.current = true;

    const checkSession = async () => {
      // Check if user is authenticated in localStorage (hint only)
      const authStatus = isAuthenticated();

      // If not authenticated in localStorage, don't even try (prevents guest refresh calls)
      if (!authStatus) {
        console.log("No authentication hint found. Skipping session check.");
        setStep(STEPS.EMAIL);
        setLoading(false);
        return;
      }

      // Check if we have cached profile data (from Redux or localStorage)
      // This prevents unnecessary /auth/me API calls on every page refresh
      const cachedProfile = profileData || getCandidateData();
      
      if (cachedProfile && cachedProfile.email) {
        console.log("Using cached profile data - skipping /auth/me API call on refresh");
        setEmail(cachedProfile.email);
        if (cachedProfile.passwordChanged !== undefined) {
          setPasswordChanged(cachedProfile.passwordChanged);
        }
        setAuthenticated(true);

        if (cachedProfile.needsPayment) {
          setStep(STEPS.PAYMENT);
        } else {
          setStep(STEPS.DONE);
          const savedPath = sessionStorage.getItem("lastPath");
          if (savedPath && savedPath !== location.pathname) {
            navigate(savedPath, { replace: true });
          }
        }
        setLoading(false);
        
        // Don't call /auth/me if we have cached data - token will be validated automatically
        // on first API call via axios interceptor or when user performs actions that require fresh data
        return;
      }

      try {
        // No cached data - need to validate session via API (only called on first load or after logout)
        console.log("No cached profile found. Validating session...");
        const result = await dispatch(fetchProfile(true)); // suppressLogging = true to prevent console spam

        if (fetchProfile.fulfilled.match(result)) {
          const profile = result.payload;
          if (profile?.email) {
            setEmail(profile.email);
          }
          if (profile?.passwordChanged !== undefined) {
            setPasswordChanged(profile.passwordChanged);
          }

          setAuthenticated(true);

          if (profile.needsPayment) {
            setStep(STEPS.PAYMENT);
          } else {
            setStep(STEPS.DONE);
            const savedPath = sessionStorage.getItem("lastPath");
            if (savedPath && savedPath !== location.pathname) {
              navigate(savedPath, { replace: true });
            }
            // Removed "Session restored" popup - no need to show on every refresh
          }
        } else {
          // Profile fetch failed, try refresh token
          throw new Error("Profile fetch failed");
        }
      } catch (error) {
        const statusCode = error?.response?.status;

        // 2. ONLY if profile fails with 401, try to refresh token
        if (statusCode === 401) {
          console.log("Access token expired. Attempting to refresh...");
          try {
            const response = await authService.refreshToken();

            if (response.email) setEmail(response.email);
            if (response.passwordChanged !== undefined) setPasswordChanged(response.passwordChanged);

            // Fetch and store candidate profile data after token refresh - use Redux
            try {
              const result = await dispatch(fetchProfile());
              if (fetchProfile.fulfilled.match(result)) {
                const profile = result.payload;
                if (profile?.email) {
                  setEmail(profile.email);
                }
                if (profile?.passwordChanged !== undefined) {
                  setPasswordChanged(profile.passwordChanged);
                }
              }
            } catch (profileError) {
              console.error("Failed to fetch candidate profile after refresh:", profileError);
            }

            setAuthenticated(true);

            if (response.needsPayment) {
              setStep(STEPS.PAYMENT);
            } else {
              setStep(STEPS.DONE);
              const savedPath = sessionStorage.getItem("lastPath");
              if (savedPath && savedPath !== location.pathname) {
                navigate(savedPath, { replace: true });
              }
              // Removed "Session refreshed" popup - no need to show on every refresh
            }
          } catch (refreshError) {
            console.log("Refresh token failed. Redirecting to login.");
            clearAuthCookies();
            setStep(STEPS.EMAIL);
            setEmail("");
            setPasswordChanged(false);
          }
        } else if (statusCode === 500) {
          console.log("System error during session check. Keeping session state.");
          if (email) {
            setStep(STEPS.DONE);
          } else {
            setStep(STEPS.EMAIL);
          }
        } else {
          console.log("Unrecoverable session error. Redirecting to login.");
          clearAuthCookies();
          setStep(STEPS.EMAIL);
        }
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [dispatch, location.pathname]);

  // Skip loading screen for public registration routes
  if (loading && !(location.pathname.startsWith("/register/") && location.pathname !== "/register")) {
    return (
      <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      // Use Redux thunk for logout
      await dispatch(logoutUser());
      // Clear everything - cookies and localStorage
      clearAuthCookies();
      setAuthenticated(false);
      dispatch(clearCredentials()); // Clear Redux state
      showMessage("Logged out successfully");
      // Reset to initial state
      setStep(STEPS.EMAIL);
      setEmail("");
      setOtp("");
      setPasswordChanged(false);
    } catch (error) {
      console.error("Logout error:", error);
      // Clear everything anyway even if API call fails
      clearAuthCookies();
      setAuthenticated(false);
      setStep(STEPS.EMAIL);
      setEmail("");
      setOtp("");
      setPasswordChanged(false);
      showMessage("Logged out (session cleared)", "success");
    }
  };

  // Skip loading screen for public registration routes
  if (loading && !(location.pathname.startsWith("/register/") && location.pathname !== "/register")) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Initializing session...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <Routes>
        {/* Public Registration Route */}
        <Route path="/register/:token" element={
          <PublicRegistration />
        } />
        {/* Auth Routes */}
        <Route path="/login" element={
          step === STEPS.DONE ? <Navigate to="/dashboard" replace /> :
            <LoginRouteWrapper
              step={step}
              email={email}
              setEmail={setEmail}
              setStep={setStep}
              showMessage={showMessage}
              setAuthenticated={setAuthenticated}
              setPasswordChanged={setPasswordChanged}
            />
        } />
        <Route path="/otp" element={
          step === STEPS.DONE ? <Navigate to="/dashboard" replace /> :
            <OtpRouteWrapper
              step={step}
              email={email}
              setStep={setStep}
              onVerified={(otpValue) => {
                setOtp(otpValue);
                showMessage("OTP verified successfully");
                setStep(STEPS.REGISTRATION);
              }}
            />
        } />
        <Route path="/password" element={
          step === STEPS.DONE ? <Navigate to="/dashboard" replace /> :
            step === STEPS.PASSWORD ? (
              <PasswordStep
                email={email}
                onLoggedIn={() => {
                  setAuthenticated(true);
                  setStep(STEPS.DONE);
                  showMessage("Login successful");
                }}
                onNeedsPayment={() => {
                  setAuthenticated(true);
                  showMessage("Registration incomplete. Proceeding to payment.");
                  setStep(STEPS.PAYMENT);
                }}
                onPasswordChanged={(changed) => {
                  setPasswordChanged(changed);
                }}
              />
            ) : (
              <Navigate to="/login" replace />
            )
        } />
        <Route path="/register" element={
          step === STEPS.DONE ? <Navigate to="/dashboard" replace /> :
            step === STEPS.REGISTRATION ? (
              <RegistrationStep
                email={email}
                otp={otp}
                onRegistered={() => {
                  showMessage("Details saved, proceed to payment");
                  setStep(STEPS.PAYMENT);
                }}
              />
            ) : (
              <Navigate to="/login" replace />
            )
        } />
        <Route path="/payment" element={
          step === STEPS.DONE ? <Navigate to="/dashboard" replace /> :
            step === STEPS.PAYMENT ? (
              <PaymentStep
                email={email}
                onPaid={() => {
                  setAuthenticated(true);
                  setStep(STEPS.DONE);
                  showMessage("Payment successful. Account activated.", "success");
                }}
              />
            ) : (
              <Navigate to="/login" replace />
            )
        } />

        {/* Dashboard Routes - Catch all sub-paths */}
        <Route
          path="/*"
          element={
            step === STEPS.DONE ? (
              <Dashboard
                email={email}
                passwordChanged={passwordChanged}
                onLogout={handleLogout}
                onPasswordChanged={(newStatus) => {
                  setPasswordChanged(newStatus);
                  // Also update in localStorage/profile if needed
                  console.log("Password changed status updated:", newStatus);
                }}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
      <SnackbarAlert
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </ThemeProvider>
  );
};

export default App;

