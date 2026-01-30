import apiClient from "./apiService";

/**
 * Candidate service - handles all candidate-related API calls
 */

export const candidateService = {
  /**
   * Get current candidate profile
   * @returns {Promise<Object>}
   */
  getProfile: async () => {
    const response = await apiClient.get("/candidates/profile");
    return response.data;
  },

  /**
   * Get candidate resume
   * @returns {Promise<Object>}
   */
  getResume: async () => {
    const response = await apiClient.get("/candidates/resume");
    return response.data;
  },

  /**
   * Get candidate job applications
   * @returns {Promise<Array>}
   */
  getJobApplications: async () => {
    const response = await apiClient.get("/candidates/applications");
    return response.data;
  },

  /**
   * Update candidate profile
   * @param {Object} profileData
   * @returns {Promise<Object>}
   */
  updateProfile: async (profileData) => {
    const response = await apiClient.put("/candidates/profile", profileData);
    return response.data;
  },

  /**
   * Download resume
   * @param {string} resumePath
   * @returns {Promise<Blob>}
   */
  downloadResume: async (resumePath) => {
    const response = await apiClient.get("/candidates/resume/download", {
      params: { path: resumePath },
      responseType: 'blob'
    });
    return response.data;
  },

  /**
   * Get inbox notifications
   * @returns {Promise<Array>}
   */
  getInboxNotifications: async () => {
    const response = await apiClient.get("/candidates/inbox");
    return response.data;
  },

  /**
   * Get unread notification count
   * @returns {Promise<{unreadCount: number}>}
   */
  getUnreadCount: async () => {
    const response = await apiClient.get("/candidates/inbox/unread-count");
    return response.data;
  },

  /**
   * Get recent activities
   * @returns {Promise<Array>}
   */
  getRecentActivities: async () => {
    const response = await apiClient.get("/candidates/activities");
    return response.data;
  },

  /**
   * Get assessments for the current candidate
   * @returns {Promise<Array>}
   */
  getMyAssessments: async () => {
    const response = await apiClient.get("/candidates/assessments");
    return response.data;
  },

  /**
   * Mark a specific notification as read
   * @param {string} id 
   */
  markNotificationAsRead: async (id) => {
    const response = await apiClient.put(`/candidates/inbox/${id}/read`);
    return response.data;
  },

  /**
   * Mark all notifications of a specific type as read
   * @param {string} type 
   */
  markNotificationsByTypeAsRead: async (type) => {
    const response = await apiClient.put(`/candidates/inbox/read-type`, null, {
      params: { type }
    });
    return response.data;
  },

  /**
   * Get dashboard statistics for current candidate
   * @returns {Promise<Object>}
   */
  getDashboardStats: async () => {
    const response = await apiClient.get("/candidates/dashboard-stats");
    return response.data;
  },

  /**
   * Get all dashboard data in a single optimized call
   * Returns: stats, unreadCount, recentActivities
   * @returns {Promise<Object>}
   */
  getAllDashboardData: async () => {
    const response = await apiClient.get("/candidates/dashboard/all");
    return response.data;
  },

  /**
   * Get assigned mock tests for current candidate
   * @returns {Promise<Object>} - { tests: [], count: number }
   */
  getAssignedTests: async () => {
    const response = await apiClient.get("/candidates/assigned-tests");
    return response.data;
  },

};

