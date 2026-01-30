import apiClient from "./apiService";
import aiBackendClient from "./aiBackendService";

export const codingService = {
  /**
   * Get all problems
   */
  getProblems: async () => {
    const response = await apiClient.get("/api/coding/problems");
    return response.data;
  },

  /**
   * Get AI question by ID
   */
  getAiQuestion: async (questionId) => {
    const response = await apiClient.get(`/api/coding/ai-questions/${questionId}`);
    return response.data;
  },

  /**
   * Get problem by ID
   */
  getProblem: async (problemId) => {
    const response = await apiClient.get(`/api/coding/problems/${problemId}`);
    return response.data;
  },

  /**
   * Get all supported languages
   */
  getLanguages: async () => {
    const response = await apiClient.get("/api/coding/languages");
    return response.data;
  },

  /**
   * Run code with custom input
   * Now calls Python AI service directly (no Java backend interaction)
   */
  runCode: async ({ code, language, customInput, problemId, candidateId, questionId, isAiGenerated }) => {
    const response = await apiClient.post("/api/coding/run", {
      code,
      language,
      customInput: customInput || "",
      problemId: problemId || null,
      questionId: questionId || null,  // For AI-generated questions
      isAiGenerated: isAiGenerated
    });
    return response.data;
  },

  /**
   * Submit code for evaluation
   */
  submitCode: async ({ code, language, problemId, questionId }) => {
    // For AI-generated questions, use the new test case execution endpoint
    if (questionId) {
      const response = await aiBackendClient.post("/execute-test-cases", {
        code,
        language,
        questionId
      });
      return response.data;
    }

    // For regular problems, use the existing endpoint
    const response = await apiClient.post("/api/coding/submit", {
      code,
      language,
      problemId,
      questionId: questionId || null
    });
    return response.data;
  },

  /**
   * Execute code against all test cases (for AI-generated questions)
   */
  executeTestCases: async ({ code, language, questionId, candidateId }) => {
    const response = await aiBackendClient.post("/execute-test-cases", {
      code,
      language,
      questionId,
      candidateId: candidateId || null
    });
    return response.data;
  },

  /**
   * Get submission history
   */
  getSubmissions: async (problemId = null) => {
    const url = problemId
      ? `/api/coding/submissions?problemId=${problemId}`
      : "/api/coding/submissions";
    const response = await apiClient.get(url);
    return response.data;
  },

  /**
   * Get AI-generated submissions
   */
  getAiSubmissions: async () => {
    const response = await apiClient.get("/api/coding/submissions/ai");
    return response.data;
  },

  /**
   * Get Offline submissions
   */
  getOfflineSubmissions: async () => {
    const response = await apiClient.get("/api/coding/submissions/offline");
    return response.data;
  },
  /**
   * Get submission by ID
   */
  getSubmission: async (submissionId) => {
    const response = await apiClient.get(`/api/coding/submissions/${submissionId}`);
    return response.data;
  },

  /**
   * Submit code result to store progress
   */
  saveSubmission: async (submissionData) => {
    const response = await apiClient.post("/api/coding/submission", submissionData);
    return response.data;
  },

  /**
   * Get candidate progress (stars)
   */
  fetchProgress: async (candidateId) => {
    const response = await apiClient.get(`/api/coding/progress/${candidateId}`);
    return response.data;
  },

  generateProblem: async ({ language, difficulty, topics }) => {
    const response = await aiBackendClient.post("/generate-coding-question", {
      language,
      difficulty,
      topics: topics || []
    });
    return response.data;
  },

  /**
   * Save practice progress (code + test results)
   */
  savePracticeProgress: async (data) => {
    const response = await apiClient.post("/api/coding/practice/save", data);
    return response.data;
  },

  /**
   * Update practice progress (PUT method)
   */
  updatePracticeProgress: async (submissionId, data) => {
    const response = await apiClient.put(`/api/coding/practice/update/${submissionId}`, data);
    return response.data;
  },

  /**
   * Generate solution for offline coding questions
   */
  generateSolution: async ({ description, functionSignature, language }) => {
    const response = await aiBackendClient.post("/generate-solution", {
      description,
      functionSignature,
      language
    });
    return response.data;
  },

  /**
   * Save code draft
   */
  saveDraft: async (data) => {
    const response = await apiClient.post("/api/coding/save-draft", data);
    return response.data;
  },

  /**
   * Get last saved code (draft or submission)
   */
  getLastCode: async (problemId, questionId) => {
    // Build query params
    const params = new URLSearchParams();
    if (problemId) params.append("problemId", problemId);
    if (questionId) params.append("questionId", questionId);

    const response = await apiClient.get(`/api/coding/last-code?${params.toString()}`);
    return response.data;
  }
};

