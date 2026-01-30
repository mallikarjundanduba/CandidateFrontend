import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import dashboardReducer from './slices/dashboardSlice';
import inboxReducer from './slices/inboxSlice';
import jobsReducer from './slices/jobsSlice';
import assessmentsReducer from './slices/assessmentsSlice';
import profileDataReducer from './slices/profileDataSlice';
import codingReducer from './slices/codingSlice';
import dailyQuizReducer from './slices/dailyQuizSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    dashboard: dashboardReducer,
    inbox: inboxReducer,
    jobs: jobsReducer,
    assessments: assessmentsReducer,
    profileData: profileDataReducer,
    coding: codingReducer,
    dailyQuiz: dailyQuizReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['auth/login/fulfilled', 'profile/setProfile'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['auth.profile', 'profile.data'],
      },
    }),
});
