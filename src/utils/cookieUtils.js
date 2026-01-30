/**
 * Utility functions for managing cookies
 */

export const setCookie = (name, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

export const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const deleteCookie = (name) => {
  // Delete cookie with all possible path and domain combinations
  const paths = ["/", ""];
  const domains = [window.location.hostname, `.${window.location.hostname}`, ""];
  
  paths.forEach(path => {
    domains.forEach(domain => {
      // Try with domain
      if (domain) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=${path};domain=${domain};`;
      }
      // Try without domain
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=${path};`;
      // Try with SameSite
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=${path};SameSite=Lax;`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=${path};SameSite=Strict;`;
    });
  });
};

export const setAuthenticated = (value) => {
  try {
    if (value) {
      localStorage.setItem("isAuthenticated", "true");
    } else {
      localStorage.removeItem("isAuthenticated");
    }
  } catch (e) {
    console.error("Error setting authentication state:", e);
  }
};

export const isAuthenticated = () => {
  try {
    return localStorage.getItem("isAuthenticated") === "true";
  } catch (e) {
    return false;
  }
};

export const clearAuthCookies = () => {
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
  // Clear all localStorage items
  try {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("sessionId");
    localStorage.removeItem("questions");
    // Clear any other auth-related items
    localStorage.clear();
  } catch (e) {
    // Ignore localStorage errors
  }
};

