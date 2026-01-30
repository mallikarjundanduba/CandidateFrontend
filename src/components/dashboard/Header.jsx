import React, { useState, useEffect, useContext, useRef } from "react";
import { Bell, User, LogOut, Menu, X, Mail, Lock, Settings, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "./Dashboard";

const Header = ({ email, onLogout, onMenuClick, unreadCount = 0, onOpenChangePassword }) => {
  const navigate = useNavigate();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const { notifications, refreshNotifications, markAsRead } = useContext(NotificationContext) || { 
    notifications: [], 
    refreshNotifications: () => {},
    markAsRead: () => {}
  };
  const [loading, setLoading] = useState(false);
  
  // Calculate unreadCount from notifications (prefer context over prop)
  const calculatedUnreadCount = notifications.filter(n => !n.isSeen && !n.read).length;
  const displayUnreadCount = calculatedUnreadCount > 0 ? calculatedUnreadCount : unreadCount;

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    if (isProfileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  useEffect(() => {
    if (isNotificationsOpen) {
      // Load notifications when dropdown opens (refreshes from API)
      console.log('Header: Loading notifications when dropdown opens...');
      refreshNotifications();
    }
  }, [isNotificationsOpen, refreshNotifications]);
  
  // Log notifications changes for debugging
  useEffect(() => {
    console.log('Header: Notifications updated:', notifications.length, 'notifications,', displayUnreadCount, 'unread');
  }, [notifications, displayUnreadCount]);

  return (
    <header className="absolute top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-50 flex items-center justify-between px-6 md:rounded-tl-[40px]">
      {/* Left: Mobile Menu Toggle */}
      <div className="flex-1 flex items-center md:hidden">
        <button
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={onMenuClick}
          aria-label="Menu"
        >
          <Menu className="h-5 w-5 text-gray-600" />
        </button>
      </div>
      <div className="hidden md:flex flex-1"></div>

      {/* Center: Logo */}
      <div className="flex items-center justify-center gap-2 cursor-pointer" onClick={() => navigate("/dashboard")}>
        <img
          src="/KG-logo.png"
          alt="KareerGrowth Logo"
          className="h-8 w-8 object-contain"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="w-8 h-8 bg-[#2E2E6B] rounded-lg flex items-center justify-center hidden">
          <span className="text-white text-xs font-bold">KG</span>
        </div>
        <span className="text-[#1a1a1a] font-bold text-xl tracking-tight">KareerGrowth</span>
      </div>

      {/* Right: Icons */}
      <div className="flex-1 flex items-center justify-end gap-2 md:gap-4 relative">
        {/* Notifications Bell */}
        <button
          className={`relative p-2.5 rounded-full transition-all group ${isNotificationsOpen ? 'bg-indigo-50 text-[#2E2E6B]' : 'hover:bg-gray-50 text-gray-500'}`}
          onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
          aria-label="Notifications"
        >
          <Bell className={`h-5 w-5 ${isNotificationsOpen ? 'text-[#2E2E6B]' : 'group-hover:text-[#2E2E6B]'}`} />
          {displayUnreadCount > 0 && (
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          )}
        </button>

        {/* Notifications Dropdown */}
        {isNotificationsOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsNotificationsOpen(false)}
            />
            <div className="absolute right-0 top-14 w-80 bg-white border border-gray-100 rounded-[30px] shadow-2xl z-50 overflow-hidden animate-fade-in text-left">
              <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                <h3 className="text-sm font-bold text-[#1a1a1a] uppercase tracking-widest px-1 border-l-4 border-[#4C4CFF] ml-[-8px] pl-2">Recent Updates</h3>
                <button
                  onClick={() => setIsNotificationsOpen(false)}
                  className="p-1.5 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  <X size={14} className="text-gray-400" />
                </button>
              </div>

              <div className="max-h-[400px] overflow-y-auto">
                {loading ? (
                  <div className="p-12 flex flex-col items-center justify-center gap-3">
                    <div className="w-8 h-8 border-[3px] border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Loading...</p>
                  </div>
                ) : notifications.length > 0 ? (
                  <div className="divide-y divide-gray-50">
                    {notifications.map((notif, i) => (
                      <div 
                        key={i} 
                        className="px-6 py-5 hover:bg-indigo-50/30 transition-colors cursor-pointer group relative"
                        onClick={async (e) => {
                          // Don't trigger if clicking the X button
                          if (e.target.closest('.notification-close-btn')) {
                            return;
                          }
                          
                          // Mark as read when clicked
                          if (!notif.isSeen && !notif.read && markAsRead) {
                            await markAsRead(notif.id);
                          }
                          
                          // Navigate based on notification type
                          if (notif.type === 'ASSESSMENT' && notif.referenceId) {
                            window.location.href = `/assessment/${notif.referenceId}`;
                          } else if (notif.type === 'JOB') {
                            navigate("/jobs");
                          } else if (notif.type === 'NOTE') {
                            navigate("/assessments");
                          }
                        }}
                      >
                        <div className="flex gap-4">
                          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${notif.read || notif.isSeen ? 'bg-gray-100 text-gray-400' : 'bg-indigo-100 text-[#4C4CFF]'}`}>
                            <Mail size={20} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className={`text-xs font-bold truncate ${notif.read || notif.isSeen ? 'text-gray-500' : 'text-[#1a1a1a]'}`}>
                              {notif.title || "New Update"}
                            </h4>
                            <p className="text-[11px] text-gray-400 mt-1.5 line-clamp-2 leading-relaxed font-medium">
                              {notif.message}
                            </p>
                            <span className="text-[9px] font-bold text-[#4C4CFF] uppercase tracking-widest mt-3 block">
                              {new Date(notif.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                          <button
                            className="notification-close-btn opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-200 rounded-lg transition-all flex-shrink-0"
                            onClick={async (e) => {
                              e.stopPropagation();
                              if (markAsRead && !notif.isSeen && !notif.read) {
                                await markAsRead(notif.id);
                              }
                            }}
                            aria-label="Mark as read"
                          >
                            <X size={14} className="text-gray-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-[25px] flex items-center justify-center mx-auto mb-4 text-gray-300">
                      <Bell size={28} />
                    </div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">No new updates</p>
                  </div>
                )}
              </div>

              <div className="px-6 py-4 border-t border-gray-50 bg-gray-50/30">
                <button
                  onClick={() => {
                    setIsNotificationsOpen(false);
                    navigate("/inbox");
                  }}
                  className="w-full py-3.5 text-[10px] font-bold text-[#1B1B4B] hover:text-white hover:bg-[#1B1B4B] border border-[#1B1B4B]/10 bg-white rounded-2xl transition-all uppercase tracking-widest shadow-sm"
                >
                  View All Notifications
                </button>
              </div>
            </div>
          </>
        )}

        {/* User Profile Dropdown */}
        <div className="hidden md:block relative" ref={profileMenuRef}>
          <button
            className="flex items-center gap-2 p-2.5 hover:bg-gray-50 rounded-full transition-all group"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            aria-label="User profile menu"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-[#4C4CFF] to-[#2E2E6B] rounded-full flex items-center justify-center text-white font-bold text-sm">
              {email?.[0]?.toUpperCase() || "U"}
            </div>
            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Profile Dropdown Menu */}
          {isProfileMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsProfileMenuOpen(false)}
              />
              <div className="absolute right-0 top-14 w-56 bg-white border border-gray-100 rounded-[20px] shadow-2xl z-50 overflow-hidden animate-fade-in">
                <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Account</p>
                  <p className="text-sm font-semibold text-[#1a1a1a] truncate">{email}</p>
                </div>
                
                <div className="py-2">
                  {/* My Profile */}
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      navigate("/profile");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-indigo-50 transition-colors"
                  >
                    <User className="h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium">My Profile</span>
                  </button>

                  {/* Change Password */}
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      if (onOpenChangePassword) {
                        onOpenChangePassword();
                      }
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-indigo-50 transition-colors"
                  >
                    <Lock className="h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium">Change Password</span>
                  </button>
                </div>

                <div className="border-t border-gray-50 py-2">
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Mobile: User Profile Button */}
        <button
          className="md:hidden p-2.5 hover:bg-gray-50 rounded-full transition-all group"
          onClick={() => navigate("/profile")}
          aria-label="User profile"
        >
          <User className="h-5 w-5 text-gray-500 group-hover:text-[#2E2E6B]" />
        </button>

        {/* Mobile: Logout Button */}
        <button
          className="md:hidden p-2.5 hover:bg-gray-50 rounded-full transition-all group"
          onClick={onLogout}
          aria-label="Logout"
        >
          <LogOut className="h-5 w-5 text-red-500" />
        </button>
      </div>
    </header>
  );
};

export default Header;
