/**
 * Utility functions for Razorpay integration
 */

export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.getElementById("razorpay-script");
    if (existingScript) {
      // Script is already in the DOM, wait for it to load if it hasn't already
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => resolve(false));

      // If it's already loaded but window.Razorpay is missing (race condition), 
      // the event listeners might not trigger. Let's add a timeout fallback.
      setTimeout(() => {
        if (window.Razorpay) resolve(true);
        else resolve(false);
      }, 3000);
      return;
    }

    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const createRazorpayOptions = (orderId, key, email, amount, onSuccess) => {
  return {
    key,
    amount,
    currency: "INR",
    name: "KareerGrowth",
    description: "Candidate registration fee",
    order_id: orderId,
    prefill: {
      email
    },
    handler: function (response) {
      onSuccess(response);
    },
    modal: {
      ondismiss: function () {
        // Handle payment cancellation
      }
    }
  };
};

