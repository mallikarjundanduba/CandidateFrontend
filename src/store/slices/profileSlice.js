import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';
import { candidateService } from '../../services/candidateService';
import { setCandidateData, getCandidateData } from '../../utils/candidateUtils';

// Async thunk for fetching profile (uses /me endpoint - fast)
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (suppressLogging = false, { rejectWithValue }) => {
    try {
      const response = await authService.getMe(suppressLogging);
      if (response) {
        setCandidateData(response);
      }
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || error.response?.data?.message || error.message || 'Failed to fetch profile'
      );
    }
  }
);

// Async thunk for updating profile
export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await candidateService.updateProfile(profileData);
      if (response) {
        setCandidateData(response);
      }
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update profile'
      );
    }
  }
);

// Initialize from localStorage if available
const initialProfileData = getCandidateData() || null;

const initialState = {
  data: initialProfileData,
  loading: false,
  updating: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.data = action.payload;
      if (action.payload) {
        setCandidateData(action.payload);
      }
    },
    clearProfile: (state) => {
      state.data = null;
      state.error = null;
    },
    updateProfileField: (state, action) => {
      if (state.data) {
        state.data = { ...state.data, ...action.payload };
        setCandidateData(state.data);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updating = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });
  },
});

export const { setProfile, clearProfile, updateProfileField } = profileSlice.actions;
export default profileSlice.reducer;
