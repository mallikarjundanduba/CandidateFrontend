import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jobService } from '../../services/jobService';
import { candidateService } from '../../services/candidateService';

// Cache duration: 60 seconds for jobs (jobs change less frequently)
const CACHE_DURATION_MS = 60000;

// Fetch all jobs
export const fetchAllJobs = createAsyncThunk(
  'jobs/fetchAllJobs',
  async (forceRefresh = false, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const jobsState = state.jobs;
      const now = Date.now();
      
      // Check cache if not forcing refresh
      if (!forceRefresh && 
          jobsState.lastFetchTime && 
          (now - jobsState.lastFetchTime) < CACHE_DURATION_MS &&
          jobsState.jobs &&
          jobsState.jobs.length >= 0) {
        return {
          jobs: jobsState.jobs,
          fromCache: true
        };
      }
      
      const data = await jobService.getAllJobs();
      return {
        jobs: Array.isArray(data) ? data : [],
        fromCache: false
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch jobs'
      );
    }
  },
  {
    condition: (forceRefresh, { getState }) => {
      if (forceRefresh) return true;
      
      const state = getState();
      const jobsState = state.jobs;
      const now = Date.now();
      
      if (jobsState.lastFetchTime && 
          (now - jobsState.lastFetchTime) < CACHE_DURATION_MS &&
          jobsState.jobs) {
        return false; // Skip dispatch, use cache
      }
      
      return true;
    }
  }
);

// Mark job notifications as read
export const markJobNotificationsAsRead = createAsyncThunk(
  'jobs/markNotificationsAsRead',
  async (_, { rejectWithValue }) => {
    try {
      await candidateService.markNotificationsByTypeAsRead("JOB");
      return { success: true };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to mark notifications as read'
      );
    }
  }
);

const initialState = {
  jobs: [],
  loading: false,
  error: null,
  lastFetchTime: null,
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    clearJobs: (state) => {
      state.jobs = [];
      state.error = null;
      state.lastFetchTime = null;
    },
    forceRefresh: (state) => {
      state.lastFetchTime = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Jobs
      .addCase(fetchAllJobs.pending, (state) => {
        if (!state.jobs || state.jobs.length === 0) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload.fromCache) {
          state.jobs = action.payload.jobs;
          state.lastFetchTime = Date.now();
        }
        state.error = null;
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Mark Job Notifications as Read
      .addCase(markJobNotificationsAsRead.fulfilled, (state) => {
        // Notifications marked as read - no state change needed
      });
  },
});

export const { clearJobs, forceRefresh } = jobsSlice.actions;
export default jobsSlice.reducer;
