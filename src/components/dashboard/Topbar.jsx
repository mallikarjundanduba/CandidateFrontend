import React, { useState, useRef, useEffect, useContext } from "react";
import { LogOut, Bell, User, Menu, X, ChevronDown, BookOpen, Briefcase, FileText, CheckCircle } from "lucide-react";
import { candidateService } from "../../services/candidateService";
import { NotificationContext } from "./Dashboard";

const formatDateTime = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const Topbar = ({ email, onMenuClick, onLogout, isMobile, menuItems = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const menuRef = useRef(null);
  const notificationsRef = useRef(null);

  // Get notifications from context (updated via WebSocket)
  const notificationContext = useContext(NotificationContext);
  
  useEffect(() => {
    if (notificationContext) {
      setNotifications(notificationContext.notifications || []);
      setUnreadCount(notificationContext.unreadCount || 0);
    }
  }, [notificationContext?.notifications, notificationContext?.unreadCount]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };

    if (isMenuOpen || isNotificationsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, isNotificationsOpen]);

  const handleNotificationClick = async (notification) => {
    if (!notification.isSeen) {
      try {
        await candidateService.markNotificationAsRead(notification.id);
        fetchNotifications();
      } catch (error) {
        console.error("Error marking notification as read:", error);
      }
    }

    // Logic to navigate or close based on type
    setIsNotificationsOpen(false);

    if (notification.type === 'JOB') {
      window.location.href = '#/jobs';
    } else if (notification.type === 'NOTE') {
      window.location.href = '#/assessments';
    } else if (notification.type === 'ASSESSMENT') {
      window.location.href = '#/assessments';
    }
  };

  const handleMenuItemClick = (itemId) => {
    // Handle menu item click - you can add navigation logic here
    console.log("Menu item clicked:", itemId);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <header className="bg-navy-900 shadow-lg border-b-2 border-gold-500/30 sticky top-0 z-40">
        <div className="flex items-center justify-between px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
          {/* Left side - Menu Button (Mobile) & Logo */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
            {/* Menu Dropdown Button - Mobile Only */}
            {menuItems.length > 0 && (
              <div className="relative md:hidden" ref={menuRef}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-1.5 sm:p-2 hover:bg-navy-700 rounded-lg transition-colors flex-shrink-0 flex items-center gap-1"
                  aria-label="Toggle menu"
                  aria-expanded={isMenuOpen}
                >
                  {isMenuOpen ? (
                    <X size={20} className="text-gold-500" />
                  ) : (
                    <Menu size={20} className="text-gold-500" />
                  )}
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-navy-800 border-2 border-gold-500/30 rounded-lg shadow-xl z-50 overflow-hidden">
                    <div className="py-2">
                      {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleMenuItemClick(item.id)}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left text-white hover:bg-navy-700 hover:text-gold-400 transition-colors border-l-4 border-transparent hover:border-gold-500"
                          >
                            <Icon size={20} className="flex-shrink-0" />
                            <span className="font-medium">{item.label}</span>
                          </button>
                        );
                      })}
                      {/* Divider */}
                      <div className="border-t border-gold-500/20 my-2"></div>
                      {/* Logout in menu for mobile */}
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          onLogout();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-white hover:bg-red-600/20 hover:text-red-400 transition-colors border-l-4 border-transparent hover:border-red-500"
                      >
                        <LogOut size={20} className="flex-shrink-0" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4 flex-shrink-0" ref={notificationsRef}>
            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`p-1.5 sm:p-2 rounded-lg transition-colors relative flex-shrink-0 ${isNotificationsOpen ? 'bg-navy-700 text-gold-400' : 'hover:bg-navy-700 text-gold-500'
                  }`}
                aria-label="Notifications"
              >
                <Bell size={18} className="sm:w-5 sm:h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-gold-500 text-navy-900 text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-navy-900">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Panel */}
              {isNotificationsOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 sm:w-80 md:w-96 bg-navy-800 border-2 border-gold-500/30 rounded-lg shadow-2xl z-50 overflow-hidden text-sm animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-3 border-b border-gold-500/20 flex justify-between items-center bg-navy-900/50">
                    <h3 className="font-bold text-white flex items-center gap-2">
                      <Bell size={16} className="text-gold-500" />
                      Notifications
                    </h3>
                    {unreadCount > 0 && (
                      <span className="text-[10px] px-2 py-0.5 bg-gold-500/20 text-gold-400 rounded-full border border-gold-500/30">
                        {unreadCount} New
                      </span>
                    )}
                  </div>

                  <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">
                    {notifications.length > 0 ? (
                      <div className="divide-y divide-gold-500/10">
                        {notifications.map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => handleNotificationClick(notif)}
                            className={`p-3 sm:p-4 hover:bg-navy-700/50 cursor-pointer transition-colors relative group border-l-4 ${notif.isSeen ? 'border-transparent opacity-70' : 'border-gold-500 bg-gold-500/5'
                              }`}
                          >
                            <div className="flex gap-3">
                              <div className={`mt-0.5 p-2 rounded-full flex-shrink-0 ${notif.type === 'JOB' ? 'bg-blue-500/20 text-blue-400' :
                                  notif.type === 'ASSESSMENT' ? 'bg-purple-500/20 text-purple-400' :
                                    'bg-gold-500/20 text-gold-400'
                                }`}>
                                {notif.type === 'JOB' ? <Briefcase size={16} /> :
                                  notif.type === 'ASSESSMENT' ? <CheckCircle size={16} /> :
                                    <BookOpen size={16} />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`font-semibold line-clamp-1 ${notif.isSeen ? 'text-gray-300' : 'text-white'}`}>
                                  {notif.title}
                                </p>
                                <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                                  {notif.message}
                                </p>
                                <p className="text-[10px] text-gold-500/60 mt-2 flex items-center gap-1">
                                  <span className="w-1 h-1 bg-gold-500/30 rounded-full"></span>
                                  {formatDateTime(notif.createdAt)}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center text-gray-500">
                        <Bell size={40} className="mx-auto mb-3 opacity-20" />
                        <p>No notifications yet</p>
                      </div>
                    )}
                  </div>

                  <div className="p-2 border-t border-gold-500/20 bg-navy-900/50 text-center">
                    <button
                      onClick={() => {
                        setIsNotificationsOpen(false);
                        window.location.href = '#/inbox'; // Assuming there is an inbox page
                      }}
                      className="text-xs font-medium text-gold-400 hover:text-gold-300 transition-colors py-1 block w-full"
                    >
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 pl-2 sm:pl-3 md:pl-4 border-l border-gold-500/30">
              {/* User Info - Show on larger screens, hide on very small */}
              <div className="text-right hidden sm:block">
                <p className="text-xs sm:text-sm font-medium text-white truncate max-w-[100px] sm:max-w-[150px] md:max-w-none">
                  {email}
                </p>
                <p className="text-[10px] sm:text-xs text-gold-400">Candidate</p>
              </div>
              {/* Avatar - Always visible, responsive size */}
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center text-navy-900 font-bold cursor-pointer hover:shadow-lg transition-shadow border-2 border-gold-400 flex-shrink-0 text-xs sm:text-sm md:text-base">
                {email?.[0]?.toUpperCase() || "U"}
              </div>
            </div>

            {/* Logout Button - Show icon on all screens, text on larger, hidden on mobile (in menu) */}
            <button
              onClick={onLogout}
              className="hidden md:flex p-1.5 sm:p-2 hover:bg-navy-700 rounded-lg transition-colors text-gold-500 flex-shrink-0 items-center gap-1 sm:gap-2"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut size={18} className="sm:w-5 sm:h-5" />
              <span className="hidden lg:inline text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Topbar;
