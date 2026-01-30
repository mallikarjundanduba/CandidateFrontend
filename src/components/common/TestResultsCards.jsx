import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Award, FileText, Calendar } from "lucide-react";
import { interviewService } from "../../services/interviewService";
import { codingService } from "../../services/codingService";
import InterviewReportModal from "./InterviewReportModal";
import CodingSubmissionModal from "./CodingSubmissionModal";

const TestResultsCards = ({ questionType, candidateId, isAiGenerated = false }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isCodingModalOpen, setIsCodingModalOpen] = useState(false);
  const pageSize = 12;
  const isCoding = questionType === "CODING";

  useEffect(() => {
    if (candidateId) {
      loadResults();
    }
  }, [candidateId, questionType, page]);

  const loadResults = async () => {
    try {
      setLoading(true);

      if (isCoding) {
        // Load coding submissions based on type
        let submissions = [];
        if (isAiGenerated) {
          submissions = await codingService.getAiSubmissions();
        } else {
          submissions = await codingService.getOfflineSubmissions();
        }

        // Apply pagination manually
        const start = page * pageSize;
        const end = start + pageSize;
        const paginatedSubmissions = submissions.slice(start, end);

        // Transform to match the expected format
        const transformedResults = paginatedSubmissions.map(sub => ({
          id: sub.submissionId || sub.id,
          title: `Coding Problem - ${sub.problemId ? sub.problemId.substring(0, 8) : (sub.questionId ? 'AI Generated' : 'N/A')}`,
          numberOfQuestions: 1, // Coding problems are single problems
          score: sub.totalTestCases > 0
            ? Math.round((sub.passedTestCases / sub.totalTestCases) * 100)
            : 0,
          passedTestCases: sub.passedTestCases || 0,
          totalTestCases: sub.totalTestCases || 0,
          completedAt: sub.submittedAt || sub.createdAt
        }));

        setResults(transformedResults);
        setTotal(submissions.length);
        setTotalPages(Math.ceil(submissions.length / pageSize));
      } else {
        // Load interview results
        const response = await interviewService.getCandidateResults(
          candidateId,
          questionType,
          page,
          pageSize
        );
        if (response.success) {
          setResults(response.results || []);
          setTotalPages(response.totalPages || 0);
          setTotal(response.total || 0);
        }
      }
    } catch (error) {
      console.error("Error loading test results:", error);
      setResults([]);
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

  const getCircleColor = (score) => {
    if (score >= 80) return "stroke-green-600 dark:stroke-green-400";
    if (score >= 60) return "stroke-blue-600 dark:stroke-blue-400";
    if (score >= 40) return "stroke-orange-600 dark:stroke-orange-400";
    return "stroke-red-600 dark:stroke-red-400";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  const CircularProgress = ({ score, size = 60 }) => {
    const radius = (size - 8) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    const color = getCircleColor(score);

    return (
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={color}
            style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
          />
        </svg>
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-[10px] font-bold ${getScoreColor(score)}`}>
            {score}%
          </span>
        </div>
      </div>
    );
  };

  if (loading && page === 0) {
    return (
      <div className="mt-6">
        <div className="flex items-center justify-center py-8">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (results.length === 0 && !loading) {
    return (
      <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-6 text-gray-200">
          <FileText size={40} strokeWidth={1.5} />
        </div>
        <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-2">No results found</h3>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest max-w-[240px] leading-relaxed">
          Complete your first generative session to see your performance metrics here
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        {/* Header with count */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Test Results <span className="text-gray-500 dark:text-gray-400 font-normal">({total})</span>
          </h3>
          {totalPages > 1 && (
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              <span>
                Page {page + 1} of {totalPages}
              </span>
            </div>
          )}
        </div>

        {/* Stats Cards Grid - Responsive: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {results.map((result) => {
            const score = result.score || 0;
            const displayDate = result.completedAt || result.createdAt || "";

            // Extract question type name from title (remove date part if present)
            let questionTypeName = result.questionType || questionType || "Test";
            if (result.title) {
              // If title contains " - ", split and take first part
              const titleParts = result.title.split(" - ");
              if (titleParts.length > 0) {
                questionTypeName = titleParts[0].trim();
              } else {
                questionTypeName = result.title;
              }
            }
            // Format question type name (replace underscores with spaces, uppercase)
            questionTypeName = questionTypeName.replace(/_/g, " ").toUpperCase();

            return (
              <div
                key={result.id || result.sessionId}
                onClick={() => {
                  if (!isCoding && result.sessionId) {
                    setSelectedSessionId(result.sessionId);
                    setIsReportOpen(true);
                  } else if (isCoding && result.id) {
                    setSelectedSubmissionId(result.id);
                    setIsCodingModalOpen(true);
                  }
                }}
                className={`bg-white dark:bg-gray-800 rounded-lg p-2.5 border-2 ${getScoreBgColor(score)} hover:shadow-lg transition-all duration-200 flex flex-row items-center justify-between gap-3 ${(!isCoding && result.sessionId) || (isCoding && result.id) ? "cursor-pointer" : ""
                  }`}
              >
                {/* Left Side - Title, Date, Questions */}
                <div className="flex-1 min-w-0">
                  {/* Title */}
                  {result.topics && result.topics.length > 0 ? (
                    <h4 className="text-[11px] font-bold text-gray-900 dark:text-white mb-0.5 line-clamp-1 leading-tight">
                      {result.topics[0]}
                      {result.topics.length > 1 && (
                        <span className="text-gray-500 dark:text-gray-400 font-normal ml-0.5">
                          +{result.topics.length - 1}
                        </span>
                      )}
                    </h4>
                  ) : (
                    <h4 className="text-[11px] font-bold text-gray-900 dark:text-white mb-0.5 line-clamp-1 leading-tight">
                      {questionTypeName}
                    </h4>
                  )}

                  <div className="flex flex-col gap-0.5 mt-1">
                    {/* Date */}
                    <div className="flex items-center gap-1">
                      <Calendar className="h-2.5 w-2.5 text-gray-400 flex-shrink-0" />
                      <span className="text-[9px] text-gray-500 dark:text-gray-400">
                        {formatDate(displayDate)}
                      </span>
                    </div>

                    {/* Number of Questions */}
                    <div className="flex items-center gap-1">
                      <FileText className="h-2.5 w-2.5 text-gray-400 flex-shrink-0" />
                      <span className="text-[9px] font-medium text-gray-600 dark:text-gray-300">
                        {result.numberOfQuestions || 0} Qs
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side - Circular Progress */}
                <div className="flex-shrink-0">
                  {isCoding && result.passedTestCases !== undefined ? (
                    <div className="flex flex-col items-center">
                      <CircularProgress score={score} size={44} />
                      <span className="text-[8px] text-gray-500 dark:text-gray-400 mt-0.5 font-medium">
                        {result.passedTestCases}/{result.totalTestCases}
                      </span>
                    </div>
                  ) : (
                    <CircularProgress score={score} size={44} />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setPage((prev) => Math.max(0, prev - 1))}
              disabled={page === 0}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <span className="text-sm text-gray-600 dark:text-gray-400 px-4">
              Page {page + 1} of {totalPages}
            </span>

            <button
              onClick={() => setPage((prev) => Math.min(totalPages - 1, prev + 1))}
              disabled={page >= totalPages - 1}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Interview Report Modal */}
        {!isCoding && (
          <InterviewReportModal
            sessionId={selectedSessionId}
            isOpen={isReportOpen}
            onClose={() => {
              setIsReportOpen(false);
              setSelectedSessionId(null);
            }}
          />
        )}

        {/* Coding Submission Modal */}
        <CodingSubmissionModal
          submissionId={selectedSubmissionId}
          isOpen={isCodingModalOpen}
          onClose={() => {
            setIsCodingModalOpen(false);
            setSelectedSubmissionId(null);
          }}
        />
      </div>
    </div>
  );
};

export default TestResultsCards;

