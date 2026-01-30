import apiClient from "./apiService";

/**
 * Interview Service - handles interview Q&A API calls
 */

export const interviewService = {
  /**
   * Save interview question and answer to MongoDB session (all Q&A in one document)
   * @param {Object} data - { questionId, question, answer, questionType, candidateId, sessionId, questionSetId }
   * @returns {Promise<Object>}
   */
  saveQuestionAnswer: async (data) => {
    const response = await apiClient.post("/api/interviews/question-answer", data);
    return response.data;
  },

  /**
   * Get interview answers for a candidate
   * @param {string} candidateId
   * @param {string} questionType - Optional filter by question type
   * @returns {Promise<Array>}
   */
  getCandidateAnswers: async (candidateId, questionType = null) => {
    const params = { candidateId };
    if (questionType) {
      params.questionType = questionType;
    }
    const response = await apiClient.get("/interviews/answers", { params });
    return response.data;
  },

  /**
   * Get all questions and answers for a candidate
   * @param {string} candidateId
   * @returns {Promise<Array>}
   */
  getInterviewHistory: async (candidateId) => {
    const response = await apiClient.get(`/interviews/history/${candidateId}`);
    return response.data;
  },

  /**
   * Analyze interview answers with AI
   * @param {Object} data - { sessionId, questionType, candidateId, allQuestionAnswers }
   * @returns {Promise<Object>} - { score, issues, improvements, feedback }
   */
  analyzeAnswers: async (data) => {
    const response = await apiClient.post("/api/interviews/analyze", data);
    return response.data;
  },

  /**
   * Get interview session by sessionId
   * @param {string} sessionId
   * @returns {Promise<Object>} - Session data with all Q&A pairs
   */
  getSession: async (sessionId) => {
    const response = await apiClient.get(`/api/interviews/session/${sessionId}`);
    return response.data;
  },

  /**
   * Get candidate test results with pagination
   * @param {string} candidateId
   * @param {string} questionType - Optional filter by question type
   * @param {number} page - Page number (0-indexed)
   * @param {number} size - Page size (default 20)
   * @returns {Promise<Object>} - Paginated results
   */
  getCandidateResults: async (candidateId, questionType = null, page = 0, size = 20) => {
    const params = { page, size };
    if (questionType) {
      params.questionType = questionType;
    }
    const response = await apiClient.get(`/api/interviews/candidate/${candidateId}/results`, { params });
    return response.data;
  }
};

