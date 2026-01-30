import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { candidateService } from '../../services/candidateService';

// Cache duration: 30 seconds for inbox data
const CACHE_DURATION_MS = 30000;

// Fetch all inbox notifications
export const fetchInboxNotifications = createAsyncThunk(
  'inbox/fetchNotifications',
  async (forceRefresh = false, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const inboxState = state.inbox;
      const now = Date.now();
      
      // Check cache if not forcing refresh
      if (!forceRefresh && 
          inboxState.lastFetchTime && 
          (now - inboxState.lastFetchTime) < CACHE_DURATION_MS &&
          inboxState.notifications &&
          inboxState.notifications.length >= 0) {
        return {
          notifications: inboxState.notifications,
          fromCache: true
        };
      }
      
      const data = await candidateService.getInboxNotifications();
      return {
        notifications: Array.isArray(data) ? data : [],
        fromCache: false
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch notifications'
      );
    }
  },
  {
    condition: (forceRefresh, { getState }) => {
      if (forceRefresh) return true;
      
      const state = getState();
      const inboxState = state.inbox;
      const now = Date.now();
      
      if (inboxState.lastFetchTime && 
          (now - inboxState.lastFetchTime) < CACHE_DURATION_MS &&
          inboxState.notifications) {
        return false; // Skip dispatch, use cache
      }
      
      return true;
    }
  }
);

// Mark notification as read
export const markNotificationAsRead = createAsyncThunk(
  'inbox/markAsRead',
  async (notificationId, { rejectWithValue, dispatch, getState }) => {
    try {
      await candidateService.markNotificationAsRead(notificationId);
      
      // Optimistically update local state
      const state = getState();
      const updatedNotifications = state.inbox.notifications.map(n => 
        n.id === notificationId ? { ...n, isSeen: true, read: true } : n
      );
      
      return { notifications: updatedNotifications };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to mark notification as read'
      );
    }
  }
);

// Mark all notifications of a type as read
export const markNotificationsByTypeAsRead = createAsyncThunk(
  'inbox/markByTypeAsRead',
  async (type, { rejectWithValue, dispatch, getState }) => {
    try {
      await candidateService.markNotificationsByTypeAsRead(type);
      
      // Optimistically update local state
      const state = getState();
      const updatedNotifications = state.inbox.notifications.map(n => 
        n.type === type ? { ...n, isSeen: true, read: true } : n
      );
      
      return { notifications: updatedNotifications };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to mark notifications as read'
      );
    }
  }
);

// Add notification (from WebSocket)
export const addNotification = createAsyncThunk(
  'inbox/addNotification',
  async (notification, { getState }) => {
    const state = getState();
    const existingNotifications = state.inbox.notifications || [];
    
    // Check if notification already exists
    const exists = existingNotifications.some(n => 
      n.id === notification.id || 
      (n.title === notification.title && 
       n.message === notification.message && 
       Math.abs(new Date(n.createdAt) - new Date(notification.createdAt)) < 1000)
    );
    
    if (exists) {
      return { notifications: existingNotifications, added: false };
    }
    
    // Add new notification at the beginning
    return { 
      notifications: [notification, ...existingNotifications],
      added: true
    };
  }
);

const initialState = {
  notifications: [],
  loading: false,
  error: null,
  lastFetchTime: null,
};

const inboxSlice = createSlice({
  name: 'inbox',
  initialState,
  reducers: {
    clearInbox: (state) => {
      state.notifications = [];
      state.error = null;
      state.lastFetchTime = null;
    },
    forceRefresh: (state) => {
      state.lastFetchTime = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Notifications
      .addCase(fetchInboxNotifications.pending, (state) => {
        if (!state.notifications || state.notifications.length === 0) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchInboxNotifications.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload.fromCache) {
          state.notifications = action.payload.notifications;
          state.lastFetchTime = Date.now();
        }
        state.error = null;
      })
      .addCase(fetchInboxNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Mark as Read
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        state.notifications = action.payload.notifications;
      })
      .addCase(markNotificationAsRead.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Mark by Type as Read
      .addCase(markNotificationsByTypeAsRead.fulfilled, (state, action) => {
        state.notifications = action.payload.notifications;
      })
      .addCase(markNotificationsByTypeAsRead.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Add Notification
      .addCase(addNotification.fulfilled, (state, action) => {
        if (action.payload.added) {
          state.notifications = action.payload.notifications;
        }
      });
  },
});

export const { clearInbox, forceRefresh } = inboxSlice.actions;
export default inboxSlice.reducer;
