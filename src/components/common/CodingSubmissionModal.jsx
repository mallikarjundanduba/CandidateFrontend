import React, { useState, useEffect } from "react";
import { X, Code, FileText, CheckCircle, AlertCircle, Clock, Save } from "lucide-react";
import { codingService } from "../../services/codingService";

const CodingSubmissionModal = ({ submissionId, isOpen, onClose }) => {
    const [submission, setSubmission] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen && submissionId) {
            loadSubmissionDetail();
        }
    }, [isOpen, submissionId]);

    const loadSubmissionDetail = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await codingService.getSubmission(submissionId);

            // If description is missing, try to fetch it
            if (!data.problemDescription || data.problemDescription === "No description available.") {
                let detailsFound = false;

                // 1. If we have questionId, try AI endpoint first, then fallback to Problem endpoint
                if (data.questionId) {
                    try {
                        const questionData = await codingService.getAiQuestion(data.questionId);
                        if (questionData) {
                            data.problemTitle = questionData.title || data.problemTitle;
                            data.problemDescription = questionData.description || data.problemDescription;
                            data.problemConstraints = questionData.constraints || data.problemConstraints;
                            // If submission doesn't have test results, maybe show question test cases?
                            // For now, prioritising constraints as requested.
                            detailsFound = true;
                        }
                    } catch (err) {
                        // Fallback: Try treating it as an offline problem ID
                        try {
                            const problemData = await codingService.getProblem(data.questionId);
                            if (problemData) {
                                data.problemTitle = problemData.title || data.problemTitle;
                                data.problemDescription = problemData.description || data.problemDescription;
                                data.problemConstraints = problemData.constraints || data.problemConstraints;
                                detailsFound = true;
                            }
                        } catch (ignore) { }
                    }
                }

                // 2. If we have problemId and still no details, try Problem endpoint
                if (!detailsFound && data.problemId) {
                    try {
                        const problemData = await codingService.getProblem(data.problemId);
                        if (problemData) {
                            data.problemTitle = problemData.title || data.problemTitle;
                            data.problemDescription = problemData.description || data.problemDescription;
                            data.problemConstraints = problemData.constraints || data.problemConstraints;
                        }
                    } catch (err) {
                        console.error("Failed to fetch problem details:", err);
                    }
                }
            }

            setSubmission(data);
        } catch (err) {
            console.error("Error loading submission detail:", err);
            setError("Failed to load submission details");
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "ACCEPTED":
                return "text-green-600 dark:text-green-400";
            case "WRONG_ANSWER":
                return "text-red-600 dark:text-red-400";
            case "COMPILATION_ERROR":
            case "RUNTIME_ERROR":
                return "text-orange-600 dark:text-orange-400";
            default:
                return "text-gray-600 dark:text-gray-400";
        }
    };

    const getStatusBg = (status) => {
        switch (status) {
            case "ACCEPTED":
                return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800";
            case "WRONG_ANSWER":
                return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
            case "COMPILATION_ERROR":
            case "RUNTIME_ERROR":
                return "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800";
            default:
                return "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800";
        }
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
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col my-8">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between z-10">
                    <div className="flex items-center gap-3">
                        <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Coding Submission Detail
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-12">
                            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                            <p className="text-red-600 dark:text-red-400">{error}</p>
                        </div>
                    ) : submission ? (
                        <div className="space-y-6">
                            {/* Submission Status & Meta */}
                            <div className={`p-4 rounded-lg border ${getStatusBg(submission.status)} flex flex-wrap items-center justify-between gap-4`}>
                                <div className="flex items-center gap-3">
                                    <div className={`text-lg font-bold ${getStatusColor(submission.status)}`}>
                                        {submission.status.replace(/_/g, " ")}
                                    </div>
                                    <div className="h-4 w-px bg-gray-300 dark:bg-gray-700 mx-2"></div>
                                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {submission.passedTestCases} / {submission.totalTestCases} Test Cases Passed
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-3.5 w-3.5" />
                                        {formatDate(submission.submittedAt)}
                                    </div>
                                    {submission.executionTime > 0 && (
                                        <div className="flex items-center gap-1">
                                            <Save className="h-3.5 w-3.5" />
                                            {submission.executionTime}ms
                                        </div>
                                    )}
                                    <div className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 font-mono">
                                        {submission.language}
                                    </div>
                                </div>
                            </div>

                            {/* Problem Statement */}
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {submission.problemTitle || "Problem Statement"}
                                    </h3>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                                    <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap prose dark:prose-invert max-w-none">
                                        {submission.problemDescription || "No description available."}
                                    </div>
                                </div>
                            </div>

                            {/* Constraints */}
                            {submission.problemConstraints && (
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                        Constraints
                                    </h3>
                                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                                        <div className="text-sm text-gray-700 dark:text-gray-300 font-mono whitespace-pre-wrap">
                                            {submission.problemConstraints}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Test Cases */}
                            {submission.testCaseResults && submission.testCaseResults.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Test Cases
                                        </h3>
                                    </div>
                                    <div className="space-y-3">
                                        {submission.testCaseResults.map((tc, idx) => (
                                            <div key={idx} className={`border rounded-lg p-3 ${tc.status === 'PASSED'
                                                ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
                                                : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
                                                }`}>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                                                        Test Case #{tc.testCaseNumber || idx + 1}
                                                    </span>
                                                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${tc.status === 'PASSED'
                                                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                                        : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                                                        }`}>
                                                        {tc.status}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                                                    <div>
                                                        <div className="text-gray-500 mb-1">Input:</div>
                                                        <div className="bg-white dark:bg-gray-800 p-1.5 rounded border border-gray-200 dark:border-gray-700">
                                                            {tc.input}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-gray-500 mb-1">Expected:</div>
                                                        <div className="bg-white dark:bg-gray-800 p-1.5 rounded border border-gray-200 dark:border-gray-700">
                                                            {tc.expectedOutput}
                                                        </div>
                                                    </div>
                                                    {tc.status !== 'PASSED' && (
                                                        <div className="col-span-2">
                                                            <div className="text-red-500 mb-1">Actual Output:</div>
                                                            <div className="bg-red-50 dark:bg-red-900/20 p-1.5 rounded border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300">
                                                                {tc.actualOutput || (tc.error ? `Error: ${tc.error}` : 'Empty output')}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Submitted Code */}
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Code className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Your Submission
                                    </h3>
                                </div>
                                <div className="relative group">
                                    <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg font-mono text-sm overflow-x-auto">
                                        <code>{submission.code}</code>
                                    </pre>
                                </div>
                            </div>

                            {/* Errors if any */}
                            {submission.error && (
                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2 text-red-600 dark:text-red-400 font-semibold">
                                        <AlertCircle className="h-5 w-5" />
                                        Error Details
                                    </div>
                                    <pre className="text-xs font-mono text-red-800 dark:text-red-300 whitespace-pre-wrap">
                                        {submission.error}
                                    </pre>
                                </div>
                            )}
                        </div>
                    ) : null}
                </div>
            </div>
        </div >
    );
};

export default CodingSubmissionModal;
