import React, { useState, useEffect } from "react";
import { X, Award, AlertCircle, TrendingUp, MessageSquare, CheckCircle, Clock } from "lucide-react";
import { interviewService } from "../../services/interviewService";

const InterviewReportModal = ({ sessionId, isOpen, onClose }) => {
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && sessionId) {
      loadSessionData();
    }
  }, [isOpen, sessionId]);

  const loadSessionData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await interviewService.getSession(sessionId);
      if (response.success) {
        setSessionData(response);
      } else {
        setError("Session not found");
      }
    } catch (err) {
      console.error("Error loading session data:", err);
      setError("Failed to load session data");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-blue-600 dark:text-blue-400";
    if (score >= 40) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800";
    if (score >= 60) return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800";
    if (score >= 40) return "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800";
    return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch {
      return dateString;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Interview Report
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          ) : sessionData ? (
            <div className="space-y-6">
              {/* Session Info */}
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Question Type:</span>
                    <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                      {sessionData.questionType?.replace("_", " ") || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Completed At:</span>
                    <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                      {formatDate(sessionData.completedAt)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Total Questions:</span>
                    <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                      {sessionData.questionAnswers?.length || 0}
                    </span>
                  </div>
                  {sessionData.analyzedAt && (
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Analyzed At:</span>
                      <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                        {formatDate(sessionData.analyzedAt)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Score Section */}
              {sessionData.score !== undefined && sessionData.score !== null && (
                <div className={`rounded-lg p-6 border ${getScoreBgColor(sessionData.score)}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Award className={`h-8 w-8 ${getScoreColor(sessionData.score)}`} />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Overall Score
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Based on AI analysis of your responses
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-4xl font-bold ${getScoreColor(sessionData.score)}`}>
                        {sessionData.score}%
                      </div>
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                        <div
                          className={`h-2 rounded-full ${
                            sessionData.score >= 80 ? "bg-green-600" :
                            sessionData.score >= 60 ? "bg-blue-600" :
                            sessionData.score >= 40 ? "bg-orange-600" : "bg-red-600"
                          }`}
                          style={{ width: `${sessionData.score}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Questions and Answers */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Questions & Answers
                </h3>
                <div className="space-y-4">
                  {sessionData.questionAnswers?.map((qa, index) => (
                    <div
                      key={qa.questionId || index}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1">
                          {/* Question */}
                          <div className="mb-3">
                            <div className="flex items-center gap-2 mb-1">
                              <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                Question
                              </span>
                            </div>
                            <p className="text-sm text-gray-900 dark:text-white">
                              {qa.question || "N/A"}
                            </p>
                          </div>

                          {/* Answer */}
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                Your Answer
                              </span>
                              {qa.durationSeconds && (
                                <span className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {qa.durationSeconds}s
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 rounded p-3">
                              {qa.answer || "No response"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Analysis Results */}
              {sessionData.score !== undefined && sessionData.score !== null && (
                <div className="space-y-4">
                  {/* Strengths */}
                  {sessionData.strengths && sessionData.strengths.length > 0 && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <h3 className="text-lg font-semibold text-green-900 dark:text-green-300">
                          Strengths
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {sessionData.strengths.map((strength, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-green-800 dark:text-green-300">
                            <span className="text-green-600 dark:text-green-400 mt-1">•</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Issues */}
                  {sessionData.issues && sessionData.issues.length > 0 && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        <h3 className="text-lg font-semibold text-red-900 dark:text-red-300">
                          Issues Identified
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {sessionData.issues.map((issue, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-red-800 dark:text-red-300">
                            <span className="text-red-600 dark:text-red-400 mt-1">•</span>
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Improvements */}
                  {sessionData.improvements && sessionData.improvements.length > 0 && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300">
                          Areas for Improvement
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {sessionData.improvements.map((improvement, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-blue-800 dark:text-blue-300">
                            <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Feedback */}
                  {sessionData.feedback && (
                    <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Detailed Feedback
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {sessionData.feedback}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default InterviewReportModal;

