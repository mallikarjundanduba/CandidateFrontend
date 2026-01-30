import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';
import { setCandidateData, clearCandidateData } from '../../utils/candidateUtils';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Login response now only contains basic info (no profile)
      const response = await authService.login(email, password);
      
      // After successful login, fetch profile via /me endpoint (fast)
      let profile = null;
      try {
        profile = await authService.getMe();
        if (profile) {
          setCandidateData(profile);
        }
      } catch (meError) {
        // Log but don't fail login if /me fails
        console.warn('Failed to fetch profile after login:', meError);
      }
      
      return { ...response, profile };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Invalid email or password'
      );
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      clearCandidateData();
      return null;
    } catch (error) {
      clearCandidateData(); // Clear even if API call fails
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

// Async thunk for refreshing token
export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.refreshToken();
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Token refresh failed'
      );
    }
  }
);

const initialState = {
  isAuthenticated: false,
  email: null,
  profile: null,
  needsPayment: false,
  needsRegistration: false,
  registrationPaid: false,
  isComplete: false,
  passwordChanged: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.profile = action.payload.profile;
      if (action.payload.profile) {
        setCandidateData(action.payload.profile);
      }
    },
    clearCredentials: (state) => {
      state.isAuthenticated = false;
      state.email = null;
      state.profile = null;
      state.needsPayment = false;
      state.needsRegistration = false;
      state.registrationPaid = false;
      state.isComplete = false;
      state.passwordChanged = false;
      state.error = null;
      clearCandidateData();
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.email = action.payload.profile?.email || null;
        state.profile = action.payload.profile || null;
        state.needsPayment = action.payload.needsPayment || false;
        state.needsRegistration = action.payload.needsRegistration || false;
        state.registrationPaid = action.payload.registrationPaid || false;
        state.isComplete = action.payload.isComplete || false;
        state.passwordChanged = action.payload.passwordChanged || false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.email = null;
        state.profile = null;
        state.needsPayment = false;
        state.needsRegistration = false;
        state.registrationPaid = false;
        state.isComplete = false;
        state.passwordChanged = false;
        state.error = null;
      })
      // Refresh Token
      .addCase(refreshToken.fulfilled, (state) => {
        // Token refreshed successfully, authentication state maintained
      })
      .addCase(refreshToken.rejected, (state) => {
        // Token refresh failed, clear authentication
        state.isAuthenticated = false;
        state.email = null;
        state.profile = null;
        clearCandidateData();
      });
  },
});

export const { setCredentials, clearCredentials, setAuthError, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
