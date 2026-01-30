import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MessageSquare, Briefcase, Brain, ChevronLeft, Loader2, X, Upload, Plus } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import aiBackendClient from "../../services/aiBackendService";
import { candidateService } from "../../services/candidateService";
import Atom from "../Atom";
import TestResultsCards from "../common/TestResultsCards";

const InterviewQuestionsForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [candidateId, setCandidateId] = useState(null);

  const questionType = location.state?.questionType || "COMMUNICATION";

  const [formData, setFormData] = useState({
    difficulty: "MEDIUM",
    duration: "30",
    positionTitle: "",
    skills: "",
    prompt: "",
    jdText: "",
    topics: [], // Using for Aptitude topics
    numberOfQuestions: questionType === "APTITUDE" ? "5" : "1",
    interviewerName: "",
  });

  const [jdFileName, setJdFileName] = useState("");
  const [topicInput, setTopicInput] = useState("");

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

  const difficulties = ["EASY", "MEDIUM", "HARD"];
  const durations = ["15", "30", "45", "1hr"];

  // Number of questions options based on question type
  const getNumberOfQuestionsOptions = () => {
    if (questionType === "APTITUDE") {
      return ["5", "10", "15"];
    } else if (questionType === "COMMUNICATION" || questionType === "POSITION_SPECIFIC") {
      return ["1", "2", "3", "4", "5", "6", "7", "8"];
    }
    return ["1"];
  };

  const questionTypeConfig = {
    COMMUNICATION: {
      label: "Communication",
      icon: MessageSquare,
      color: "blue",
      description: "Generate communication and soft skills interview questions"
    },
    POSITION_SPECIFIC: {
      label: "Position Specified",
      icon: Briefcase,
      color: "purple",
      description: "Generate questions specific to job positions"
    },
    APTITUDE: {
      label: "Aptitude",
      icon: Brain,
      color: "green",
      description: "Generate aptitude and reasoning questions"
    }
  };

  const config = questionTypeConfig[questionType] || questionTypeConfig.COMMUNICATION;
  const Icon = config.icon;

  // Get color classes based on config color
  const getColorClasses = () => {
    const colorMap = {
      blue: {
        icon: "text-blue-500 dark:text-blue-400",
        border: "border-blue-500 dark:border-blue-600",
        focus: "focus:ring-blue-500 dark:focus:ring-blue-400",
        bg: "bg-blue-500 dark:bg-blue-600",
        hover: "hover:bg-blue-600 dark:hover:bg-blue-700",
        tagBg: "bg-blue-100 dark:bg-blue-900/30",
        tagText: "text-blue-700 dark:text-blue-300",
        tagHover: "hover:text-blue-900 dark:hover:text-blue-200"
      },
      purple: {
        icon: "text-purple-500 dark:text-purple-400",
        border: "border-purple-500 dark:border-purple-600",
        focus: "focus:ring-purple-500 dark:focus:ring-purple-400",
        bg: "bg-purple-500 dark:bg-purple-600",
        hover: "hover:bg-purple-600 dark:hover:bg-purple-700",
        tagBg: "bg-purple-100 dark:bg-purple-900/30",
        tagText: "text-purple-700 dark:text-purple-300",
        tagHover: "hover:text-purple-900 dark:hover:text-purple-200"
      },
      green: {
        icon: "text-green-500 dark:text-green-400",
        border: "border-green-500 dark:border-green-600",
        focus: "focus:ring-green-500 dark:focus:ring-green-400",
        bg: "bg-green-500 dark:bg-green-600",
        hover: "hover:bg-green-600 dark:hover:bg-green-700",
        tagBg: "bg-green-100 dark:bg-green-900/30",
        tagText: "text-green-700 dark:text-green-300",
        tagHover: "hover:text-green-900 dark:hover:text-green-200"
      }
    };
    return colorMap[config.color] || colorMap.blue;
  };

  const colorClasses = getColorClasses();

  // Handle JD File Upload (Optional)
  const handleJdUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setJdFileName(file.name);
      // For now, we'll store the filename or a placeholder. 
      // Real implementation would extract text or upload to S3/backend.
      setFormData({ ...formData, jdText: `JD loaded from ${file.name} ` });
    }
  };

  const handleDifficultyChange = (e) => {
    setFormData({ ...formData, difficulty: e.target.value });
  };

  const handleDurationChange = (e) => {
    setFormData({ ...formData, duration: e.target.value });
  };

  const handlePositionTitleChange = (e) => {
    setFormData({ ...formData, positionTitle: e.target.value });
  };

  const handleSkillsChange = (e) => {
    setFormData({ ...formData, skills: e.target.value });
  };

  const handlePromptChange = (e) => {
    setFormData({ ...formData, prompt: e.target.value });
  };

  const handleNumberOfQuestionsChange = (e) => {
    setFormData({ ...formData, numberOfQuestions: e.target.value });
  };

  const handleInterviewerNameChange = (e) => {
    setFormData({ ...formData, interviewerName: e.target.value });
  };

  const handleNumQuestionsChange = handleNumberOfQuestionsChange;

  const handleAddTopic = () => {
    const topic = topicInput.trim();
    if (topic && !formData.topics.includes(topic)) {
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

  const handleTopicInputKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTopic();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Build topics/prompt based on question type
      let requestTopics = [];
      if (questionType === "COMMUNICATION") {
        requestTopics = [formData.prompt];
      } else if (questionType === "POSITION_SPECIFIC") {
        requestTopics = [
          `Title: ${formData.positionTitle} `,
          `Skills: ${formData.skills} `,
          formData.jdText ? `JD: ${formData.jdText} ` : ""
        ].filter(Boolean);
      } else { // APTITUDE
        requestTopics = formData.topics;
      }

      // Call AI backend to generate interview questions
      const response = await aiBackendClient.post("/generate-interview-questions", {
        questionType: questionType,
        difficulty: formData.difficulty,
        positionTitle: formData.positionTitle || "",
        topics: requestTopics,
        numberOfQuestions: parseInt(formData.numberOfQuestions)
      });

      console.log("API Response:", response);
      console.log("Response Data:", response.data);
      console.log("Questions:", response.data?.questions);

      // Extract questions from response - handle different possible response structures
      const questions = response.data?.questions || response.data?.data?.questions || [];
      const questionId = response.data?.questionId || response.data?.data?.questionId || null;

      if (!questions || questions.length === 0) {
        setError("No questions were generated. Please try again.");
        setLoading(false);
        return;
      }

      // Navigate to questions display page with generated questions
      // Only pass serializable data - don't pass config with React components
      navigate("/practice/ai/interview-list", {
        state: {
          questions: questions,
          questionType: questionType,
          questionId: questionId
        }
      });
    } catch (err) {
      setError(err.response?.data?.detail || err.message || "Failed to generate interview questions. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto animate-fade-in space-y-4 pb-10">
      {/* Loading Progress Bar at Top */}
      {loading && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <div className="h-1 bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div
              className={`h-full ${config.color === "blue"
                ? "bg-blue-500 dark:bg-blue-600"
                : config.color === "purple"
                  ? "bg-purple-500 dark:bg-purple-600"
                  : "bg-green-500 dark:bg-green-600"
                }`}
              style={{
                width: "100%",
                transform: "translateX(-100%)",
                animation: "loading 2s ease-in-out infinite",
              }}
            ></div>
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

      {/* Top Bar with Back Button */}
      <div className="flex items-center gap-4 mb-1">
        <button
          onClick={() => navigate("/practice/ai")}
          className="p-2 hover:bg-white rounded-xl shadow-sm border border-gray-100 transition-all text-gray-400 hover:text-[#4C4CFF]"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div>
            <h1 className="text-xl font-black text-[#1a1a1a] tracking-tight uppercase">Interview Setup</h1>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{config.label} Generative Round</p>
          </div>
        </div>
      </div>

      {/* Form Content - Non-scrollable wrapper on desktop */}
      <div className="flex-1 w-full">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch pb-20">
            {/* Left Column - Configuration Form */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="bg-white dark:bg-gray-800 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-gray-50 p-6 transition-all duration-300">
                <div className="mb-6 flex items-center gap-4">
                  <div className={`p-3 rounded-2xl bg-${config.color}-50 dark:bg-${config.color}-900/20 text-${config.color}-600 dark:text-${config.color}-400`}>
                    <Icon className="h-6 w-6" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-[#1a1a1a] leading-tight uppercase tracking-tight">
                      Configure Your Round
                    </h2>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                      {config.description}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Question Type Specific Inputs */}
                  <div className="space-y-4">
                    {questionType === "COMMUNICATION" && (
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-gray-900 dark:text-gray-100">
                          Communication Prompt
                        </label>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-2">
                          Describe the situation or specific scenario you want to practice.
                        </p>
                        <textarea
                          value={formData.prompt}
                          onChange={handlePromptChange}
                          placeholder="e.g., Practicing for a conflict resolution with a team member where expectations weren't met..."
                          className={`w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-xs bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${colorClasses.focus} transition-all duration-300 min-h-[120px]`}
                          required
                        />
                      </div>
                    )}

                    {questionType === "POSITION_SPECIFIC" && (
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-gray-900 dark:text-gray-100">
                            Job Title
                          </label>
                          <input
                            type="text"
                            value={formData.positionTitle}
                            onChange={handlePositionTitleChange}
                            placeholder="e.g., Senior Full Stack Developer"
                            className={`w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-xs bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${colorClasses.focus} transition-all duration-300`}
                            required
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-gray-900 dark:text-gray-100">
                            Key Skills
                          </label>
                          <input
                            type="text"
                            value={formData.skills}
                            onChange={handleSkillsChange}
                            placeholder="e.g., React, Node.js, AWS"
                            className={`w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-xs bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${colorClasses.focus} transition-all duration-300`}
                            required
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-gray-900 dark:text-gray-100">
                            Job Description (Optional)
                          </label>
                          <div className="relative group">
                            <input
                              type="file"
                              onChange={handleJdUpload}
                              className="hidden"
                              id="jd-upload"
                            />
                            <label
                              htmlFor="jd-upload"
                              className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 bg-gray-50 dark:bg-gray-900/30"
                            >
                              <Upload className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                              <span className="text-xs text-gray-600 dark:text-gray-400">
                                {jdFileName || "Upload JD file"}
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}

                    {questionType === "APTITUDE" && (
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-gray-900 dark:text-gray-100">
                            Topics
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={topicInput}
                              onChange={(e) => setTopicInput(e.target.value)}
                              onKeyPress={handleTopicInputKeyPress}
                              placeholder="e.g., Logical Reasoning, Algebra..."
                              className={`flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-xs bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${colorClasses.focus} transition-all duration-300`}
                            />
                            <button
                              type="button"
                              onClick={handleAddTopic}
                              className={`p-2.5 rounded-xl ${colorClasses.bg} text-white hover:opacity-90 transition-opacity`}
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
                                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium ${colorClasses.tagBg} ${colorClasses.tagText}`}
                                >
                                  {topic}
                                  <button
                                    onClick={() => handleRemoveTopic(topic)}
                                    className={`${colorClasses.tagHover}`}
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Shared Configuration */}
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-gray-900 dark:text-gray-100">
                        Difficulty
                      </label>
                      <select
                        value={formData.difficulty}
                        onChange={handleDifficultyChange}
                        className={`w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-xs bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${colorClasses.focus} transition-all duration-300`}
                      >
                        {difficulties.map((diff) => (
                          <option key={diff} value={diff}>
                            {diff}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-gray-900 dark:text-gray-100">
                        Questions
                      </label>
                      <select
                        value={formData.numberOfQuestions}
                        onChange={handleNumberOfQuestionsChange}
                        className={`w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-xs bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${colorClasses.focus} transition-all duration-300`}
                      >
                        {[5, 10, 15, 20].map((num) => (
                          <option key={num} value={num}>
                            {num} Questions
                          </option>
                        ))}
                      </select>
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
                    className={`w-full py-3 px-6 ${colorClasses.bg} text-white rounded-xl text-xs font-bold shadow-md shadow-${config.color}-500/20 hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 transition-all duration-300 transform active:scale-[0.98]`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <span>Start Mock Interview</span>
                    )}
                  </button>

                  {/* Loading Atom Spinner */}
                  {loading && (
                    <div className="pt-4">
                      <Atom
                        color={
                          config.color === "blue"
                            ? "#3b82f6"
                            : config.color === "purple"
                              ? "#a855f7"
                              : "#10b981"
                        }
                        size="medium"
                        text="Crafting personalized questions..."
                        textColor="text-gray-600 dark:text-gray-400"
                      />
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Right Column - Results Dashboard Style */}
            <div className="lg:col-span-7 flex flex-col">
              {candidateId && (
                <div className="bg-white dark:bg-gray-800 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-gray-50 p-6 transition-all duration-300">
                  <TestResultsCards questionType={questionType} candidateId={candidateId} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewQuestionsForm;
