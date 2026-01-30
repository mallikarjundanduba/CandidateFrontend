import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Play, Send, ChevronLeft, Loader2, Code, Lock, Check, X, ChevronDown, ChevronUp, Save } from "lucide-react";
import { codingService } from "../../services/codingService";
import { candidateService } from "../../services/candidateService";
import { useTheme } from "../../contexts/ThemeContext";

const AiCodingProblem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("JAVA");
  const [customInput, setCustomInput] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [showOutput, setShowOutput] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [candidateId, setCandidateId] = useState(null);
  const [questionId, setQuestionId] = useState(null);
  const [testCaseResults, setTestCaseResults] = useState([]); // Results for all 10 test cases
  const [activeTab, setActiveTab] = useState("testcases"); // "testcases" or "output"
  const [hasRunCode, setHasRunCode] = useState(false); // Track if code has been run
  const [showBottomPanel, setShowBottomPanel] = useState(false); // Control bottom panel visibility
  const [expandedTestCase, setExpandedTestCase] = useState(null); // Track which test case is expanded
  const [runningTestCaseIndex, setRunningTestCaseIndex] = useState(null); // Track which test case is currently running
  const [isExecutingTestCases, setIsExecutingTestCases] = useState(false); // Track if test cases are being executed
  const [showMobileDropdown, setShowMobileDropdown] = useState(false); // Control mobile dropdown visibility
  const [lastSaved, setLastSaved] = useState(null); // Timestamp of last save
  const [submissionId, setSubmissionId] = useState(null); // Track the single submission for this question

  useEffect(() => {
    // Get problem from navigation state
    if (location.state?.problem) {
      const problemData = location.state.problem;
      setProblem(problemData);
      setLanguage(problemData.language || "JAVA");
      setQuestionId(problemData.questionId);

      // Initialize test case results array (10 test cases)
      if (problemData.testCases && problemData.testCases.length > 0) {
        const initialResults = problemData.testCases.map((tc, index) => ({
          testCaseNumber: index + 1,
          input: tc.input,
          expectedOutput: tc.expectedOutput,
          isSample: tc.isSample !== false, // Default to true if not specified
          status: null, // null, "PASSED", "FAILED", "ERROR"
          actualOutput: null,
          error: null,
          executionTime: null
        }));
        setTestCaseResults(initialResults);
      } else {
        // Create placeholder for 10 test cases
        const placeholderResults = Array.from({ length: 10 }, (_, index) => ({
          testCaseNumber: index + 1,
          input: "",
          expectedOutput: "",
          isSample: index < 4, // First 4 are visible
          status: null,
          actualOutput: null,
          error: null,
          executionTime: null
        }));
        setTestCaseResults(placeholderResults);
      }

      // Check for saved code
      checkLastSavedCode(problemData.id, problemData.questionId, problemData);

    } else {
      // If no problem in state, redirect back
      navigate("/practice/ai/form");
    }
    loadCandidateProfile();
  }, [location.state]);

  const checkLastSavedCode = async (problemId, questionId, problemData) => {
    try {
      const result = await codingService.getLastCode(problemId, questionId);
      if (result && result.found && result.code) {
        setCode(result.code);
        if (result.language) setLanguage(result.language);
        if (result.lastModified) {
          const date = new Date(result.lastModified);
          setLastSaved(date.toLocaleTimeString());
        }
      } else {
        // No saved code, set default
        setDefaultCode(problemData);
      }

      // Initialize submission after code is set
      setTimeout(() => initializeSubmission(questionId, result?.code || ""), 100);
    } catch (error) {
      console.error("Failed to fetch last saved code:", error);
      setDefaultCode(problemData);
    }
  };

  const loadCandidateProfile = async () => {
    try {
      const profile = await candidateService.getProfile();
      if (profile && profile.id) {
        setCandidateId(profile.id.toString());
      }
    } catch (error) {
      console.error("Error loading candidate profile:", error);
    }
  };

  const initializeSubmission = async (qid, initialCode = "") => {
    if (!qid) return;

    try {
      // Check if there's already a submission for this question
      const submissions = await codingService.getSubmissions();
      const existingSubmission = submissions.find(sub => sub.questionId === qid);

      if (existingSubmission) {
        // Use existing submission
        setSubmissionId(existingSubmission.submissionId || existingSubmission.id);
      } else {
        // Create initial submission
        const profile = await candidateService.getProfile();
        const cid = profile?.id?.toString();

        const initialSubmission = await codingService.savePracticeProgress({
          questionId: qid,
          candidateId: cid,
          code: initialCode || code, // Save the boilerplate code
          language: language,
          status: "DRAFT",
          passedTestCases: 0,
          totalTestCases: problem?.testCases?.length || 10,
          isAiGenerated: true
        });

        setSubmissionId(initialSubmission.submissionId || initialSubmission.id);
      }
    } catch (error) {
      console.error("Failed to initialize submission:", error);
    }
  };

  const setDefaultCode = (problemData) => {
    if (!problemData) return;

    // Use codeTemplate from AI if available (HackerRank-style), otherwise use default templates
    if (problemData.codeTemplate) {
      setCode(problemData.codeTemplate);
      return;
    }

    // Fallback to default templates if no codeTemplate provided
    const templates = {
      JAVA: `public class Main {
    public static void main(String[] args) {
        // Write your code here
        
    }
}`,
      PYTHON: `# Write your code here

`,
      CPP: `#include <iostream>
using namespace std;

int main() {
    // Write your code here
    
    return 0;
}`,
      C: `#include <stdio.h>

int main() {
    // Write your code here
    
    return 0;
}`,
      JAVASCRIPT: `// Write your code here

`
    };

    setCode(templates[problemData.language] || templates.JAVA);
  };

  const handleSaveDraft = async (silent = false) => {
    if (!code.trim()) return null;

    if (!silent) setIsSaving(true);
    let currentId = submissionId;

    try {
      // Update existing submission with current code using PUT
      if (currentId) {
        await codingService.updatePracticeProgress(currentId, {
          code,
          language,
          problemId: problem.id || problem.problemId,
          questionId: questionId,
          candidateId: candidateId,
          status: "DRAFT",
          isAiGenerated: true
        });
      } else {
        // Fallback to POST if no submissionId
        const saved = await codingService.savePracticeProgress({
          code,
          language,
          problemId: problem.id || problem.problemId,
          questionId: questionId,
          candidateId: candidateId,
          status: "DRAFT",
          isAiGenerated: true
        });

        if (saved && (saved.submissionId || saved.id)) {
          currentId = saved.submissionId || saved.id;
          setSubmissionId(currentId);
        }
      }
      setLastSaved(new Date().toLocaleTimeString());
      if (!silent) {
        // Optional: toast success
      }
      return currentId;
    } catch (error) {
      console.error("Failed to save draft:", error);
      return null;
    } finally {
      if (!silent) setIsSaving(false);
    }
  };

  const handleRun = async () => {
    if (!code.trim()) {
      alert("Please write some code");
      return;
    }

    if (!questionId) {
      alert("Question ID is required");
      return;
    }

    // Auto-save on run and get valid submission ID
    const activeSubmissionId = await handleSaveDraft(true);

    setIsRunning(true);
    setOutput("");
    setSubmissionStatus(null);
    setActiveTab("testcases"); // Show test cases tab when running
    setHasRunCode(true); // Mark that code has been run
    setShowBottomPanel(true); // Show bottom panel after running
    setExpandedTestCase(null); // Reset expanded test case
    setIsExecutingTestCases(true); // Mark that test cases are executing

    // Reset all test case statuses to show loading
    setTestCaseResults(prev => prev.map(tc => ({ ...tc, status: null, actualOutput: null, error: null })));

    try {
      // Execute all test cases - backend will handle sequential execution
      const result = await codingService.executeTestCases({
        code,
        language,
        questionId,
        candidateId
      });

      if (result.testCaseResults && result.testCaseResults.length > 0) {
        // Update test case results sequentially - show results as they come
        let passed = 0;
        let total = result.testCaseResults.length;
        let hasError = false;
        let errorOutput = "";

        // Process results one by one without waiting
        for (let i = 0; i < result.testCaseResults.length; i++) {
          setRunningTestCaseIndex(i);

          const tcResult = result.testCaseResults[i];

          // Update immediately without delay
          setTestCaseResults(prev => prev.map((tc) => {
            if (tc.testCaseNumber === tcResult.testCaseNumber) {
              const status = tcResult.status;
              if (status === "PASSED") passed++;
              if (status === "ERROR" || (status === "FAILED" && tcResult.error)) {
                hasError = true;
                if (tcResult.error) {
                  errorOutput += `Test Case ${tcResult.testCaseNumber}: ${tcResult.error}\n`;
                }
              }
              return {
                ...tc,
                status: status,
                actualOutput: tcResult.actualOutput,
                error: tcResult.error,
                executionTime: tcResult.executionTimeMs || tcResult.executionTime
              };
            }
            return tc;
          }));

          // Small delay for visual effect
          await new Promise(resolve => setTimeout(resolve, 200));
        }

        setRunningTestCaseIndex(null);
        setIsExecutingTestCases(false);

        // Only show errors in terminal (compile/runtime errors)
        if (hasError) {
          setOutput(errorOutput || "Execution completed with errors");
          setActiveTab("output"); // Switch to terminal if there are errors
          setSubmissionStatus("error");
        } else {
          setOutput(""); // Clear output if no errors
          setSubmissionStatus(passed === total ? "success" : "error");
        }

        if (passed === total) {
          setSubmissionStatus("success");
        } else {
          setSubmissionStatus("error");
        }

        // Persist the execution results to the backend using the confirmed activeSubmissionId
        // Fallback to state submissionId if activeSubmissionId is null (shouldn't happen if save worked)
        const targetId = activeSubmissionId || submissionId;

        if (targetId) {
          try {
            await codingService.updatePracticeProgress(targetId, {
              code,
              language,
              problemId: problem.id || problem.problemId,
              questionId: questionId,
              candidateId: candidateId,
              status: passed === total ? "RUN_SUCCESS" : "RUN_FAILED",
              passedTestCases: passed,
              totalTestCases: total,
              testCaseResults: result.testCaseResults.map(tc => ({
                testCaseNumber: tc.testCaseNumber,
                input: tc.input || "",
                expectedOutput: tc.expectedOutput || "",
                actualOutput: tc.actualOutput || "",
                status: tc.status,
                error: tc.error,
                executionTimeMs: tc.executionTimeMs || tc.executionTime,
                isSample: tc.isSample
              })),
              isAiGenerated: true
            });
            setLastSaved(new Date().toLocaleTimeString());
          } catch (saveError) {
            console.error("Failed to save execution results:", saveError);
          }
        }
      } else {
        const errorMsg = result.error || "Failed to execute test cases";
        setOutput(errorMsg);
        setActiveTab("output"); // Show terminal for errors
        setSubmissionStatus("error");
        setIsExecutingTestCases(false);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.detail ||
        error.response?.data?.error ||
        error.message ||
        "Failed to run code";
      setOutput(`Compile/Runtime Error: ${errorMessage}`);
      setActiveTab("output"); // Show terminal for errors
      setSubmissionStatus("error");
      setHasRunCode(true);
      setShowBottomPanel(true);
      setRunningTestCaseIndex(null);
      setIsExecutingTestCases(false);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!code.trim()) {
      alert("Please write some code");
      return;
    }

    if (!questionId) {
      alert("Question ID is required");
      return;
    }

    if (!confirm("Are you sure you want to submit? This will save your solution.")) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Update the existing submission without executing test cases using PUT
      await codingService.updatePracticeProgress(submissionId, {
        questionId: questionId,
        problemId: problem.id || problem.problemId,
        candidateId: candidateId,
        code: code,
        language: language,
        status: "SUBMITTED", // Mark as submitted
        passedTestCases: 0,
        totalTestCases: problem.testCases?.length || 10,
        testCaseResults: testCaseResults.map(tc => ({
          testCaseNumber: tc.testCaseNumber,
          input: tc.input,
          expectedOutput: tc.expectedOutput,
          actualOutput: tc.actualOutput,
          status: tc.status,
          error: tc.error,
          isSample: tc.isSample
        })),
        isAiGenerated: true
      });

      // Navigate back to the practice form
      navigate("/practice/ai/form");
    } catch (error) {
      const errorMessage = error.response?.data?.detail ||
        error.response?.data?.error ||
        error.message ||
        "Failed to save submission";
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!problem) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-orange-500" />
          <p className="text-gray-600 dark:text-gray-400">Loading problem...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-300">
      <div className="w-full max-w-[1600px] mx-auto animate-fade-in space-y-6 pb-10">
        {/* Top Bar with Back Button */}
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={() => navigate("/practice/ai/form")}
            className="p-2 hover:bg-white rounded-xl shadow-sm border border-gray-100 transition-all text-gray-400 hover:text-[#4C4CFF]"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex-1 flex justify-between items-center">
            <div>
              <h1 className="text-xl font-black text-[#1a1a1a] tracking-tight uppercase">Challenge</h1>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{problem.title || "AI Generated Problem"}</p>
            </div>
            {lastSaved && (
              <div className="text-[9px] font-black text-gray-300 uppercase tracking-widest hidden sm:block">
                Last saved: {lastSaved}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">
          {/* Left Panel - Problem Statement */}
          <div className="w-full lg:w-1/3 bg-white dark:bg-gray-800 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto p-3 sm:p-4">
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-1 rounded font-medium ${problem.difficulty === "EASY"
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                    : problem.difficulty === "MEDIUM"
                      ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                      : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                    }`}>
                    {problem.difficulty}
                  </span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {problem.language}
                  </span>
                </div>
                <h2 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2">
                  {problem.title}
                </h2>
              </div>

              <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap mb-4">
                {problem.description}
              </div>

              {problem.functionSignature && (
                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-gray-900 dark:text-white mb-1">
                    Function Signature:
                  </h3>
                  <div className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 font-mono break-words whitespace-pre-wrap">
                    {problem.functionSignature}
                  </div>
                </div>
              )}

              {problem.constraints && (
                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-gray-900 dark:text-white mb-1">
                    Constraints:
                  </h3>
                  <div className="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                    {problem.constraints}
                  </div>
                </div>
              )}

              {problem.sampleInput && (
                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-gray-900 dark:text-white mb-1">
                    Sample Input:
                  </h3>
                  <div className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 font-mono whitespace-pre-wrap">
                    {problem.sampleInput}
                  </div>
                </div>
              )}

              {problem.sampleOutput && (
                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-gray-900 dark:text-white mb-1">
                    Sample Output:
                  </h3>
                  <div className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 font-mono whitespace-pre-wrap">
                    {problem.sampleOutput}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Code Editor & Output */}
          <div className="flex-1 flex flex-col min-h-0 w-full lg:w-auto">
            {/* Language Selector & Action Buttons */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 sm:px-4 py-2 flex items-center justify-between gap-2 sm:gap-4 flex-shrink-0">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-xs bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400"
              >
                <option value="JAVA">JAVA</option>
                <option value="PYTHON">PYTHON</option>
                <option value="CPP">CPP</option>
                <option value="C">C</option>
                <option value="JAVASCRIPT">JAVASCRIPT</option>
              </select>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowCustomInput(!showCustomInput)}
                  className="px-2 sm:px-3 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400"
                >
                  <span className="hidden sm:inline">{showCustomInput ? "Hide" : "Custom Input"}</span>
                  <span className="sm:hidden">{showCustomInput ? "Hide" : "Input"}</span>
                </button>
                <button
                  onClick={() => handleSaveDraft(false)}
                  disabled={isSaving || isRunning || isSubmitting}
                  className="px-3 sm:px-4 py-1.5 bg-gray-600 text-white rounded-lg text-xs font-medium hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 sm:gap-2"
                >
                  {isSaving ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Save className="h-3 w-3" />
                  )}
                  <span className="hidden sm:inline">Save</span>
                </button>

                <button
                  onClick={handleRun}
                  disabled={isRunning || isSubmitting}
                  className="px-3 sm:px-4 py-1.5 bg-green-500 text-white rounded-lg text-xs font-medium hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 sm:gap-2"
                >
                  {isRunning ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span className="hidden sm:inline">Running...</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3 w-3" />
                      <span>Run</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isRunning || isSubmitting}
                  className="px-3 sm:px-4 py-1.5 bg-blue-500 text-white rounded-lg text-xs font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 sm:gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span className="hidden sm:inline">Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-3 w-3" />
                      <span>Submit</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Code Editor */}
            <div className="flex-1 flex flex-col lg:flex-row min-h-0">
              <div className="flex-1 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700 min-h-0">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="flex-1 w-full p-2 sm:p-3 font-mono text-xs sm:text-sm border-0 focus:outline-none resize-none min-h-[200px] bg-black text-green-400 placeholder-green-500/50 break-words"
                  placeholder="Write your code here..."
                  spellCheck={false}
                  style={{ tabSize: 2, whiteSpace: "pre-wrap", wordWrap: "break-word", overflowWrap: "break-word" }}
                />
              </div>

              {showCustomInput && (
                <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-l border-gray-200 dark:border-gray-700 flex flex-col min-h-0">
                  <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-xs font-semibold text-gray-900 dark:text-white">Custom Input</h3>
                  </div>
                  <textarea
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    className="flex-1 w-full p-2 sm:p-3 font-mono text-xs sm:text-sm border-0 focus:outline-none resize-none bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Enter custom input here..."
                    spellCheck={false}
                  />
                </div>
              )}

            </div>

            {/* Bottom Panel - Test Cases & Terminal (Inside Right Panel) */}
            {hasRunCode && (
              <div className={`border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300 flex-shrink-0 ${showBottomPanel ? 'max-h-[50vh]' : 'max-h-0 overflow-hidden'
                }`}>
                {/* Header with Toggle */}
                <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Test Cases & Terminal</span>
                    {testCaseResults.length > 0 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ({testCaseResults.filter(tc => tc.status === "PASSED").length}/{testCaseResults.filter(tc => tc.status !== null).length} passed)
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowBottomPanel(!showBottomPanel)}
                      className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                      title={showBottomPanel ? "Minimize" : "Expand"}
                    >
                      {showBottomPanel ? (
                        <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                      ) : (
                        <ChevronUp className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setShowBottomPanel(false);
                        setHasRunCode(false);
                        setTestCaseResults(testCaseResults.map(tc => ({ ...tc, status: null, actualOutput: null, error: null })));
                        setOutput("");
                        setExpandedTestCase(null);
                      }}
                      className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                      title="Close"
                    >
                      <X className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                {showBottomPanel && (
                  <div className="flex flex-col" style={{ maxHeight: 'calc(50vh - 50px)' }}>
                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                      <button
                        onClick={() => setActiveTab("testcases")}
                        className={`px-4 py-2 text-xs font-medium transition-colors ${activeTab === "testcases"
                          ? "border-b-2 border-orange-500 text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                          }`}
                      >
                        Test Cases ({testCaseResults.length})
                      </button>
                      <button
                        onClick={() => setActiveTab("output")}
                        className={`px-4 py-2 text-xs font-medium transition-colors ${activeTab === "output"
                          ? "border-b-2 border-orange-500 text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                          }`}
                      >
                        Terminal
                      </button>
                    </div>

                    {/* Tab Content */}
                    <div className="flex-1 overflow-y-auto">
                      {/* Test Cases Tab */}
                      {activeTab === "testcases" && (
                        <div className="p-4">
                          {expandedTestCase === null ? (
                            /* Grid View - Initially show test cases in grid (including locked ones) */
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                              {testCaseResults.map((testCase, index) => {
                                const isLocked = testCase.isSample === false;
                                return (
                                  <button
                                    key={testCase.testCaseNumber}
                                    onClick={() => {
                                      // Only show details for unlocked (sample) test cases
                                      if (!isLocked) {
                                        setExpandedTestCase(index);
                                      }
                                    }}
                                    disabled={isLocked}
                                    className={`p-3 rounded-lg border transition-all ${isLocked
                                      ? "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 cursor-not-allowed opacity-60"
                                      : testCase.status === "PASSED"
                                        ? "border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30"
                                        : testCase.status === "FAILED" || testCase.status === "ERROR"
                                          ? "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30"
                                          : runningTestCaseIndex === index
                                            ? "border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20"
                                            : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                                      }`}
                                  >
                                    <div className="flex items-center justify-between gap-2">
                                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                        Test case {testCase.testCaseNumber - 1}
                                      </span>
                                      <div className="flex items-center gap-1">
                                        {/* Show loading for all test cases while executing, or for current one */}
                                        {(isExecutingTestCases && testCase.status === null) || runningTestCaseIndex === index ? (
                                          <Loader2 className="h-4 w-4 animate-spin text-blue-600 dark:text-blue-400" />
                                        ) : testCase.status === "PASSED" ? (
                                          <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                                        ) : testCase.status === "FAILED" || testCase.status === "ERROR" ? (
                                          <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                                        ) : (
                                          <div className="h-4 w-4 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                                        )}
                                        {isLocked && (
                                          <Lock className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                                        )}
                                      </div>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          ) : (
                            /* Sidebar + Details View - Show when test case is clicked */
                            <div className="flex flex-col lg:flex-row">
                              {/* Mobile Dropdown - Only show on mobile */}
                              <div className="lg:hidden mb-2">
                                <button
                                  onClick={() => setShowMobileDropdown(!showMobileDropdown)}
                                  className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-xs font-medium text-gray-700 dark:text-gray-300"
                                >
                                  <span>
                                    {expandedTestCase !== null
                                      ? `Test case ${testCaseResults[expandedTestCase]?.testCaseNumber - 1}`
                                      : "Select Test Case"}
                                  </span>
                                  {showMobileDropdown ? (
                                    <ChevronUp className="h-4 w-4" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4" />
                                  )}
                                </button>
                                {showMobileDropdown && (
                                  <div className="mt-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded shadow-lg max-h-60 overflow-y-auto">
                                    {testCaseResults.map((testCase, index) => {
                                      const isLocked = testCase.isSample === false;
                                      return (
                                        <button
                                          key={testCase.testCaseNumber}
                                          onClick={() => {
                                            if (!isLocked) {
                                              setExpandedTestCase(index);
                                              setShowMobileDropdown(false);
                                            }
                                          }}
                                          disabled={isLocked}
                                          className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors ${isLocked
                                            ? "opacity-60 cursor-not-allowed bg-gray-100 dark:bg-gray-800"
                                            : expandedTestCase === index
                                              ? "bg-orange-100 dark:bg-orange-900/30"
                                              : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                            } ${testCase.status === "PASSED"
                                              ? "text-green-700 dark:text-green-400"
                                              : testCase.status === "FAILED" || testCase.status === "ERROR"
                                                ? "text-red-700 dark:text-red-400"
                                                : runningTestCaseIndex === index
                                                  ? "text-blue-700 dark:text-blue-400"
                                                  : "text-gray-700 dark:text-gray-300"
                                            }`}
                                        >
                                          <div className="flex items-center justify-between gap-2">
                                            <span>Test case {testCase.testCaseNumber - 1}</span>
                                            <div className="flex items-center gap-1">
                                              {(isExecutingTestCases && testCase.status === null) || runningTestCaseIndex === index ? (
                                                <Loader2 className="h-3 w-3 animate-spin text-blue-600 dark:text-blue-400" />
                                              ) : testCase.status === "PASSED" ? (
                                                <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                                              ) : testCase.status === "FAILED" || testCase.status === "ERROR" ? (
                                                <X className="h-3 w-3 text-red-600 dark:text-red-400" />
                                              ) : null}
                                              {isLocked && (
                                                <Lock className="h-3 w-3 text-gray-400 dark:text-gray-500" />
                                              )}
                                            </div>
                                          </div>
                                        </button>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>

                              {/* Left Sidebar - Test Case List (Show all test cases including locked ones) - Desktop only */}
                              <div className="hidden lg:block w-64 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 overflow-y-auto" style={{ maxHeight: 'calc(50vh - 100px)' }}>
                                <div className="p-2 space-y-1">
                                  {testCaseResults.map((testCase, index) => {
                                    const isLocked = testCase.isSample === false;
                                    return (
                                      <button
                                        key={testCase.testCaseNumber}
                                        onClick={() => {
                                          // Only allow clicking unlocked test cases
                                          if (!isLocked) {
                                            setExpandedTestCase(expandedTestCase === index ? null : index);
                                          }
                                        }}
                                        disabled={isLocked}
                                        className={`w-full text-left px-3 py-2 rounded text-xs font-medium transition-colors ${isLocked
                                          ? "opacity-60 cursor-not-allowed bg-gray-100 dark:bg-gray-800"
                                          : expandedTestCase === index
                                            ? "bg-orange-100 dark:bg-orange-900/30 border border-orange-300 dark:border-orange-700"
                                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                          } ${testCase.status === "PASSED"
                                            ? "text-green-700 dark:text-green-400"
                                            : testCase.status === "FAILED" || testCase.status === "ERROR"
                                              ? "text-red-700 dark:text-red-400"
                                              : runningTestCaseIndex === index
                                                ? "text-blue-700 dark:text-blue-400"
                                                : "text-gray-700 dark:text-gray-300"
                                          }`}
                                      >
                                        <div className="flex items-center justify-between gap-2">
                                          <span>Test case {testCase.testCaseNumber - 1}</span>
                                          <div className="flex items-center gap-1">
                                            {/* Show loading for all test cases while executing, or for current one */}
                                            {(isExecutingTestCases && testCase.status === null) || runningTestCaseIndex === index ? (
                                              <Loader2 className="h-3 w-3 animate-spin text-blue-600 dark:text-blue-400" />
                                            ) : testCase.status === "PASSED" ? (
                                              <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                                            ) : testCase.status === "FAILED" || testCase.status === "ERROR" ? (
                                              <X className="h-3 w-3 text-red-600 dark:text-red-400" />
                                            ) : null}
                                            {isLocked && (
                                              <Lock className="h-3 w-3 text-gray-400 dark:text-gray-500" />
                                            )}
                                          </div>
                                        </div>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Right Side - Test Case Details */}
                              {expandedTestCase !== null && testCaseResults[expandedTestCase] && (
                                <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: 'calc(50vh - 100px)' }}>
                                  <div className="space-y-4">
                                    {/* Compiler Message */}
                                    <div>
                                      <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Compiler Message</h3>
                                      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs text-gray-900 dark:text-gray-100">
                                        {testCaseResults[expandedTestCase].status === "PASSED" ? "Success" :
                                          testCaseResults[expandedTestCase].status === "FAILED" ? "Wrong Answer" :
                                            testCaseResults[expandedTestCase].status === "ERROR" ? "Error" :
                                              (isExecutingTestCases || runningTestCaseIndex === expandedTestCase) ? "Running..." : "Pending"}
                                      </div>
                                    </div>

                                    {/* Input */}
                                    <div>
                                      <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-300">Input (stdin)</h3>
                                        <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">Download</button>
                                      </div>
                                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                                        <pre className="text-xs font-mono text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-words">
                                          {testCaseResults[expandedTestCase].input || "No input"}
                                        </pre>
                                      </div>
                                    </div>

                                    {/* Expected Output */}
                                    <div>
                                      <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-300">Expected Output</h3>
                                        <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">Download</button>
                                      </div>
                                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                                        <pre className="text-xs font-mono text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-words">
                                          {testCaseResults[expandedTestCase].expectedOutput || "No expected output"}
                                        </pre>
                                      </div>
                                    </div>

                                    {/* Your Output (if available) */}
                                    {testCaseResults[expandedTestCase].status && testCaseResults[expandedTestCase].actualOutput !== null && (
                                      <div>
                                        <div className="flex items-center justify-between mb-2">
                                          <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-300">Your Output</h3>
                                          <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">Download</button>
                                        </div>
                                        <div className={`p-3 rounded border ${testCaseResults[expandedTestCase].status === "PASSED"
                                          ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                                          : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                                          }`}>
                                          <pre className={`text-xs font-mono whitespace-pre-wrap break-words ${testCaseResults[expandedTestCase].status === "PASSED"
                                            ? "text-green-900 dark:text-green-100"
                                            : "text-red-900 dark:text-red-100"
                                            }`}>
                                            {testCaseResults[expandedTestCase].actualOutput || "(empty)"}
                                          </pre>
                                        </div>
                                      </div>
                                    )}

                                    {/* Error (if any) */}
                                    {testCaseResults[expandedTestCase].error && (
                                      <div>
                                        <h3 className="text-xs font-semibold text-red-700 dark:text-red-400 mb-2">Error</h3>
                                        <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                                          <pre className="text-xs font-mono text-red-900 dark:text-red-100 whitespace-pre-wrap break-words">
                                            {testCaseResults[expandedTestCase].error}
                                          </pre>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Terminal Tab - Only shows compile/runtime errors */}
                      {activeTab === "output" && (
                        <div className="p-4">
                          {output ? (
                            <div className={`p-3 rounded-lg ${submissionStatus === "error"
                              ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                              : "bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
                              }`}>
                              <pre className="text-xs sm:text-sm font-mono whitespace-pre-wrap break-words text-red-900 dark:text-red-100">
                                {output}
                              </pre>
                            </div>
                          ) : (
                            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                              <pre className="text-xs sm:text-sm font-mono whitespace-pre-wrap break-words text-gray-500 dark:text-gray-400">
                                {isRunning || isSubmitting ? "Running test cases..." : "No errors. All test cases executed successfully."}
                              </pre>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiCodingProblem;

