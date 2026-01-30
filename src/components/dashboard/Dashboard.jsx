import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { authService } from "../../services/authService";
import { clearAuthCookies } from "../../utils/cookieUtils";
import { WebSocketProvider } from "../../contexts/WebSocketContext";
import Layout from "./Layout";
import DashboardContent from "./DashboardContent";
import Inbox from "../pages/Inbox";
import Practice from "../pages/Practice";
import Jobs from "../pages/Jobs";
import Profile from "../pages/Profile";
import Notes from "../pages/Notes";
import CodingPage from "../pages/CodingPage";
import CodingSpecsForm from "../pages/CodingSpecsForm";
import CodingProblemForm from "../pages/CodingProblemForm";
import AiCodingProblem from "../pages/AiCodingProblem";
import InterviewQuestionsForm from "../pages/InterviewQuestionsForm";
import InterviewQuestions from "../pages/InterviewQuestions";
import Assessments from "../pages/Assessments";
import Support from "../pages/Support";
import websocketService from "../../services/websocketService";
import { fetchInboxNotifications, addNotification as addNotificationAction, markNotificationAsRead } from "../../store/slices/inboxSlice";

// Create a notification manager context for sharing notification state
// This context will sync with Redux for consistency
export const NotificationContext = React.createContext({
  notifications: [],
  unreadCount: 0,
  refreshNotifications: () => {},
  addNotification: () => {},
  markAsRead: () => {}
});

const Dashboard = ({ email, passwordChanged, onLogout, onPasswordChanged }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  // Get notifications from Redux store (cached)
  const inboxState = useSelector((state) => state.inbox || {});
  const notifications = inboxState.notifications || [];
  const unreadCount = notifications.filter(n => !n.isSeen && !n.read).length;
  
  const [currentPasswordChanged, setCurrentPasswordChanged] = useState(passwordChanged);

  // Update local state when prop changes
  useEffect(() => {
    setCurrentPasswordChanged(passwordChanged);
  }, [passwordChanged]);

  // Load notifications from Redux (handles caching)
  const refreshNotifications = async () => {
    try {
      await dispatch(fetchInboxNotifications(false)).unwrap();
    } catch (error) {
      console.error("Error refreshing notifications:", error);
    }
  };

  // Add notification from WebSocket (syncs with Redux)
  const addNotification = (notification) => {
    dispatch(addNotificationAction(notification));
  };

  // Mark notification as read (syncs with Redux)
  const markAsRead = async (notificationId) => {
    try {
      await dispatch(markNotificationAsRead(notificationId)).unwrap();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Initial load of notifications on mount
  useEffect(() => {
    refreshNotifications();
  }, [dispatch]);

  // Handle WebSocket notification callback
  const handleWebSocketNotification = (notification) => {
    console.log('WebSocket notification received in Dashboard:', notification);
    
    // Ensure notification has all required fields
    const normalizedNotification = {
      id: notification.id || `ws-${Date.now()}-${Math.random()}`,
      title: notification.title || 'New Notification',
      message: notification.message || '',
      type: notification.type || 'JOB',
      referenceId: notification.referenceId || null,
      isSeen: notification.isSeen !== undefined ? notification.isSeen : false,
      read: notification.read !== undefined ? notification.read : (notification.isSeen !== undefined ? notification.isSeen : false),
      createdAt: notification.createdAt || new Date().toISOString()
    };
    
    console.log('Adding normalized notification to Redux:', normalizedNotification);
    addNotification(normalizedNotification);
    
    // Refresh notifications from API to get actual notification IDs from database
    // This ensures we have the real notification data
    refreshNotifications();
    
    // Show browser notification if permission granted
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(normalizedNotification.title, {
        body: normalizedNotification.message,
        icon: '/KG-logo.png'
      });
    }
  };

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        console.log('Notification permission:', permission);
      });
    }
  }, []);

  const handleLogout = async () => {
    try {
      // Disconnect WebSocket before logout
      websocketService.disconnect();
      await authService.logout();
      clearAuthCookies();
      onLogout();
    } catch (error) {
      console.error("Logout error:", error);
      // Disconnect WebSocket even if logout fails
      websocketService.disconnect();
      clearAuthCookies();
      onLogout();
    }
  };

  const notificationContextValue = {
    notifications,
    unreadCount,
    refreshNotifications,
    addNotification,
    markAsRead
  };

  return (
    <WebSocketProvider onNotification={handleWebSocketNotification}>
      <NotificationContext.Provider value={notificationContextValue}>
        <Layout 
          email={email} 
          passwordChanged={currentPasswordChanged} 
          onLogout={handleLogout} 
          unreadCount={unreadCount}
          onPasswordChanged={(newStatus) => {
            setCurrentPasswordChanged(newStatus);
            // Propagate to App.jsx
            if (onPasswordChanged) {
              onPasswordChanged(newStatus);
            }
          }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardContent email={email} />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/practice/coding" element={<CodingPage />} />
            <Route path="/practice/ai" element={<CodingSpecsForm />} />
            <Route path="/practice/ai/form" element={<CodingProblemForm />} />
            <Route path="/practice/ai/problem" element={<AiCodingProblem />} />
            <Route path="/practice/ai/interview" element={<InterviewQuestionsForm />} />
            <Route path="/practice/ai/interview-list" element={<InterviewQuestions />} />
            <Route path="/coding-specs" element={<Navigate to="/practice/ai" replace />} />
            <Route path="/coding-specs-form" element={<Navigate to="/practice/ai/form" replace />} />
            <Route path="/ai-coding-problem" element={<Navigate to="/practice/ai/problem" replace />} />
            <Route path="/interview-questions-form" element={<Navigate to="/practice/ai/interview" replace />} />
            <Route path="/interview-questions" element={<Navigate to="/practice/ai/interview-list" replace />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/assessments" element={<Assessments />} />
            <Route path="/support" element={<Support />} />
            <Route path="/profile" element={<Profile email={email} />} />
            {/* Redirect /coding to /practice/coding for backward compatibility if needed */}
            <Route path="/coding" element={<Navigate to="/practice/coding" replace />} />
            {/* Catch all other dashboard sub-paths and redirect to dashboard home */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Layout>
      </NotificationContext.Provider>
    </WebSocketProvider>
  );
};

export default Dashboard;
