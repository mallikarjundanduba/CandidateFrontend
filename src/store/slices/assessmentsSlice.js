import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { candidateService } from '../../services/candidateService';

// Cache duration: 60 seconds for assessments
const CACHE_DURATION_MS = 60000;

// Fetch all assessments
export const fetchAssessments = createAsyncThunk(
  'assessments/fetchAssessments',
  async (forceRefresh = false, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const assessmentsState = state.assessments;
      const now = Date.now();
      
      // Check cache if not forcing refresh
      if (!forceRefresh && 
          assessmentsState.lastFetchTime && 
          (now - assessmentsState.lastFetchTime) < CACHE_DURATION_MS &&
          assessmentsState.assessments) {
        return {
          assessments: assessmentsState.assessments,
          fromCache: true
        };
      }
      
      const data = await candidateService.getMyAssessments();
      return {
        assessments: Array.isArray(data) ? data : [],
        fromCache: false
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch assessments'
      );
    }
  },
  {
    condition: (forceRefresh, { getState }) => {
      if (forceRefresh) return true;
      
      const state = getState();
      const assessmentsState = state.assessments;
      const now = Date.now();
      
      if (assessmentsState.lastFetchTime && 
          (now - assessmentsState.lastFetchTime) < CACHE_DURATION_MS &&
          assessmentsState.assessments) {
        return false; // Skip dispatch, use cache
      }
      
      return true;
    }
  }
);

// Mark assessment notifications as read
export const markAssessmentNotificationsAsRead = createAsyncThunk(
  'assessments/markNotificationsAsRead',
  async (_, { rejectWithValue }) => {
    try {
      await Promise.all([
        candidateService.markNotificationsByTypeAsRead("NOTE"),
        candidateService.markNotificationsByTypeAsRead("ASSESSMENT")
      ]);
      return { success: true };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to mark notifications as read'
      );
    }
  }
);

const initialState = {
  assessments: [],
  loading: false,
  error: null,
  lastFetchTime: null,
};

const assessmentsSlice = createSlice({
  name: 'assessments',
  initialState,
  reducers: {
    clearAssessments: (state) => {
      state.assessments = [];
      state.error = null;
      state.lastFetchTime = null;
    },
    forceRefresh: (state) => {
      state.lastFetchTime = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Assessments
      .addCase(fetchAssessments.pending, (state) => {
        if (!state.assessments || state.assessments.length === 0) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchAssessments.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload.fromCache) {
          state.assessments = action.payload.assessments;
          state.lastFetchTime = Date.now();
        }
        state.error = null;
      })
      .addCase(fetchAssessments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Mark Notifications as Read
      .addCase(markAssessmentNotificationsAsRead.fulfilled, (state) => {
        // Notifications marked as read - no state change needed
      });
  },
});

export const { clearAssessments, forceRefresh } = assessmentsSlice.actions;
export default assessmentsSlice.reducer;
