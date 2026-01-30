import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { candidateService } from '../../services/candidateService';

// Cache duration: 30 seconds (30000ms)
// Dashboard data will be considered fresh for 30 seconds after fetch
const CACHE_DURATION_MS = 30000;

// Async thunk for fetching all dashboard data (optimized single API call)
// If forceRefresh is true, bypasses cache and fetches fresh data
export const fetchAllDashboardData = createAsyncThunk(
  'dashboard/fetchAllData',
  async (forceRefresh = false, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const dashboardState = state.dashboard;
      const now = Date.now();
      
      // Check if we have cached data that's still fresh (less than 30 seconds old)
      // Skip cache check if forceRefresh is true
      if (!forceRefresh && 
          dashboardState.lastFetchTime && 
          (now - dashboardState.lastFetchTime) < CACHE_DURATION_MS &&
          dashboardState.stats &&
          dashboardState.stats.jobsCount !== undefined) {
        // Return cached data immediately - no need to fetch again
        // This will prevent pending state if cache is fresh
        return {
          stats: dashboardState.stats,
          unreadCount: dashboardState.unreadCount,
          recentActivities: dashboardState.recentActivities,
          fromCache: true
        };
      }
      
      // Fetch fresh data from API
      const response = await candidateService.getAllDashboardData();
      return {
        ...response,
        fromCache: false
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch dashboard data'
      );
    }
  },
  {
    // Condition to prevent dispatch if we have fresh cache
    condition: (forceRefresh, { getState }) => {
      if (forceRefresh) {
        return true; // Always fetch if force refresh
      }
      
      const state = getState();
      const dashboardState = state.dashboard;
      const now = Date.now();
      
      // Don't dispatch if we have fresh cache
      if (dashboardState.lastFetchTime && 
          (now - dashboardState.lastFetchTime) < CACHE_DURATION_MS &&
          dashboardState.stats &&
          dashboardState.stats.jobsCount !== undefined) {
        return false; // Skip dispatch, use cached data
      }
      
      return true; // Dispatch to fetch new data
    }
  }
);

const initialState = {
  stats: {
    jobsCount: 0,
    appliedCount: 0,
    notesCount: 0,
    mockTestsCount: 0,
    eventsCount: 0,
  },
  unreadCount: 0,
  recentActivities: [],
  loading: false,
  error: null,
  lastFetchTime: null, // Timestamp of last successful fetch
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearDashboard: (state) => {
      state.stats = initialState.stats;
      state.unreadCount = 0;
      state.recentActivities = [];
      state.error = null;
      state.lastFetchTime = null;
    },
    // Action to force refresh (bypass cache)
    forceRefresh: (state) => {
      state.lastFetchTime = null;
    },
    // Action to update unread count (when notification is marked as read)
    updateUnreadCount: (state, action) => {
      state.unreadCount = Math.max(0, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Dashboard Data
      .addCase(fetchAllDashboardData.pending, (state) => {
        // Always set loading to true when fetching (even if we have cached data)
        // This allows showing loading indicators during refresh
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        
        // Update data - fromCache flag is just for logging, we always update if we get here
        // (if cache was fresh, condition would have prevented this thunk from running)
        if (action.payload.stats) {
          state.stats = {
            jobsCount: action.payload.stats.jobsCount || 0,
            appliedCount: action.payload.stats.appliedCount || 0,
            notesCount: action.payload.stats.notesCount || 0,
            mockTestsCount: action.payload.stats.mockTestsCount || 0,
            eventsCount: action.payload.stats.eventsCount || 0,
          };
        }
        
        if (action.payload.unreadCount !== undefined) {
          state.unreadCount = action.payload.unreadCount || 0;
        }
        
        if (action.payload.recentActivities) {
          state.recentActivities = Array.isArray(action.payload.recentActivities) 
            ? action.payload.recentActivities 
            : [];
        }
        
        // Update timestamp when we fetch fresh data
        // If fromCache is true, we shouldn't reach here (condition prevents it)
        // But just in case, only update timestamp if not from cache
        if (!action.payload.fromCache) {
          state.lastFetchTime = Date.now();
        }
        
        state.error = null;
      })
      .addCase(fetchAllDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Don't clear existing data on error - keep showing cached data if available
      });
  },
});

export const { clearDashboard, forceRefresh, updateUnreadCount } = dashboardSlice.actions;
export default dashboardSlice.reducer;
