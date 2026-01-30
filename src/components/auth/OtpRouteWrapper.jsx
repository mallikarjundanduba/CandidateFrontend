import React, { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import OtpStep from "./OtpStep";
import { STEPS } from "../../constants/steps";

const OtpRouteWrapper = ({ step, email, setStep, onVerified }) => {
  const location = useLocation();
  const [pendingEmail, setPendingEmail] = useState(localStorage.getItem("pendingEmail"));

  useEffect(() => {
    // Update pendingEmail from localStorage
    const storedEmail = localStorage.getItem("pendingEmail");
    if (storedEmail !== pendingEmail) {
      setPendingEmail(storedEmail);
    }
  }, [pendingEmail]);

  useEffect(() => {
    // If we're on /otp route, ensure step is set to OTP
    if (location.pathname === "/otp") {
      const storedEmail = localStorage.getItem("pendingEmail");
      if (storedEmail || email) {
        // Only force set to OTP if we are NOT in a forward step (REGISTRATION, PAYMENT, DONE)
        // This allows the App.jsx navigation logic to take over when step changes to REGISTRATION
        if (step !== STEPS.OTP &&
          step !== STEPS.REGISTRATION &&
          step !== STEPS.PAYMENT &&
          step !== STEPS.DONE) {
          setStep(STEPS.OTP);
        }
      }
    }
  }, [location.pathname, step, email, setStep]);

  // Only show OTP step if we're on /otp route
  if (location.pathname === "/otp") {
    return (
      <OtpStep
        email={email || pendingEmail || ""}
        onVerified={onVerified}
      />
    );
  }

  // If not on /otp route, redirect to login
  return <Navigate to="/login" replace />;
};

export default OtpRouteWrapper;

