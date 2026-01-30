import apiClient from "./apiService";

/**
 * Trending Skills service - handles trending skills API calls
 */
export const trendingSkillsService = {
  /**
   * Get today's trending skills (IT and Non-IT)
   * @returns {Promise<Object>} - { itSkills: [], nonItSkills: [], updatedAt: string }
   */
  getTodaysTrendingSkills: async () => {
    const response = await apiClient.get("/api/trending-skills/today");
    return response.data;
  },

  /**
   * Get latest trending skills (most recent available)
   * @returns {Promise<Object>} - { itSkills: [], nonItSkills: [], updatedAt: string }
   */
  getLatestTrendingSkills: async () => {
    const response = await apiClient.get("/api/trending-skills/latest");
    return response.data;
  }
};
