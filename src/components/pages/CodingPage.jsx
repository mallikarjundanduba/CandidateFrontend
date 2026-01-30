import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Play, Send, ChevronLeft, Loader2, Check, ChevronDown, ChevronUp, X, Eye, EyeOff, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { oneDark } from "@codemirror/theme-one-dark";
import { codingService } from "../../services/codingService";
import { useTheme } from "../../contexts/ThemeContext";
import { codingTopics, topicQuestions } from "../../data/codingPracticeData";
import { fetchCodingProgress, fetchLanguages, updateProgressLocally } from "../../store/slices/codingSlice";
import { fetchProfile } from "../../store/slices/profileSlice";

const CodingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  
  // Get data from Redux store (cached)
  const profile = useSelector((state) => state.profile?.data || state.profileData?.profile);
  const codingState = useSelector((state) => state.coding || {});
  const languages = codingState.languages || [];
  const progress = codingState.progress || { stars: {}, status: {}, totalStars: 0 };
  const loadingProgress = codingState.loading || false;
  const loadingLanguages = codingState.loadingLanguages || false;
  
  // Get candidate ID from profile
  const candidateId = profile?.id || profile?.candidateId ? (profile.id || profile.candidateId).toString() : null;
  
  const [view, setView] = useState("topics"); // "topics", "questions", "question"
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("JAVA");
  const [customInput, setCustomInput] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [showOutput, setShowOutput] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState(new Set());
  const [hasRunCode, setHasRunCode] = useState(false); // Track if code has been run
  const [showBottomPanel, setShowBottomPanel] = useState(false); // Control bottom panel visibility
  const [testCaseResults, setTestCaseResults] = useState([]); // Store test case results

  const [showSolution, setShowSolution] = useState(false);
  const [isGeneratingSolution, setIsGeneratingSolution] = useState(false);
  const [userCode, setUserCode] = useState(""); // Backup user code when showing solution
  const [isSaving, setIsSaving] = useState(false);

  const [currentSubmissionId, setCurrentSubmissionId] = useState(null);

  // Fetch profile and languages on mount (Redux handles caching)
  useEffect(() => {
    if (!profile) {
      dispatch(fetchProfile());
    }
    dispatch(fetchLanguages(false));
  }, [dispatch, profile]);

  // Fetch progress when candidate ID is available
  useEffect(() => {
    if (candidateId) {
      dispatch(fetchCodingProgress(candidateId));
    }
  }, [dispatch, candidateId]);

  useEffect(() => {
    if (selectedQuestion && languages.length > 0) {
      // Check for saved code first
      checkLastSavedCode(selectedQuestion.id);
    }
  }, [selectedQuestion, language, languages]);

  // Profile and languages are now loaded via Redux in useEffect hooks above
  // No need for separate load functions

  const setDefaultCode = () => {
    if (!selectedQuestion) return;

    // Helper function to extract function name from signature
    const getFunctionName = (sig) => {
      if (!sig) return "";
      const match = sig.match(/(\w+)\s*\(/);
      return match ? match[1] : "solution";
    };

    // Helper function to extract arguments from example input
    const extractArgsForTemplate = (input, funcName) => {
      const match = input.match(new RegExp(`${funcName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\(([^)]*)\\)`));
      if (!match) return "";
      let args = match[1];
      if (language === "JAVA") {
        args = args.replace(/\[/g, "new int[]{").replace(/\]/g, "}");
      }
      return args;
    };

    // Convert Java signature to other languages
    const convertSignature = (sig, lang) => {
      if (!sig) return "";

      if (lang === "PYTHON") {
        // Extract function name and parameters
        const match = sig.match(/(\w+)\s*\(([^)]*)\)/);
        if (match) {
          const funcName = match[1];
          const params = match[2];
          return `def ${funcName}(${params}):`;
        }
        return sig.replace("public ", "").replace("boolean ", "def ").replace("int ", "def ").replace("String ", "def ");
      } else if (lang === "CPP") {
        return sig
          .replace("public ", "")
          .replace("boolean", "bool");
      } else if (lang === "C") {
        return sig
          .replace("public ", "")
          .replace("boolean", "int");
      } else if (lang === "JAVASCRIPT") {
        // Extract function name and parameters
        const match = sig.match(/(\w+)\s*\(([^)]*)\)/);
        if (match) {
          const funcName = match[1];
          const params = match[2];
          // Convert Java types to JavaScript
          const jsParams = params
            .split(",")
            .map(p => p.trim().split(/\s+/).pop())
            .join(", ");
          return `function ${funcName}(${jsParams}) {`;
        }
        return sig.replace("public ", "").replace("boolean ", "function ").replace("int ", "function ").replace("String ", "function ");
      }
      return sig;
    };

    const templates = {
      JAVA: selectedQuestion.functionSignature
        ? `${selectedQuestion.functionSignature} {
    // Write your code here
    
}`
        : `public void solution() {
    // Write your code here
    
}`,
      PYTHON: convertSignature(selectedQuestion.functionSignature, "PYTHON")
        ? `${convertSignature(selectedQuestion.functionSignature, "PYTHON")}
    # Write your code here
    pass`
        : `def solution():
    # Write your code here
    pass`,
      CPP: convertSignature(selectedQuestion.functionSignature, "CPP")
        ? `${convertSignature(selectedQuestion.functionSignature, "CPP")} {
    // Write your code here
    
}`
        : `#include <iostream>
using namespace std;

int main() {
    // Write your code here
    return 0;
}`,
      JAVASCRIPT: convertSignature(selectedQuestion.functionSignature, "JAVASCRIPT")
        ? `${convertSignature(selectedQuestion.functionSignature, "JAVASCRIPT")}
    // Write your code here
    
}`
        : `function solution() {
    // Write your code here
    
}`,
      C: convertSignature(selectedQuestion.functionSignature, "C")
        ? `${convertSignature(selectedQuestion.functionSignature, "C")} {
    // Write your code here
    
}`
        : `#include <stdio.h>

int main() {
    // Write your code here
    return 0;
}`
    };

    if (!code || code.trim().length === 0) {
      setCode(templates[language] || "");
    }
  };

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    setView("questions");
  };

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
    setView("question");
    // Code will be loaded via useEffect
    setOutput("");
    setShowOutput(false);
    setSubmissionStatus(null);
    setHasRunCode(false);
    setShowBottomPanel(false);
    setTestCaseResults([]);
    setShowSolution(false);
    setUserCode("");
    setCurrentSubmissionId(null); // Reset submission ID
  };

  const checkLastSavedCode = async (qid) => {
    if (!qid) return;

    try {
      const saved = await codingService.getLastCode(qid, null);
      if (saved && saved.found) {
        setCode(saved.code || "");
        if (saved.language) setLanguage(saved.language);
        if (saved.submissionId) setCurrentSubmissionId(saved.submissionId); // Capture ID if exists

        // If there was a previous run result, show it
        if (saved.status && saved.status !== "DRAFT") {
          setHasRunCode(true);
          setShowBottomPanel(true);
          setShowOutput(true);

          if (saved.status === "RUN_SUCCESS" || saved.status === "ACCEPTED" || saved.status === "WRONG_ANSWER") {
            const outputText = saved.output || "No output";
            setOutput(outputText);

            // Try to reconstruct test case results if possible
            if (saved.passedTestCases !== undefined && saved.totalTestCases !== undefined) {
              // Logic to show passed/total status
              setSubmissionStatus({
                status: saved.status,
                passedTestCases: saved.passedTestCases,
                totalTestCases: saved.totalTestCases
              });
            }
          } else if (saved.status === "COMPILATION_ERROR" || saved.status === "RUNTIME_ERROR" || saved.status === "ERROR") {
            setOutput(`Error: ${saved.error || saved.output || "Execution failed"}`);
          }
        }
      } else {
        // No saved code, set default code
        setDefaultCode();
      }
    } catch (error) {
      console.error("Error checking last saved code:", error);
      setCode("");
    }
  };

  const handleSaveDraft = async (silent = false) => {
    if (!selectedQuestion || !code.trim()) return null;

    if (!silent) setIsSaving(true);
    try {
      let submissionId = currentSubmissionId;

      if (submissionId) {
        // UPDATE existing (PUT)
        await codingService.updatePracticeProgress(submissionId, {
          code,
          language,
          status: "DRAFT",
          isAiGenerated: false,
          status: "DRAFT",
          isAiGenerated: false,
          candidateId: candidateId,
          problemId: selectedQuestion.id,
          questionId: null
        });
      } else {
        // CREATE new (POST)
        const result = await codingService.savePracticeProgress({
          candidateId: candidateId,
          problemId: selectedQuestion.id,
          questionId: null,
          code: code,
          language: language,
          status: "DRAFT",
          isAiGenerated: false
        });
        submissionId = result.submissionId;
        setCurrentSubmissionId(submissionId);
      }

      if (!silent) setIsSaving(false);
      return submissionId;

    } catch (error) {
      console.error("Failed to save draft:", error);
      if (!silent) setIsSaving(false);
      return null;
    }
  };

  const handleBack = () => {
    if (view === "question") {
      setView("questions");
      setSelectedQuestion(null);
    } else if (view === "questions") {
      setView("topics");
      setSelectedTopic(null);
    } else {
      navigate("/practice");
    }
  };

  const handleRun = async () => {
    if (!selectedQuestion || !code.trim()) {
      alert("Please write some code");
      return;
    }

    setIsRunning(true);
    setOutput("");
    setSubmissionStatus(null);
    setShowOutput(false);
    setTestCaseResults([]);

    try {
      // 1. Save Draft First (Create/Get Submission ID)
      const submissionId = await handleSaveDraft(true);

      // For CodingBat-style questions, we need to create a test harness
      const testCode = createTestHarness(code, selectedQuestion);

      const result = await codingService.runCode({
        code: testCode,
        language,
        customInput: customInput || "",
        customInput: customInput || "",
        problemId: selectedQuestion.id, // Offline questions use problemId
        candidateId: candidateId,
        questionId: null,
        isAiGenerated: false
      });

      // Mark that code has been run
      setHasRunCode(true);
      setShowBottomPanel(true); // Show bottom panel after running

      let passed = 0;
      let total = selectedQuestion.examples.length;
      let status = "RUN_FAILED";
      let outputText = "";
      let errorText = null;
      let calculatedTestCaseResults = [];

      if (result.status === "SUCCESS") {
        outputText = result.output || "No output";
        const execTime = result.executionTime ? `\n\nExecution Time: ${result.executionTime}ms` : "";
        setOutput(outputText + execTime);
        status = "RUN_SUCCESS";

        // Parse test case results from output
        const outputs = outputText.split('\n').filter(line => line.trim());

        calculatedTestCaseResults = selectedQuestion.examples.map((example, index) => {
          // Basic parsing logic as before
          const actualOutput = outputs[index]?.trim() || "";
          const isPass = actualOutput === example.output.trim();
          if (isPass) passed++;

          return {
            testCaseNumber: index + 1,
            input: example.input,
            expectedOutput: example.output,
            actualOutput: actualOutput,
            status: isPass ? "PASSED" : "FAILED",
            isSample: true,
            executionTime: result.executionTime || null
          };
        });

        setTestCaseResults(calculatedTestCaseResults);

        // Update local status for UI
        if (passed === total) {
          // We might want to mark as ACCEPTED only on explicit Submit, 
          // but user asked for "when i run then u need to call the put method".
          // Usually Run = Test, Submit = Final. 
          // But if all pass, we can say it's good.
          // However, to be safe, let's keep status as RUN_SUCCESS unless strictly submitted? 
          // The prompt said "update with execution details... status". 
          // If 100% pass, we can probably set it.
          // But let's stick to RUN_SUCCESS/FAILED for Run, and ACCEPTED for Submit.
          // Wait, usually users want to see green if they pass.
          // Current logic used "ACCEPTED" if passed==total.
          status = (passed === total) ? "ACCEPTED" : "WRONG_ANSWER";
        } else {
          status = "WRONG_ANSWER";
        }

      } else {
        errorText = result.error || "Unknown error";
        setOutput(`Error: ${errorText}`);
        status = "RUNTIME_ERROR"; // or COMPILATION_ERROR based on backend

        calculatedTestCaseResults = selectedQuestion.examples.map((example, index) => ({
          testCaseNumber: index + 1,
          input: example.input,
          expectedOutput: example.output,
          actualOutput: "",
          status: "ERROR",
          isSample: true,
          error: errorText
        }));
        setTestCaseResults(calculatedTestCaseResults);
      }
      setShowOutput(true);

      // 2. Persist Results (PUT) using submissionId
      if (submissionId) {
        try {
          await codingService.updatePracticeProgress(submissionId, {
            code: code,
            language: language,
            status: status,
            passedTestCases: passed,
            totalTestCases: total,
            output: outputText,
            error: errorText,
            testCaseResults: calculatedTestCaseResults,
            isAiGenerated: false,
            candidateId: candidateId,
            problemId: selectedQuestion.id,
            questionId: null
          });

          // Also update progress context if needed
          if (status === "ACCEPTED") {
            if (candidateId) {
              dispatch(fetchCodingProgress(candidateId));
            }
          }
        } catch (updateErr) {
          console.error("Failed to update execution results:", updateErr);
        }
      }

    } catch (error) {
      const errorMessage = error.response?.data?.detail ||
        error.response?.data?.error ||
        error.message ||
        "Failed to run code";
      setOutput(`Error: ${errorMessage}`);
      setHasRunCode(true);
      setShowBottomPanel(true);
      setShowOutput(true);
    } finally {
      setIsRunning(false);
    }
  };

  const createTestHarness = (userCode, question) => {
    // Extract function name from function signature
    const funcMatch = question.functionSignature?.match(/(\w+)\s*\(/);
    const funcName = funcMatch ? funcMatch[1] : "solution";

    if (language === "JAVA") {
      // Check if user code already has a class wrapper
      if (userCode.includes("public class") || userCode.includes("class Main")) {
        // User already has class, but might still need main for execution
        if (userCode.includes("public static void main")) {
          return userCode;
        }
        // Add main to their class (simple heuristic, adds at the end)
        return userCode.replace(/}\s*$/, `
    public static void main(String[] args) {
        Main obj = new Main();
${question.examples.map(ex => {
          const args = extractArgs(ex.input, funcName);
          return `        System.out.println(obj.${funcName}(${args}));`;
        }).join('\n')}
    }
}`);
      } else {
        // Pure function provided, wrap in class with main
        return `public class Main {
    ${userCode}
    
    public static void main(String[] args) {
        Main obj = new Main();   // create object
        // Test cases
${question.examples.map(ex => {
          const args = extractArgs(ex.input, funcName);
          return `        System.out.println(obj.${funcName}(${args}));`;
        }).join('\n')}
    }
}`;
      }
    } else if (language === "PYTHON") {
      if (userCode.includes("if __name__ == \"__main__\":") || userCode.includes("if __name__ == '__main__':")) {
        return userCode;
      }
      return `${userCode}

# Test cases
if __name__ == "__main__":
${question.examples.map(ex => {
        const args = extractArgs(ex.input, funcName);
        return `    print(${funcName}(${args}))`;
      }).join('\n')}`;
    } else if (language === "CPP") {
      if (userCode.includes("int main()")) {
        return userCode;
      }
      return `${userCode}

int main() {
    // Test cases
${question.examples.map(ex => {
        const args = extractArgs(ex.input, funcName);
        return `    std::cout << ${funcName}(${args}) << std::endl;`;
      }).join('\n')}
    return 0;
}`;
    } else if (language === "C") {
      if (userCode.includes("int main()")) {
        return userCode;
      }
      return `${userCode}

int main() {
    // Test cases
${question.examples.map(ex => {
        const args = extractArgs(ex.input, funcName);
        return `    printf("%d\\n", ${funcName}(${args}));`;
      }).join('\n')}
    return 0;
}`;
    } else if (language === "JAVASCRIPT") {
      // JS usually doesn't have a standard 'main' but we can check if they already have console.logs of the function
      if (userCode.includes(`console.log(${funcName}`)) {
        return userCode;
      }
      return `${userCode}

// Test cases
${question.examples.map(ex => {
        const args = extractArgs(ex.input, funcName);
        return `console.log(${funcName}(${args}));`;
      }).join('\n')}`;
    }

    return userCode;
  };

  const extractArgs = (input, funcName) => {
    // Extract arguments from function call like "sleepIn(false, false)"
    const match = input.match(new RegExp(`${funcName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\(([^)]*)\\)`));
    if (match) {
      let args = match[1];
      if (language === "JAVA") {
        args = args.replace(/\[/g, "new int[]{").replace(/\]/g, "}");
      }
      return args;
    }
    return "";
  };

  const handleSubmit = async () => {
    if (!selectedQuestion || !code.trim()) {
      alert("Please write some code");
      return;
    }

    if (!confirm("Are you sure you want to submit? This will evaluate your code against all test cases.")) {
      return;
    }

    setIsSubmitting(true);
    setOutput("");
    setSubmissionStatus(null);
    setShowOutput(false);

    try {
      // For now, we'll just run the code and check outputs
      const testCode = createTestHarness(code, selectedQuestion);

      const result = await codingService.runCode({
        code: testCode,
        language,
        customInput: "",
        problemId: selectedQuestion.id,
        candidateId: candidateId,
        questionId: null,
        isAiGenerated: false
      });

      // Mark that code has been run
      setHasRunCode(true);
      setShowBottomPanel(true); // Show bottom panel after submitting

      if (result.status === "SUCCESS") {
        // Check if all test cases pass
        const outputs = result.output.split('\n').filter(line => line.trim());
        let passed = 0;
        let total = selectedQuestion.examples.length;

        // Create test case results
        const testCases = selectedQuestion.examples.map((example, index) => {
          const actualOutput = outputs[index]?.trim() || "";
          const passedCase = actualOutput === example.output.trim();
          if (passedCase) passed++;
          return {
            testCaseNumber: index + 1,
            input: example.input,
            expectedOutput: example.output,
            actualOutput: actualOutput,
            status: passedCase ? "PASSED" : "FAILED",
            isSample: true,
            executionTime: result.executionTime || null
          };
        });
        setTestCaseResults(testCases);

        if (passed === total) {
          setSubmissionStatus({ status: "ACCEPTED", passedTestCases: passed, totalTestCases: total });
          setCompletedQuestions(prev => new Set([...prev, selectedQuestion.id]));
          setOutput(`✅ All test cases passed!\n\nPassed: ${passed}/${total}`);
        } else {
          setSubmissionStatus({ status: "WRONG_ANSWER", passedTestCases: passed, totalTestCases: total });
          setOutput(`❌ Wrong Answer\n\nPassed: ${passed}/${total}\n\nExpected outputs:\n${selectedQuestion.examples.map(ex => ex.output).join('\n')}\n\nYour outputs:\n${outputs.slice(0, total).join('\n')}`);
        }

        // Save submission and update progress
        if (candidateId && selectedQuestion) {
          try {
            const submissionData = {
              candidateId: candidateId,
              problemId: selectedQuestion.id,
              questionId: null,
              code: code,
              language: language,
              passedTestCases: passed,
              totalTestCases: total,
              status: passed === total ? "ACCEPTED" : "WRONG_ANSWER",
              isAiGenerated: false
            };

            if (currentSubmissionId) {
              await codingService.updatePracticeProgress(currentSubmissionId, submissionData);
            } else {
              const saved = await codingService.savePracticeProgress(submissionData);
              if (saved && saved.submissionId) {
                setCurrentSubmissionId(saved.submissionId);
              }
            }
            // Reload progress to get updated stars
            if (candidateId) {
              dispatch(fetchCodingProgress(candidateId));
            }
          } catch (saveError) {
            console.error("Error saving submission:", saveError);
          }
        }
      } else {
        setSubmissionStatus({ status: "RUNTIME_ERROR", passedTestCases: 0, totalTestCases: selectedQuestion.examples.length });
        setOutput(`Error: ${result.error || "Runtime error"}`);
        // Set test cases with error status
        const testCases = selectedQuestion.examples.map((example, index) => ({
          testCaseNumber: index + 1,
          input: example.input,
          expectedOutput: example.output,
          actualOutput: "",
          status: "ERROR",
          isSample: true,
          error: result.error || "Runtime error"
        }));
        setTestCaseResults(testCases);
      }
      setShowOutput(true);
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || "Failed to submit code";
      setOutput(`Error: ${errorMessage}`);
      setShowOutput(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShowSolution = async () => {
    if (showSolution) {
      // Hide solution - restore user code
      setCode(userCode);
      setShowSolution(false);
    } else {
      // Show solution
      if (!confirm("Are you sure you want to see the solution? Try to solve it yourself first!")) {
        return;
      }

      setUserCode(code); // Backup current code
      setIsGeneratingSolution(true);

      try {
        const result = await codingService.generateSolution({
          description: selectedQuestion.description,
          functionSignature: selectedQuestion.functionSignature,
          language: language
        });

        if (typeof result.solution === 'string') {
          setCode(result.solution);
        } else {
          // Fallback if structure is different
          setCode("// No solution generated");
        }
        setShowSolution(true);
      } catch (error) {
        console.error("Failed to generate solution:", error);
        alert("Failed to generate solution. Please try again.");
      } finally {
        setIsGeneratingSolution(false);
      }
    }
  };

  // Topics View
  const renderTopicsView = () => {
    return (
      <div className="p-3 sm:p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {codingTopics.map((topic) => {
            // Calculate dynamic stars for topic
            const questions = topicQuestions[topic.id] || [];
            let totalStarsEarned = 0;
            const totalMaxStars = questions.length * 5; // 5 stars per question

            questions.forEach(q => {
              if (progress.stars && progress.stars[q.id]) {
                totalStarsEarned += progress.stars[q.id];
              }
            });

            // Map to 10 stars scale
            // If totalMaxStars is 0 (no questions), stars is 0
            const topicStars = totalMaxStars > 0 ? (totalStarsEarned / totalMaxStars) * 10 : 0;
            const roundedStars = Math.round(topicStars);

            return (
              <div
                key={topic.id}
                onClick={() => handleTopicClick(topic)}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4 cursor-pointer hover:shadow-md transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {topic.name}
                  </h3>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-xs ${i < roundedStars
                          ? "text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                          }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {topic.description}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Check className="h-3 w-3 text-gray-400 dark:text-gray-500" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {topic.difficulty}
                    </span>
                  </div>
                  {questions.length > 0 && (
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      ({questions.filter(q => progress.stars && progress.stars[q.id] === 5).length}/{questions.length} solved)
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Questions List View
  const renderQuestionsView = () => {
    const questions = topicQuestions[selectedTopic?.id] || [];

    return (
      <div className="p-3 sm:p-4">
        <div className="mb-4">
          <h1 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-1">
            {selectedTopic?.name}
          </h1>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {selectedTopic?.description}
          </p>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          {questions.map((question) => {
            const starsCaught = progress.stars ? (progress.stars[question.id] || 0) : 0;
            const isCompleted = starsCaught === 5;

            return (
              <div
                key={question.id}
                onClick={() => handleQuestionClick(question)}
                className={`bg-white dark:bg-gray-800 border rounded-lg p-2 sm:p-3 cursor-pointer hover:shadow-md transition-all duration-200 ${completedQuestions.has(question.id) || isCompleted
                  ? "border-green-300 dark:border-green-600 bg-green-50 dark:bg-green-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
                  }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                    {question.name}
                  </span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${question.difficulty === "E"
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                    : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    }`}>
                    {question.difficulty}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  {(completedQuestions.has(question.id) || isCompleted) ? (
                    <div className="flex items-center gap-1">
                      <Check className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-600 dark:text-green-400">Completed</span>
                    </div>
                  ) : <div></div>}

                  {/* Individual Question Stars */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-[10px] ${i < Math.round(starsCaught)
                          ? "text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                          }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Question Detail View
  const renderQuestionView = () => {
    if (!selectedQuestion) return null;

    return (
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Panel - Question Statement */}
        <div className="w-full lg:w-1/3 bg-white dark:bg-gray-800 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto p-3 sm:p-4">
            <h2 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2">
              {selectedQuestion.name}
            </h2>
            <div className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap mb-4">
              {selectedQuestion.description}
            </div>

            {selectedQuestion.functionSignature && (
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-gray-900 dark:text-white mb-1">
                  Function Signature:
                </h3>
                <div className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 font-mono break-words whitespace-pre-wrap">
                  {selectedQuestion.functionSignature}
                </div>
              </div>
            )}

            {selectedQuestion.examples && selectedQuestion.examples.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-gray-900 dark:text-white mb-2">
                  Examples:
                </h3>
                {selectedQuestion.examples.map((example, index) => (
                  <div key={index} className="mb-2">
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1 break-words">
                      Input: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded break-words whitespace-pre-wrap">{example.input}</code>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 break-words">
                      Output: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded break-words whitespace-pre-wrap">{example.output}</code>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Code Editor & Output */}
        <div className="flex-1 flex flex-col min-h-0 w-full lg:w-auto">
          {/* Toolbar */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-2 sm:px-4 py-2 flex items-center gap-2 sm:gap-3 flex-wrap flex-shrink-0">
            <select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                setOutput("");
                setShowOutput(false);
                setDefaultCode();
              }}
              className="px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-w-[100px] sm:min-w-0"
              disabled={languages.length === 0}
            >
              {languages.length === 0 ? (
                <option>Loading languages...</option>
              ) : (
                languages.map((lang) => (
                  <option key={lang.language} value={lang.language}>
                    {lang.language}
                  </option>
                ))
              )}
            </select>
            <div className="flex-1"></div>
            <button
              onClick={() => setShowCustomInput(!showCustomInput)}
              className="px-2 sm:px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-xs font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-1.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              {showCustomInput ? "Hide Input" : "Show Input"}
            </button>
            <button
              onClick={handleShowSolution}
              disabled={isGeneratingSolution || isRunning || isSubmitting}
              className={`px-2 sm:px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${showSolution
                ? "bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-600"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                }`}
            >
              {isGeneratingSolution ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : showSolution ? (
                <EyeOff className="h-3.5 w-3.5" />
              ) : (
                <Eye className="h-3.5 w-3.5" />
              )}
              {showSolution ? "Hide Answer" : "Show Answer"}
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
              <span>Save</span>
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

          {/* Code Editor */}
          <div className="flex-1 flex flex-col lg:flex-row min-h-0">
            <div className="flex-1 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700 min-h-0">
              <CodeMirror
                value={code}
                height="100%"
                onChange={(value) => setCode(value)}
                theme={isDark ? oneDark : undefined}
                extensions={[
                  language === "JAVA" ? java() :
                    language === "PYTHON" ? python() :
                      language === "JAVASCRIPT" ? javascript() :
                        language === "CPP" ? cpp() :
                          language === "C" ? cpp() :
                            []
                ]}
                basicSetup={{
                  lineNumbers: true,
                  foldGutter: true,
                  dropCursor: false,
                  allowMultipleSelections: false,
                  indentOnInput: true,
                  bracketMatching: true,
                  closeBrackets: true,
                  autocompletion: true,
                  highlightSelectionMatches: false,
                }}
                placeholder="Write your code here..."
                style={{ fontSize: '14px', fontFamily: 'monospace' }}
              />
            </div>

            {showCustomInput && (
              <div className="lg:w-64 xl:w-80 flex flex-col border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700 flex-shrink-0">
                <div className="bg-gray-50 dark:bg-gray-800 px-2 sm:px-3 py-1.5 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Custom Input</span>
                </div>
                <textarea
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="flex-1 w-full p-2 sm:p-3 font-mono text-xs border-0 focus:outline-none resize-none min-h-[100px] lg:min-h-0 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
                  placeholder="Enter custom input for testing..."
                  style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", overflowWrap: "break-word" }}
                />
              </div>
            )}
          </div>

        </div>
      </div>
    );
  };

  // Bottom Panel Component - Test Cases & Terminal
  const renderBottomPanel = () => {
    if (!hasRunCode) return null;

    return (
      <>
        {/* Floating button when minimized */}
        {!showBottomPanel && (
          <button
            onClick={() => setShowBottomPanel(true)}
            className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg z-50 transition-all duration-300 flex items-center gap-2"
            title="Show Test Cases & Terminal"
          >
            <ChevronUp className="h-5 w-5" />
            <span className="text-sm font-medium">Test Results</span>
          </button>
        )}

        {/* Bottom Panel */}
        <div className={`fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg transition-transform duration-300 z-50 ${showBottomPanel ? 'translate-y-0' : 'translate-y-full'
          }`} style={{ maxHeight: '50vh' }}>
          {/* Header with Toggle */}
          <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Test Cases & Terminal</span>
              {testCaseResults.length > 0 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ({testCaseResults.filter(tc => tc.status === "PASSED").length}/{testCaseResults.length} passed)
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
                  setTestCaseResults([]);
                  setOutput("");
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
            <div className="flex flex-col h-full" style={{ maxHeight: 'calc(50vh - 50px)' }}>
              {/* Tabs */}
              <div className="flex border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <button
                  onClick={() => setShowOutput(true)}
                  className={`px-4 py-2 text-xs font-medium transition-colors ${showOutput
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                >
                  Terminal
                </button>
                <button
                  onClick={() => setShowOutput(false)}
                  className={`px-4 py-2 text-xs font-medium transition-colors ${!showOutput
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                >
                  Test Cases ({testCaseResults.length})
                </button>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto">
                {/* Terminal Tab */}
                {showOutput && (
                  <div className="p-4">
                    <div className={`p-3 rounded-lg ${submissionStatus?.status === "ACCEPTED"
                      ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                      : submissionStatus?.status === "WRONG_ANSWER" || submissionStatus?.status === "RUNTIME_ERROR"
                        ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                        : "bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
                      }`}>
                      <pre className="text-xs sm:text-sm font-mono whitespace-pre-wrap break-words text-gray-900 dark:text-gray-100">
                        {output || (isRunning || isSubmitting ? "Running..." : "No output yet.")}
                      </pre>
                    </div>
                  </div>
                )}

                {/* Test Cases Tab */}
                {!showOutput && (
                  <div className="p-4">
                    <div className="space-y-3">
                      {testCaseResults.length === 0 ? (
                        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                          No test cases to display
                        </div>
                      ) : (
                        testCaseResults.map((testCase, index) => (
                          <div
                            key={index}
                            className={`border rounded-lg p-3 ${testCase.status === "PASSED"
                              ? "border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20"
                              : testCase.status === "FAILED"
                                ? "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20"
                                : testCase.status === "ERROR"
                                  ? "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20"
                                  : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                              }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                Test Case {testCase.testCaseNumber}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded ${testCase.status === "PASSED"
                                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                                : testCase.status === "FAILED"
                                  ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                                }`}>
                                {testCase.status || "PENDING"}
                              </span>
                            </div>
                            <div className="space-y-2 text-xs">
                              <div className="text-gray-600 dark:text-gray-400">
                                <span className="font-medium">Input:</span>
                                <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-800 rounded text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-words">
                                  {testCase.input}
                                </pre>
                              </div>
                              <div className="text-gray-600 dark:text-gray-400">
                                <span className="font-medium">Expected Output:</span>
                                <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-800 rounded text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-words">
                                  {testCase.expectedOutput}
                                </pre>
                              </div>
                              {testCase.status && testCase.actualOutput !== null && (
                                <div className="text-gray-600 dark:text-gray-400">
                                  <span className="font-medium">Your Output:</span>
                                  <pre className={`mt-1 p-2 rounded whitespace-pre-wrap break-words ${testCase.status === "PASSED"
                                    ? "bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-100"
                                    : "bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-100"
                                    }`}>
                                    {testCase.actualOutput || "(empty)"}
                                  </pre>
                                </div>
                              )}
                              {testCase.error && (
                                <div className="text-red-600 dark:text-red-400">
                                  <span className="font-medium">Error:</span>
                                  <pre className="mt-1 p-2 bg-red-50 dark:bg-red-900/20 rounded whitespace-pre-wrap break-words">
                                    {testCase.error}
                                  </pre>
                                </div>
                              )}
                              {testCase.executionTime && (
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  Execution Time: {testCase.executionTime}ms
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-4 flex-shrink-0">
        <button
          onClick={handleBack}
          className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
        </button>
        <h1 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
          {view === "topics" ? "Coding Practice" : view === "questions" ? selectedTopic?.name : selectedQuestion?.name}
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: hasRunCode && showBottomPanel ? '50vh' : '0' }}>
        {view === "topics" && renderTopicsView()}
        {view === "questions" && renderQuestionsView()}
        {view === "question" && renderQuestionView()}
      </div>

      {/* Bottom Panel - Test Cases & Terminal */}
      {view === "question" && renderBottomPanel()}
    </div>
  );
};

export default CodingPage;
