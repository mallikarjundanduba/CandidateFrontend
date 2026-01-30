import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "./Header";
import SidebarNew from "./SidebarNew";
import ChangePasswordModal from "../common/ChangePasswordModal";
import { candidateService } from "../../services/candidateService";
import { fetchProfile } from "../../store/slices/profileSlice";

const Layout = ({ children, email, onLogout, passwordChanged, unreadCount = 0, onPasswordChanged }) => {
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [currentPasswordChanged, setCurrentPasswordChanged] = useState(passwordChanged);

  const location = useLocation();

  // Update passwordChanged when prop changes and show modal if false
  useEffect(() => {
    setCurrentPasswordChanged(passwordChanged);
    // If passwordChanged is false, force show the modal (can't be dismissed)
    if (passwordChanged === false) {
      setIsChangePasswordModalOpen(true);
    }
  }, [passwordChanged]);

  const handleMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#3631A4] w-full relative overflow-x-hidden">
      <SidebarNew
        isOpen={isMobileMenuOpen}
        onClose={handleCloseMenu}
        isExpanded={isExpanded}
        onToggleExpand={() => setIsExpanded(!isExpanded)}
        onLogout={onLogout}
      />

      <div className={`transition-all duration-300 min-h-screen bg-white relative ${isExpanded ? "md:ml-60" : "md:ml-[64px]"
        }`}>
        <Header
          email={email}
          onLogout={onLogout}
          onMenuClick={handleMenuClick}
          unreadCount={unreadCount}
          onOpenChangePassword={() => setIsChangePasswordModalOpen(true)}
        />

        <main className="pt-16 min-h-screen">
          <div className="p-2 md:p-3 lg:p-4 w-full max-w-full">
            {children}
          </div>
        </main>
      </div>

      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => {
          // Only allow closing if password has been changed
          if (currentPasswordChanged) {
            setIsChangePasswordModalOpen(false);
          }
        }}
        onSuccess={async (updatedPasswordChanged) => {
          console.log("Layout: Password change success callback received. Updated status:", updatedPasswordChanged);
          
          // Update local state immediately with value from API response
          const newStatus = updatedPasswordChanged !== undefined ? updatedPasswordChanged : true;
          setCurrentPasswordChanged(newStatus);
          console.log("Layout: Updated local passwordChanged state to:", newStatus);
          
          // Refresh profile to confirm updated passwordChanged status from backend (also updates Redux)
          // The backend /auth/change-password API already set password_changed = TRUE in database
          // Now we fetch the profile to confirm and sync the state
          try {
            console.log("Layout: Refreshing profile to confirm passwordChanged status...");
            
            // Use Redux thunk to fetch profile (which calls /auth/me endpoint)
            const result = await dispatch(fetchProfile());
            if (fetchProfile.fulfilled.match(result)) {
              const profile = result.payload;
              console.log("Layout: Profile fetched from /auth/me:", profile);
              
              if (profile?.passwordChanged !== undefined) {
                const confirmedStatus = profile.passwordChanged;
                console.log("Layout: Confirmed passwordChanged status from profile:", confirmedStatus);
                setCurrentPasswordChanged(confirmedStatus);
                
                // Propagate update to parent component (Dashboard -> App.jsx)
                if (onPasswordChanged) {
                  console.log("Layout: Propagating passwordChanged status to Dashboard:", confirmedStatus);
                  onPasswordChanged(confirmedStatus);
                }
              } else {
                // If profile doesn't return it, use the value from change-password response
                console.log("Layout: Profile doesn't have passwordChanged, using API response value:", newStatus);
                if (onPasswordChanged) {
                  onPasswordChanged(newStatus);
                }
              }
            } else {
              console.warn("Layout: Profile fetch failed, trying candidateService.getProfile as fallback...");
              // Fallback: try candidateService.getProfile directly (calls /candidates/profile)
              const profile = await candidateService.getProfile();
              if (profile?.passwordChanged !== undefined) {
                const confirmedStatus = profile.passwordChanged;
                console.log("Layout: Confirmed passwordChanged status from /candidates/profile:", confirmedStatus);
                setCurrentPasswordChanged(confirmedStatus);
                if (onPasswordChanged) {
                  onPasswordChanged(confirmedStatus);
                }
              } else {
                console.warn("Layout: Fallback profile fetch also doesn't have passwordChanged, using API response value");
                if (onPasswordChanged) {
                  onPasswordChanged(newStatus);
                }
              }
            }
          } catch (error) {
            console.error("Layout: Error refreshing profile after password change:", error);
            // Even if profile refresh fails, use the value from change-password API response
            // The backend already updated the database, so we trust the API response
            if (onPasswordChanged) {
              console.log("Layout: Using passwordChanged status from API response due to profile fetch error:", newStatus);
              onPasswordChanged(newStatus);
            }
          }
          
          // Close modal after successful password change and status update
          console.log("Layout: Closing password change modal");
          setIsChangePasswordModalOpen(false);
        }}
        forceOpen={!currentPasswordChanged} // Force open if password not changed
      />
    </div>
  );
};

export default Layout;
