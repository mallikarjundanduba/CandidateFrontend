import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { candidateService } from '../../services/candidateService';

// Cache duration: 30 seconds for profile data
const CACHE_DURATION_MS = 30000;

// Fetch complete profile data (profile + resume + applications)
export const fetchProfileData = createAsyncThunk(
  'profileData/fetchProfileData',
  async (forceRefresh = false, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const profileDataState = state.profileData;
      const now = Date.now();
      
      // Check cache if not forcing refresh
      if (!forceRefresh && 
          profileDataState.lastFetchTime && 
          (now - profileDataState.lastFetchTime) < CACHE_DURATION_MS &&
          profileDataState.profile) {
        return {
          profile: profileDataState.profile,
          resume: profileDataState.resume,
          applications: profileDataState.applications,
          fromCache: true
        };
      }
      
      // Fetch all profile-related data in parallel
      const [profile, resume, applications] = await Promise.all([
        candidateService.getProfile().catch(() => null),
        candidateService.getResume().catch(() => null),
        candidateService.getJobApplications().catch(() => [])
      ]);
      
      return {
        profile: profile || null,
        resume: resume || null,
        applications: Array.isArray(applications) ? applications : [],
        fromCache: false
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch profile data'
      );
    }
  },
  {
    condition: (forceRefresh, { getState }) => {
      if (forceRefresh) return true;
      
      const state = getState();
      const profileDataState = state.profileData;
      const now = Date.now();
      
      if (profileDataState.lastFetchTime && 
          (now - profileDataState.lastFetchTime) < CACHE_DURATION_MS &&
          profileDataState.profile) {
        return false; // Skip dispatch, use cache
      }
      
      return true;
    }
  }
);

// Update profile (optimistic update)
export const updateProfileData = createAsyncThunk(
  'profileData/updateProfile',
  async (profileData, { rejectWithValue, dispatch }) => {
    try {
      const response = await candidateService.updateProfile(profileData);
      // Refresh profile data after update
      dispatch(fetchProfileData(true)); // Force refresh
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update profile'
      );
    }
  }
);

const initialState = {
  profile: null,
  resume: null,
  applications: [],
  loading: false,
  updating: false,
  error: null,
  lastFetchTime: null,
};

const profileDataSlice = createSlice({
  name: 'profileData',
  initialState,
  reducers: {
    clearProfileData: (state) => {
      state.profile = null;
      state.resume = null;
      state.applications = [];
      state.error = null;
      state.lastFetchTime = null;
    },
    forceRefresh: (state) => {
      state.lastFetchTime = null;
    },
    updateProfileField: (state, action) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile Data
      .addCase(fetchProfileData.pending, (state) => {
        if (!state.profile) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload.fromCache) {
          state.profile = action.payload.profile;
          state.resume = action.payload.resume;
          state.applications = action.payload.applications;
          state.lastFetchTime = Date.now();
        }
        state.error = null;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Profile
      .addCase(updateProfileData.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateProfileData.fulfilled, (state) => {
        state.updating = false;
        // Profile data will be refreshed by fetchProfileData
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfileData, forceRefresh, updateProfileField } = profileDataSlice.actions;
export default profileDataSlice.reducer;
