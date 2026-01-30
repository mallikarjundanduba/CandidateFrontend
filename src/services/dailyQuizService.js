import apiClient from "./apiService";

/**
 * Daily Quiz service - handles daily quiz questions and answers
 */

export const dailyQuizService = {
  /**
   * Get today's quiz questions with user's answer status
   * @returns {Promise<Object>} { success: boolean, quizDate: string, questions: Array }
   */
  getTodaysQuiz: async () => {
    const response = await apiClient.get("/api/daily-quiz/today");
    return response.data;
  },

  /**
   * Submit answer for a quiz question
   * @param {string} questionId - Question ID
   * @param {number} selectedAnswerIndex - Index of selected answer (0-based)
   * @returns {Promise<Object>} { success: boolean, isCorrect: boolean, correctAnswerIndex: number, explanation: string }
   */
  submitAnswer: async (questionId, selectedAnswerIndex) => {
    const response = await apiClient.post("/api/daily-quiz/submit-answer", {
      questionId,
      selectedAnswerIndex
    });
    return response.data;
  },
};
