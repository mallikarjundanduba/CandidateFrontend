/**
 * Utility functions for candidate data management
 */

/**
 * Get candidate data from localStorage
 * @returns {Object|null} Candidate data object or null if not found
 */
export const getCandidateData = () => {
  try {
    const data = localStorage.getItem('candidateData');
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading candidate data from localStorage:', error);
  }
  return null;
};

/**
 * Get candidate ID from localStorage
 * @returns {string|null} Candidate ID or null if not found
 */
export const getCandidateId = () => {
  const candidateData = getCandidateData();
  return candidateData?.id || null;
};

/**
 * Get candidate email from localStorage
 * @returns {string|null} Candidate email or null if not found
 */
export const getCandidateEmail = () => {
  const candidateData = getCandidateData();
  return candidateData?.email || null;
};

/**
 * Set candidate data in localStorage (replaces entire data)
 * @param {Object} candidateData - Candidate data object
 */
export const setCandidateData = (candidateData) => {
  try {
    localStorage.setItem('candidateData', JSON.stringify(candidateData));
  } catch (error) {
    console.error('Error setting candidate data in localStorage:', error);
  }
};

/**
 * Update candidate data in localStorage (merges with existing data)
 * @param {Object} candidateData - Candidate data object
 */
export const updateCandidateData = (candidateData) => {
  try {
    const existingData = getCandidateData() || {};
    const updatedData = { ...existingData, ...candidateData };
    localStorage.setItem('candidateData', JSON.stringify(updatedData));
  } catch (error) {
    console.error('Error updating candidate data in localStorage:', error);
  }
};

/**
 * Clear candidate data from localStorage
 */
export const clearCandidateData = () => {
  try {
    localStorage.removeItem('candidateData');
  } catch (error) {
    console.error('Error clearing candidate data from localStorage:', error);
  }
};
