import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dailyQuizService } from '../../services/dailyQuizService';

// Cache duration: 24 hours (quiz changes daily at midnight)
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

// Fetch today's quiz questions
export const fetchTodaysQuiz = createAsyncThunk(
  'dailyQuiz/fetchTodaysQuiz',
  async (forceRefresh = false, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const quizState = state.dailyQuiz;
      const now = Date.now();
      
      // Check cache if not forcing refresh
      // Quiz changes daily, so we check if it's still the same day
      const today = new Date().toDateString();
      const cachedDate = quizState.quizDate ? new Date(quizState.quizDate).toDateString() : null;
      
      if (!forceRefresh && 
          cachedDate === today &&
          quizState.questions &&
          quizState.questions.length > 0) {
        return {
          questions: quizState.questions,
          quizDate: quizState.quizDate,
          fromCache: true
        };
      }
      
      const data = await dailyQuizService.getTodaysQuiz();
      
      if (data.success && data.questions) {
        return {
          questions: data.questions || [],
          quizDate: data.quizDate || today,
          fromCache: false
        };
      } else {
        return {
          questions: [],
          quizDate: today,
          fromCache: false
        };
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch daily quiz'
      );
    }
  },
  {
    condition: (forceRefresh, { getState }) => {
      if (forceRefresh) return true;
      
      const state = getState();
      const quizState = state.dailyQuiz;
      const today = new Date().toDateString();
      const cachedDate = quizState.quizDate ? new Date(quizState.quizDate).toDateString() : null;
      
      // Only skip if same day and has questions
      if (cachedDate === today && quizState.questions && quizState.questions.length > 0) {
        return false; // Skip dispatch, use cache
      }
      
      return true;
    }
  }
);

// Submit quiz answer
export const submitQuizAnswer = createAsyncThunk(
  'dailyQuiz/submitAnswer',
  async ({ questionId, selectedAnswerIndex }, { rejectWithValue, getState }) => {
    try {
      const result = await dailyQuizService.submitAnswer(questionId, selectedAnswerIndex);
      
      if (result.success) {
        return {
          questionId,
          selectedAnswerIndex,
          isCorrect: result.isCorrect,
          correctAnswerIndex: result.correctAnswerIndex,
          explanation: result.explanation || ''
        };
      } else {
        return rejectWithValue(result.message || 'Failed to submit answer');
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to submit answer'
      );
    }
  }
);

const initialState = {
  questions: [],
  quizDate: null,
  loading: false,
  submitting: false,
  error: null,
};

const dailyQuizSlice = createSlice({
  name: 'dailyQuiz',
  initialState,
  reducers: {
    clearDailyQuiz: (state) => {
      state.questions = [];
      state.quizDate = null;
      state.error = null;
    },
    updateQuestionAnswer: (state, action) => {
      // Optimistically update question with answer (used when answer is submitted)
      const { questionId, selectedAnswerIndex, isCorrect, correctAnswerIndex, explanation } = action.payload;
      
      const question = state.questions.find(q => q.questionId === questionId);
      if (question) {
        question.answered = true;
        question.selectedAnswerIndex = selectedAnswerIndex;
        question.isCorrect = isCorrect;
        question.correctAnswerIndex = correctAnswerIndex;
        question.explanation = explanation;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Today's Quiz
      .addCase(fetchTodaysQuiz.pending, (state) => {
        if (!state.questions || state.questions.length === 0) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(fetchTodaysQuiz.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload.fromCache) {
          state.questions = action.payload.questions;
          state.quizDate = action.payload.quizDate;
        }
        state.error = null;
      })
      .addCase(fetchTodaysQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Submit Answer
      .addCase(submitQuizAnswer.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(submitQuizAnswer.fulfilled, (state, action) => {
        state.submitting = false;
        // Update the question with answer details
        const { questionId, selectedAnswerIndex, isCorrect, correctAnswerIndex, explanation } = action.payload;
        const question = state.questions.find(q => q.questionId === questionId);
        if (question) {
          question.answered = true;
          question.selectedAnswerIndex = selectedAnswerIndex;
          question.isCorrect = isCorrect;
          question.correctAnswerIndex = correctAnswerIndex;
          question.explanation = explanation;
        }
      })
      .addCase(submitQuizAnswer.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      });
  },
});

export const { clearDailyQuiz, updateQuestionAnswer } = dailyQuizSlice.actions;
export default dailyQuizSlice.reducer;
