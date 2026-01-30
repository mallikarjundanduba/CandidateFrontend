import React, { useEffect } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import EmailStep from "./EmailStep";
import PasswordStep from "./PasswordStep";
import { STEPS } from "../../constants/steps";
import { setAuthenticated } from "../../utils/cookieUtils";

const LoginRouteWrapper = ({
  step,
  email,
  setEmail,
  setStep,
  showMessage,
  setAuthenticated: setAuthState,
  setPasswordChanged
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // When on /login route, ensure step is EMAIL or PASSWORD
    if (location.pathname === "/login") {
      // If step is OTP, navigate to /otp
      if (step === STEPS.OTP) {
        navigate("/otp", { replace: true });
        return;
      }
      // If step is REGISTRATION or PAYMENT, reset to EMAIL
      if (step === STEPS.REGISTRATION || step === STEPS.PAYMENT) {
        // If we somehow landed on /login with these steps, we should probably redirect
        // to the correct route instead of resetting to EMAIL?
        // But for now, let's keep the reset behavior but ensure it doesn't loop.
        // Actually, if we are on /login and step is REGISTRATION, we should go to /register.
        if (step === STEPS.REGISTRATION) {
          navigate("/register", { replace: true });
        } else if (step === STEPS.PAYMENT) {
          navigate("/payment", { replace: true });
        } else {
          setStep(STEPS.EMAIL);
        }
      }
      // If step is already EMAIL or PASSWORD, keep it
    }
  }, [location.pathname, step, setStep, navigate]);

  // Always show login-related components on /login route
  if (location.pathname === "/login") {
    if (step === STEPS.PASSWORD) {
      return (
        <PasswordStep
          email={email}
          onLoggedIn={() => {
            setAuthState(true);
            setAuthenticated(true);
            setStep(STEPS.DONE);
            window.history.replaceState({}, "", "/dashboard");
            showMessage("Login successful");
          }}
          onNeedsPayment={() => {
            setAuthState(true);
            setAuthenticated(true);
            showMessage("Registration incomplete. Proceeding to payment.");
            setStep(STEPS.PAYMENT);
          }}
          onPasswordChanged={(changed) => {
            if (setPasswordChanged) {
              setPasswordChanged(changed);
            }
          }}
        />
      );
    } else {
      // Default to EmailStep for /login route
      return (
        <EmailStep
          setEmail={setEmail}
          onExistingUser={() => setStep(STEPS.PASSWORD)}
          onNewUser={() => {
            showMessage("OTP sent to your email");
            setStep(STEPS.OTP);
            // Navigate to /otp immediately
            navigate("/otp", { replace: true });
          }}
        />
      );
    }
  }

  return <Navigate to="/login" replace />;
};

export default LoginRouteWrapper;

