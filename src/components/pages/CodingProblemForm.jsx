import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Code, ChevronLeft, Loader2, Plus, X } from "lucide-react";
import { codingService } from "../../services/codingService";
import { candidateService } from "../../services/candidateService";
import { useTheme } from "../../contexts/ThemeContext";
import Atom from "../Atom";
import TestResultsCards from "../common/TestResultsCards";

const CodingProblemForm = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [candidateId, setCandidateId] = useState(null);
  const [topicInput, setTopicInput] = useState("");
  const [customTopics, setCustomTopics] = useState([]);

  useEffect(() => {
    loadCandidateId();
  }, []);

  const loadCandidateId = async () => {
    try {
      const profile = await candidateService.getProfile();
      if (profile && profile.id) {
        setCandidateId(profile.id);
      }
    } catch (error) {
      console.error("Error loading candidate ID:", error);
    }
  };

  const [formData, setFormData] = useState({
    language: "JAVA",
    difficulty: "EASY",
    numberOfQuestions: "1",
    topics: []
  });

  const languages = ["JAVA", "PYTHON", "CPP", "C", "JAVASCRIPT"];
  const difficulties = ["EASY", "MEDIUM", "HARD"];
  const numberOfQuestionsOptions = ["1", "2", "3"];

  const handleLanguageChange = (e) => {
    setFormData({ ...formData, language: e.target.value });
  };

  const handleDifficultyChange = (e) => {
    setFormData({ ...formData, difficulty: e.target.value });
  };

  const handleNumberOfQuestionsChange = (e) => {
    setFormData({ ...formData, numberOfQuestions: e.target.value });
  };

  const handleAddTopic = () => {
    const topic = topicInput.trim();
    if (topic && !formData.topics.includes(topic) && formData.topics.length < 3) {
      setFormData({
        ...formData,
        topics: [...formData.topics, topic]
      });
      setTopicInput("");
    }
  };

  const handleRemoveTopic = (topicToRemove) => {
    setFormData({
      ...formData,
      topics: formData.topics.filter(t => t !== topicToRemove)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate that at least 1 topic is selected
    if (!formData.topics || formData.topics.length === 0) {
      setError("Please select at least 1 topic to proceed.");
      setLoading(false);
      return;
    }

    try {
      // Call backend to generate question
      const problem = await codingService.generateProblem({
        language: formData.language,
        difficulty: formData.difficulty,
        topics: formData.topics,
        numberOfQuestions: parseInt(formData.numberOfQuestions)
      });

      // Navigate to AI coding problem page with the generated problem
      // Extract only serializable data to avoid React symbol cloning errors
      const problemData = {
        questionId: problem.questionId,
        language: problem.language,
        difficulty: problem.difficulty,
        topics: Array.isArray(problem.topics) ? [...problem.topics] : problem.topics,
        title: problem.title,
        description: problem.description,
        constraints: problem.constraints,
        examples: Array.isArray(problem.examples) ? problem.examples.map(ex => ({
          input: ex.input,
          output: ex.output,
          explanation: ex.explanation
        })) : problem.examples,
        testCases: Array.isArray(problem.testCases) ? problem.testCases.map(tc => ({
          input: tc.input,
          expectedOutput: tc.expectedOutput,
          isSample: tc.isSample
        })) : problem.testCases,
        starterCode: problem.starterCode,
        solution: problem.solution
      };
      navigate("/practice/ai/problem", { state: { problem: problemData } });
    } catch (err) {
      setError(err.message || "Failed to generate coding problem. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="lg:h-[calc(100vh-90px)] h-auto bg-gray-50/50 dark:bg-gray-900 flex flex-col transition-colors duration-300 lg:overflow-hidden overflow-auto relative">
      {/* Background Tech Pattern */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(#4C4CFF 0.5px, transparent 0.5px), radial-gradient(#4C4CFF 0.5px, #f8f9fd 0.5px)', backgroundSize: '20px 20px' }}>
      </div>

      {loading && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <div className="h-1 bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div className="h-full bg-orange-500 dark:bg-orange-600 animate-[loading_2s_ease-in-out_infinite]" style={{
              width: '100%',
              transform: 'translateX(-100%)',
              animation: 'loading 2s ease-in-out infinite'
            }}></div>
          </div>
          <style>{`
            @keyframes loading {
              0% { transform: translateX(-100%); }
              50% { transform: translateX(0%); }
              100% { transform: translateX(100%); }
            }
          `}</style>
        </div>
      )}

      <div className="w-full max-w-[1400px] mx-auto animate-fade-in space-y-4 pb-10">
        {/* Top Bar with Back Button */}
        <div className="flex items-center gap-4 mb-1">
          <button
            onClick={() => navigate("/practice/ai")}
            className="p-2 hover:bg-white rounded-xl shadow-sm border border-gray-100 transition-all text-gray-400 hover:text-[#4C4CFF]"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-black text-[#1a1a1a] tracking-tight uppercase">Challenge Setup</h1>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Configure your coding problem</p>
          </div>
        </div>

        {/* Form Content - Non-scrollable wrapper on desktop */}
        <div className="flex-1 w-full">
          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch pb-20">
              {/* Left Column - Configuration Form */}
              <div className="lg:col-span-4 h-full lg:overflow-hidden overflow-visible flex flex-col">
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-gray-50 p-6 transition-all duration-300 lg:overflow-y-auto overflow-visible custom-scrollbar">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
                      <Code className="h-6 w-6" strokeWidth={2.5} />
                    </div>
                    <div className="text-left">
                      <h2 className="text-lg font-black text-[#1a1a1a] leading-tight uppercase tracking-tight">Setup Challenge</h2>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Preferences for AI Generation</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-4">
                      {/* Language Selection */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-gray-900 dark:text-gray-100">
                          Language
                        </label>
                        <select
                          value={formData.language}
                          onChange={handleLanguageChange}
                          className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-xs bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                          required
                        >
                          {languages.map((lang) => (
                            <option key={lang} value={lang}>{lang}</option>
                          ))}
                        </select>
                      </div>

                      {/* Difficulty Selection */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-gray-900 dark:text-gray-100">
                          Difficulty
                        </label>
                        <select
                          value={formData.difficulty}
                          onChange={handleDifficultyChange}
                          className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-xs bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                          required
                        >
                          {difficulties.map((diff) => (
                            <option key={diff} value={diff}>{diff}</option>
                          ))}
                        </select>
                      </div>

                      {/* Number of Questions */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-gray-900 dark:text-gray-100">
                          Questions
                        </label>
                        <select
                          value={formData.numberOfQuestions}
                          onChange={handleNumberOfQuestionsChange}
                          className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-xs bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                          required
                        >
                          {numberOfQuestionsOptions.map((num) => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>

                      {/* Topics Input */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-gray-900 dark:text-gray-100">
                          Topics <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={topicInput}
                            onChange={(e) => setTopicInput(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTopic())}
                            placeholder={formData.topics.length >= 3 ? "Max topics reached" : "e.g., Arrays, Recursion..."}
                            disabled={formData.topics.length >= 3}
                            className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-xs bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 disabled:opacity-50"
                          />
                          <button
                            type="button"
                            onClick={handleAddTopic}
                            disabled={formData.topics.length >= 3}
                            className="p-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 disabled:opacity-50 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Topic Tags */}
                        {formData.topics.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {formData.topics.map((topic) => (
                              <span
                                key={topic}
                                className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-lg text-[10px] font-medium border border-orange-100 dark:border-orange-800"
                              >
                                {topic}
                                <button onClick={() => handleRemoveTopic(topic)} className="hover:text-orange-900 dark:hover:text-orange-100">
                                  <X className="h-3 w-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl">
                        <p className="text-[10px] text-red-600 dark:text-red-400 flex items-center gap-2">
                          <X className="h-3 w-3" />
                          {error}
                        </p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 px-6 bg-orange-500 text-white rounded-xl text-xs font-bold shadow-md shadow-orange-500/20 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 transition-all duration-300 transform active:scale-[0.98]"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Generating...</span>
                        </>
                      ) : (
                        <span>Generate Challenge</span>
                      )}
                    </button>

                    {/* Loading Atom Spinner */}
                    {loading && (
                      <div className="pt-2 flex justify-center">
                        <Atom
                          color="#f87500"
                          size="small"
                          text="Crafting puzzle..."
                          textColor="text-gray-600 dark:text-gray-400"
                        />
                      </div>
                    )}
                  </form>
                </div>
              </div>

              <div className="lg:col-span-8 lg:h-full flex flex-col lg:overflow-hidden overflow-visible">
                {candidateId && (
                  <div className="lg:flex-1 bg-white dark:bg-gray-800 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-gray-50 p-6 transition-all duration-300 lg:overflow-hidden overflow-visible">
                    <TestResultsCards questionType="CODING" candidateId={candidateId} isAiGenerated={true} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingProblemForm;
