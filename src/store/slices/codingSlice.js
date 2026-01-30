import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { codingService } from '../../services/codingService';
import { candidateService } from '../../services/candidateService';

// Cache duration: 60 seconds for coding data
const CACHE_DURATION_MS = 60000;

// Fetch coding progress (stars, completion status)
export const fetchCodingProgress = createAsyncThunk(
  'coding/fetchProgress',
  async (candidateId, { rejectWithValue, getState }) => {
    try {
      if (!candidateId) {
        // Try to get candidate ID from profile
        const state = getState();
        const profileData = state.profile?.data || state.profileData?.profile;
        if (profileData) {
          candidateId = profileData.id || profileData.candidateId;
        }
      }
      
      if (!candidateId) {
        throw new Error('Candidate ID is required');
      }
      
      const state = getState();
      const codingState = state.coding;
      const now = Date.now();
      
      // Check cache if data exists and is fresh
      if (codingState.lastProgressFetchTime && 
          (now - codingState.lastProgressFetchTime) < CACHE_DURATION_MS &&
          codingState.progress) {
        return {
          progress: codingState.progress,
          fromCache: true
        };
      }
      
      const data = await codingService.fetchProgress(candidateId);
      return {
        progress: data || { stars: {}, status: {}, totalStars: 0 },
        fromCache: false
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch coding progress'
      );
    }
  },
  {
    condition: (candidateId, { getState }) => {
      const state = getState();
      const codingState = state.coding;
      const now = Date.now();
      
      if (codingState.lastProgressFetchTime && 
          (now - codingState.lastProgressFetchTime) < CACHE_DURATION_MS &&
          codingState.progress) {
        return false; // Skip dispatch, use cache
      }
      
      return true;
    }
  }
);

// Fetch supported languages (cache longer - rarely changes)
export const fetchLanguages = createAsyncThunk(
  'coding/fetchLanguages',
  async (forceRefresh = false, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const codingState = state.coding;
      
      // Languages rarely change, cache for 5 minutes
      const LANGUAGES_CACHE_DURATION = 300000; // 5 minutes
      const now = Date.now();
      
      if (!forceRefresh && 
          codingState.lastLanguagesFetchTime && 
          (now - codingState.lastLanguagesFetchTime) < LANGUAGES_CACHE_DURATION &&
          codingState.languages &&
          codingState.languages.length > 0) {
        return {
          languages: codingState.languages,
          fromCache: true
        };
      }
      
      const data = await codingService.getLanguages();
      return {
        languages: Array.isArray(data) ? data : [],
        fromCache: false
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch languages'
      );
    }
  },
  {
    condition: (forceRefresh, { getState }) => {
      if (forceRefresh) return true;
      
      const state = getState();
      const codingState = state.coding;
      const now = Date.now();
      const LANGUAGES_CACHE_DURATION = 300000; // 5 minutes
      
      if (codingState.lastLanguagesFetchTime && 
          (now - codingState.lastLanguagesFetchTime) < LANGUAGES_CACHE_DURATION &&
          codingState.languages &&
          codingState.languages.length > 0) {
        return false; // Skip dispatch, use cache
      }
      
      return true;
    }
  }
);

// Save submission (optimistic update)
export const saveSubmission = createAsyncThunk(
  'coding/saveSubmission',
  async (submissionData, { rejectWithValue, dispatch }) => {
    try {
      const response = await codingService.saveSubmission(submissionData);
      // Refresh progress after saving submission
      if (submissionData.candidateId) {
        dispatch(fetchCodingProgress(submissionData.candidateId));
      }
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to save submission'
      );
    }
  }
);

const initialState = {
  progress: { stars: {}, status: {}, totalStars: 0 },
  languages: [],
  loading: false,
  loadingLanguages: false,
  error: null,
  lastProgressFetchTime: null,
  lastLanguagesFetchTime: null,
};

const codingSlice = createSlice({
  name: 'coding',
  initialState,
  reducers: {
    clearCoding: (state) => {
      state.progress = { stars: {}, status: {}, totalStars: 0 };
      state.languages = [];
      state.error = null;
      state.lastProgressFetchTime = null;
      state.lastLanguagesFetchTime = null;
    },
    forceRefreshProgress: (state) => {
      state.lastProgressFetchTime = null;
    },
    updateProgressLocally: (state, action) => {
      // Optimistically update progress (e.g., when star is earned)
      if (action.payload.questionId && action.payload.stars !== undefined) {
        state.progress.stars[action.payload.questionId] = action.payload.stars;
      }
      if (action.payload.questionId && action.payload.status) {
        state.progress.status[action.payload.questionId] = action.payload.status;
      }
      if (action.payload.totalStars !== undefined) {
        state.progress.totalStars = action.payload.totalStars;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Progress
      .addCase(fetchCodingProgress.pending, (state) => {
        if (!state.progress || Object.keys(state.progress.stars || {}).length === 0) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchCodingProgress.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload.fromCache) {
          state.progress = action.payload.progress;
          state.lastProgressFetchTime = Date.now();
        }
        state.error = null;
      })
      .addCase(fetchCodingProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Languages
      .addCase(fetchLanguages.pending, (state) => {
        if (!state.languages || state.languages.length === 0) {
          state.loadingLanguages = true;
        }
        state.error = null;
      })
      .addCase(fetchLanguages.fulfilled, (state, action) => {
        state.loadingLanguages = false;
        if (!action.payload.fromCache) {
          state.languages = action.payload.languages;
          state.lastLanguagesFetchTime = Date.now();
        }
        state.error = null;
      })
      .addCase(fetchLanguages.rejected, (state, action) => {
        state.loadingLanguages = false;
        state.error = action.payload;
      })
      // Save Submission
      .addCase(saveSubmission.fulfilled, (state) => {
        // Progress will be refreshed by fetchCodingProgress
      })
      .addCase(saveSubmission.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearCoding, forceRefreshProgress, updateProgressLocally } = codingSlice.actions;
export default codingSlice.reducer;
