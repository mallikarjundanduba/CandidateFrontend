import axios from "axios";
import { ADMIN_BACKEND_URL } from "../constants/api";

/**
 * Job service - handles job fetching API calls for candidates
 */
const jobApiClient = axios.create({
  baseURL: ADMIN_BACKEND_URL,
  withCredentials: false, // Public endpoint, no credentials needed
  headers: {
    "Content-Type": "application/json"
  }
});

export const jobService = {
  /**
   * Get all jobs (available to candidates)
   * @param {string} candidateEmail - Optional candidate email to include applied status
   * @returns {Promise<Array>}
   */
  getAllJobs: async (candidateEmail = null) => {
    const url = candidateEmail
      ? `/api/jobs?candidateEmail=${encodeURIComponent(candidateEmail)}`
      : "/api/jobs";
    const response = await jobApiClient.get(url);
    return response.data;
  },

  /**
   * Get job by ID
   * @param {number} id - Job ID
   * @returns {Promise<object>}
   */
  getJobById: async (id) => {
    const response = await jobApiClient.get(`/api/jobs/${id}`);
    return response.data;
  },

  /**
   * Apply for a job
   * @param {number} jobId - Job ID
   * @param {string} candidateEmail - Candidate email
   * @returns {Promise<{message: string}>}
   */
  applyForJob: async (jobId, candidateEmail) => {
    const response = await jobApiClient.post(`/api/jobs/${jobId}/apply`, {
      candidateEmail
    });
    return response.data;
  },

  /**
   * Check if candidate has applied for a job
   * @param {number} jobId - Job ID
   * @param {string} candidateEmail - Candidate email
   * @returns {Promise<{applied: boolean}>}
   */
  hasApplied: async (jobId, candidateEmail) => {
    const response = await jobApiClient.get(`/api/jobs/${jobId}/applied?candidateEmail=${encodeURIComponent(candidateEmail)}`);
    return response.data;
  }
};

