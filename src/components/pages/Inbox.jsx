import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Mail, Inbox as InboxIcon, Briefcase, Clock, CheckCircle, AlertCircle, Bell, BookOpen } from "lucide-react";
import { NotificationContext } from "../dashboard/Dashboard";
import { fetchInboxNotifications, markNotificationAsRead, addNotification } from "../../store/slices/inboxSlice";

const Inbox = () => {
  const dispatch = useDispatch();
  
  // Get notifications from Redux store (cached)
  const inboxState = useSelector((state) => state.inbox || {});
  const notifications = inboxState.notifications || [];
  const loading = inboxState.loading || false;
  const error = inboxState.error;
  
  // Also use context for WebSocket updates (will sync with Redux)
  const notificationContext = useContext(NotificationContext);

  useEffect(() => {
    // Load notifications on mount (Redux handles caching)
    dispatch(fetchInboxNotifications(false));
  }, [dispatch]);

  // Sync WebSocket notifications with Redux
  useEffect(() => {
    if (notificationContext?.notifications && notificationContext.notifications.length > 0) {
      // Add any new notifications from WebSocket to Redux
      notificationContext.notifications.forEach(notification => {
        dispatch(addNotification(notification));
      });
    }
  }, [notificationContext?.notifications, dispatch]);

  const handleMarkAsRead = async (id) => {
    try {
      // Update Redux state
      await dispatch(markNotificationAsRead(id)).unwrap();
      // Also update context if available
      if (notificationContext?.markAsRead) {
        await notificationContext.markAsRead(id);
      }
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const markAllAsRead = async () => {
    try {
      // Mark each unread notification
      const unread = notifications.filter(n => !n.isSeen && !n.read);
      await Promise.all(unread.map(n => dispatch(markNotificationAsRead(n.id))));
      
      // Also update context if available
      if (notificationContext?.markAsRead) {
        await Promise.all(unread.map(n => notificationContext.markAsRead(n.id)));
      }
    } catch (err) {
      console.error("Error marking all as read:", err);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "JOB":
        return <Briefcase className="h-4 w-4 text-blue-600" />;
      case "ASSESSMENT":
        return <CheckCircle className="h-4 w-4 text-purple-600" />;
      case "NOTE":
        return <BookOpen className="h-4 w-4 text-green-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const getNotificationBadgeColor = (type) => {
    switch (type) {
      case "JOB":
        return "bg-blue-100 text-blue-700";
      case "ASSESSMENT":
        return "bg-purple-100 text-purple-700";
      case "NOTE":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
      if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
      if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
      return date.toLocaleDateString();
    } catch (e) {
      return dateString;
    }
  };

  const unreadCount = notifications.filter(n => !n.isSeen).length;

  return (
    <div className="w-full max-w-full px-4 sm:px-6 lg:px-8 mx-auto space-y-4 pb-10">
      {/* Header - Same style as Dashboard */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-semibold text-gray-900 dark:text-white">Inbox 📬</h1>
            <p className="text-gray-700 dark:text-gray-300 mt-1 text-xs">View your messages and notifications</p>
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <>
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-purple-600 hover:text-purple-700 dark:text-purple-400 font-medium"
                >
                  Mark all as read
                </button>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                  {unreadCount} new
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/50 p-4">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <AlertCircle className="h-16 w-16 text-red-400 dark:text-red-500 mx-auto mb-4" />
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Error loading notifications</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{error}</p>
            <button
              onClick={() => dispatch(fetchInboxNotifications(true))}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-medium transition-colors"
            >
              Retry
            </button>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-12">
            <Mail className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">No notifications yet</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Your inbox is empty. Notifications will appear here when you receive test assignments or updates.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => !notification.isSeen && handleMarkAsRead(notification.id)}
                className={`border rounded-lg p-4 transition-all cursor-pointer ${notification.isSeen
                  ? "bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 opacity-80"
                  : "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700 shadow-sm hover:shadow-md"
                  }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex-1">
                        <h3 className={`text-xs font-semibold mb-1 ${notification.isSeen ? "text-gray-700 dark:text-gray-300" : "text-gray-900 dark:text-white"}`}>
                          {notification.title}
                        </h3>
                        <p className={`text-xs leading-relaxed ${notification.isSeen ? "text-gray-500 dark:text-gray-400" : "text-gray-700 dark:text-gray-300"}`}>
                          {notification.message}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded text-[10px] font-medium whitespace-nowrap ${notification.type === "JOB" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" :
                        notification.type === "ASSESSMENT" ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300" :
                          notification.type === "NOTE" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" :
                            "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        }`}>
                        {notification.type.replace(/_/g, " ")}
                      </span>
                    </div>
                    {notification.positionTitle && (
                      <div className="flex items-center gap-2 mt-2">
                        <Briefcase className="h-3 w-3 text-gray-400" />
                        <span className="text-[10px] text-gray-600">
                          {notification.positionTitle}
                          {notification.positionCode && ` (${notification.positionCode})`}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                      <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                        {formatDate(notification.createdAt)}
                      </span>
                      {!notification.isSeen && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] text-purple-600 font-bold uppercase tracking-wider">New</span>
                          <span className="h-2 w-2 bg-purple-600 rounded-full shadow-sm shadow-purple-200"></span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
