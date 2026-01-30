import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, MessageSquare, Briefcase, Brain, Bot, User } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { ttsService } from "../../services/ttsService";
import { sttService } from "../../services/sttService";
import { interviewService } from "../../services/interviewService";
import { candidateService } from "../../services/candidateService";

const InterviewQuestions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();

  // Get questions from location state or try to restore from localStorage
  const [questions, setQuestions] = useState(() => {
    const locationQuestions = location.state?.questions || [];
    if (locationQuestions.length > 0) {
      // Store questions in localStorage for refresh recovery
      const storageKey = `interview_questions_${location.state?.questionType || 'COMMUNICATION'}_${location.state?.questionId || 'default'}`;
      localStorage.setItem(storageKey, JSON.stringify(locationQuestions));
      return locationQuestions;
    }
    // Try to restore from localStorage
    const questionType = location.state?.questionType || "COMMUNICATION";
    const questionId = location.state?.questionId || null;
    const storageKey = `interview_questions_${questionType}_${questionId || 'default'}`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error("Error parsing stored questions:", e);
      }
    }
    return [];
  });

  const questionType = location.state?.questionType || "COMMUNICATION";
  const questionId = location.state?.questionId || null;

  // Session ID for grouping all Q&A in one document
  // Try to get from localStorage first, then generate new one
  const [sessionId] = useState(() => {
    const storageKey = `interview_session_${questionType}_${questionId || 'default'}`;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      return stored;
    }
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(storageKey, newSessionId);
    return newSessionId;
  });

  // Store sessionId in localStorage whenever it changes
  useEffect(() => {
    const storageKey = `interview_session_${questionType}_${questionId || 'default'}`;
    localStorage.setItem(storageKey, sessionId);
  }, [sessionId, questionType, questionId]);

  // Debug logging
  useEffect(() => {
    console.log("InterviewQuestions - Questions received:", questions);
    console.log("InterviewQuestions - Question Type:", questionType);
    console.log("InterviewQuestions - Session ID:", sessionId);
    console.log("InterviewQuestions - Location State:", location.state);
  }, [questions, questionType, sessionId, location.state]);

  // Interview conversation state
  const [conversation, setConversation] = useState([]); // Array of {type: 'question'|'answer', text: string, questionIndex: number}
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [accumulatedQA, setAccumulatedQA] = useState([]); // Accumulate all Q&A pairs: [{question, answer, questionIndex, durationSeconds}]
  const [isSpeaking, setIsSpeaking] = useState(false);
  const textRevealIntervalRef = useRef(null);
  const currentQuestionRef = useRef("");
  const charIndexRef = useRef(0);

  // Popup and timer state
  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const countdownTimerRef = useRef(null);

  // Speech-to-text state
  const [isRecording, setIsRecording] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Candidate state
  const [candidateId, setCandidateId] = useState(null);
  const [candidateLoaded, setCandidateLoaded] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // Answer tracking
  const answerStartTimeRef = useRef(null);
  const conversationEndRef = useRef(null);
  const autoSaveTimerRef = useRef(null);
  const lastSpeechTimeRef = useRef(null);
  const questionsAddedRef = useRef(new Set()); // Track which questions have been added to conversation
  const currentAnswerRef = useRef(""); // Ref to track current answer for timer callbacks
  const accumulatedQARef = useRef([]); // Ref to track all accumulated Q&A pairs
  const isRecordingRef = useRef(false); // Ref to track recording state for timer callbacks
  const maxAnswerTimerRef = useRef(null); // Ref for 2-minute max timeout

  // Reconstruct config from questionType instead of receiving it from state
  // This avoids passing React components through navigation state
  const questionTypeConfig = {
    COMMUNICATION: {
      label: "Communication",
      icon: MessageSquare,
      color: "blue"
    },
    POSITION_SPECIFIC: {
      label: "Position Specified",
      icon: Briefcase,
      color: "purple"
    },
    APTITUDE: {
      label: "Aptitude",
      icon: Brain,
      color: "green"
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
        bg: "bg-blue-500 dark:bg-blue-600",
        hover: "hover:bg-blue-600 dark:hover:bg-blue-700",
        numberBg: "bg-blue-500 dark:bg-blue-600"
      },
      purple: {
        icon: "text-purple-500 dark:text-purple-400",
        border: "border-purple-500 dark:border-purple-600",
        bg: "bg-purple-500 dark:bg-purple-600",
        hover: "hover:bg-purple-600 dark:hover:bg-purple-700",
        numberBg: "bg-purple-500 dark:bg-purple-600"
      },
      green: {
        icon: "text-green-500 dark:text-green-400",
        border: "border-green-500 dark:border-green-600",
        bg: "bg-green-500 dark:bg-green-600",
        hover: "hover:bg-green-600 dark:hover:bg-green-700",
        numberBg: "bg-green-500 dark:bg-green-600"
      }
    };
    return colorMap[config.color] || colorMap.blue;
  };

  const colorClasses = getColorClasses();

  // Load candidate data and restore session on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load candidate profile
        const candidate = await candidateService.getProfile();
        if (candidate && candidate.id) {
          setCandidateId(candidate.id);
        }

        // Try to load existing session
        try {
          const sessionData = await interviewService.getSession(sessionId);
          if (sessionData.success && sessionData.questionAnswers && sessionData.questionAnswers.length > 0) {
            console.log("Found existing session, restoring state...", sessionData);

            // Restore conversation from session
            const restoredConversation = [];
            const restoredQA = [];

            sessionData.questionAnswers.forEach((qa, idx) => {
              // Add question to conversation
              restoredConversation.push({
                type: 'question',
                text: qa.question,
                questionIndex: idx,
                timestamp: new Date()
              });

              // Add answer to conversation
              restoredConversation.push({
                type: 'answer',
                text: qa.answer,
                questionIndex: idx,
                timestamp: new Date()
              });

              // Add to accumulated QA
              restoredQA.push({
                questionId: qa.questionId || `q_${idx}_${Date.now()}`,
                question: qa.question,
                answer: qa.answer,
                questionIndex: idx,
                durationSeconds: qa.durationSeconds || 0,
                language: qa.language || "en-US"
              });

              // Mark question as added
              questionsAddedRef.current.add(`q_${idx}`);
            });

            // Restore questions from session if not available
            let restoredQuestions = questions;
            if (questions.length === 0 && sessionData.questionAnswers.length > 0) {
              restoredQuestions = sessionData.questionAnswers.map(qa => qa.question);
              setQuestions(restoredQuestions);
              // Store in localStorage
              const storageKey = `interview_questions_${sessionData.questionType || questionType}_${sessionData.questionSetId || questionId || 'default'}`;
              localStorage.setItem(storageKey, JSON.stringify(restoredQuestions));
            }

            // Set restored state
            setConversation(restoredConversation);
            setAccumulatedQA(restoredQA);
            accumulatedQARef.current = restoredQA;

            // Set current question index to next unanswered question
            const nextQuestionIndex = sessionData.questionAnswers.length;
            const totalQuestions = restoredQuestions.length > 0 ? restoredQuestions.length : sessionData.questionAnswers.length;
            setCurrentQuestionIndex(nextQuestionIndex);

            // If all questions are answered, mark as completed
            if (nextQuestionIndex >= totalQuestions) {
              setInterviewCompleted(true);
            }

            // Mark interview as started since we have restored data
            setInterviewStarted(true);

            console.log(`Restored ${restoredQA.length} Q&A pairs, next question index: ${nextQuestionIndex}, total questions: ${totalQuestions}`);
          }
        } catch (sessionError) {
          console.log("No existing session found or error loading session:", sessionError);
          // Continue with new interview
        }

        setCandidateLoaded(true);
      } catch (error) {
        console.error("Error loading candidate:", error);
        // Still set candidateLoaded to true to allow interview to proceed
        setCandidateLoaded(true);
      }
    };

    loadData();
  }, [sessionId, questions.length]);

  // Auto-start interview when questions are loaded (only if not restored from session)
  useEffect(() => {
    if (questions.length > 0 && candidateLoaded && !interviewStarted && currentQuestionIndex === 0 && conversation.length === 0) {
      setInterviewStarted(true);
      // Start with first question
      if (questions[0]) {
        startSpeaking(questions[0], 0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions.length, candidateLoaded]);

  // Auto-play next question when index changes (only if not all questions completed and not already answered)
  useEffect(() => {
    if (interviewStarted && questions.length > 0 && currentQuestionIndex < questions.length) {
      const questionText = questions[currentQuestionIndex];
      if (questionText) {
        // Check if this question was already answered (prevent re-answering)
        const alreadyAnswered = accumulatedQA.some(qa => qa.questionIndex === currentQuestionIndex);
        if (alreadyAnswered) {
          console.log(`Question ${currentQuestionIndex} already answered, skipping...`);
          // Move to next unanswered question
          const nextUnansweredIndex = questions.findIndex((_, idx) =>
            idx > currentQuestionIndex && !accumulatedQA.some(qa => qa.questionIndex === idx)
          );
          if (nextUnansweredIndex !== -1) {
            setTimeout(() => {
              setCurrentQuestionIndex(nextUnansweredIndex);
            }, 100);
          } else {
            // All questions answered
            setInterviewCompleted(true);
          }
          return;
        }

        // Check if this question was already spoken to avoid duplicates
        const questionKey = `q_${currentQuestionIndex}`;
        if (!questionsAddedRef.current.has(questionKey)) {
          // Small delay before starting next question
          setTimeout(() => {
            startSpeaking(questionText, currentQuestionIndex);
          }, 300);
        }
      }
    } else if (currentQuestionIndex >= questions.length) {
      // All questions completed - ensure recording is stopped
      isRecordingRef.current = false;
      setIsRecording(false);
      setCurrentAnswer("");
      currentAnswerRef.current = ""; // Reset ref as well
      sttService.stopListening();
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
        autoSaveTimerRef.current = null;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex, interviewStarted, questions.length]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
      if (maxAnswerTimerRef.current) {
        clearTimeout(maxAnswerTimerRef.current);
      }
      if (textRevealIntervalRef.current) {
        clearInterval(textRevealIntervalRef.current);
      }
      if (isRecording) {
        sttService.stopListening();
      }
    };
  }, [isRecording]);

  const startSpeaking = async (questionText, questionIndex) => {
    if (!questionText) return;

    console.log(`Interview: startSpeaking called for question ${questionIndex}: "${questionText.substring(0, 30)}..."`);

    // Initialize TTS service if not already
    await ttsService.initialize();

    // Check if this question already exists using ref to avoid duplicates (state might not be updated yet)
    const questionKey = `q_${questionIndex}`;
    if (questionsAddedRef.current.has(questionKey)) {
      console.log(`Interview: Question ${questionIndex} already exists in conversation, skipping speech.`);
      return;
    }

    // Mark question as added
    questionsAddedRef.current.add(questionKey);

    // Add question to conversation - show full question immediately
    setConversation(prev => {
      // Double check to avoid duplicates in state
      const exists = prev.some(msg => msg.type === 'question' && msg.questionIndex === questionIndex);
      if (exists) {
        return prev;
      }
      return [...prev, {
        type: 'question',
        text: questionText,
        questionIndex: questionIndex,
        timestamp: new Date(),
        isSpeaking: false
      }];
    });

    console.log(`Interview: Calling ttsService.speak for question ${questionIndex}`);

    // Use TTS service to speak
    ttsService.speak(questionText, {
      onStart: () => {
        console.log(`Interview: TTS onStart for question ${questionIndex}`);
        setIsSpeaking(true);
        // Update the question to show it's speaking
        setConversation(prev => {
          return prev.map(msg => {
            if (msg.type === 'question' && msg.questionIndex === questionIndex) {
              return { ...msg, isSpeaking: true };
            }
            return msg;
          });
        });
      },
      onEnd: () => {
        console.log(`Interview: TTS onEnd for question ${questionIndex}`);
        setIsSpeaking(false);
        // Update conversation to mark question as finished speaking
        setConversation(prev => {
          return prev.map(msg => {
            if (msg.type === 'question' && msg.questionIndex === questionIndex) {
              return { ...msg, isSpeaking: false };
            }
            return msg;
          });
        });
        // Show popup with 5-second countdown after TTS finishes
        showCountdownPopup();
      },
      onError: (event) => {
        console.error(`Interview: TTS onError for question ${questionIndex}:`, event);
        setIsSpeaking(false);
        setConversation(prev => {
          return prev.map(msg => {
            if (msg.type === 'question' && msg.questionIndex === questionIndex) {
              return { ...msg, isSpeaking: false };
            }
            return msg;
          });
        });
        // Even if TTS fails, we should show the countdown so the user can answer
        showCountdownPopup();
      }
    });
  };

  // Show countdown popup after TTS finishes
  const showCountdownPopup = () => {
    setShowPopup(true);
    setCountdown(5);

    // Start countdown timer
    countdownTimerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownTimerRef.current);
          setShowPopup(false);
          // Auto-start recording after countdown
          startRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Start recording candidate's answer (only called after question is asked and countdown completes)
  const startRecording = async () => {
    console.log("startRecording called - question finished, countdown done, starting recording...");

    await sttService.initialize();

    if (!sttService.isSupported) {
      alert("Speech recognition is not supported in your browser. Please use Chrome or Edge.");
      return;
    }

    // Reset answer state
    setCurrentAnswer("");
    currentAnswerRef.current = ""; // Reset ref as well
    answerStartTimeRef.current = Date.now();
    lastSpeechTimeRef.current = Date.now();
    setIsRecording(true);
    isRecordingRef.current = true; // Update ref as well

    // Clear any existing auto-save timer
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
      autoSaveTimerRef.current = null;
    }

    // Start 10-second timer ONLY after recording begins
    // This timer will auto-submit if candidate doesn't answer at all
    console.log("Starting 10-second auto-submit timer at:", new Date().toISOString());
    const timerStartTime = Date.now();
    const currentQuestionIdx = currentQuestionIndex; // Capture current question index

    // Store timer ID for verification
    const timerId = setTimeout(() => {
      const elapsed = Date.now() - timerStartTime;
      console.log(`=== 10-SECOND TIMER FIRED ===`);
      console.log(`Elapsed time: ${elapsed}ms`);
      console.log("isRecordingRef.current:", isRecordingRef.current);
      console.log("currentAnswerRef.current:", currentAnswerRef.current);
      console.log("Current question index:", currentQuestionIdx);

      // Check if we should auto-save (recording is still active)
      if (isRecordingRef.current && currentQuestionIdx === currentQuestionIndex) {
        console.log("✅ Conditions met - Auto-saving with NO response...");
        handleAutoSave();
      } else {
        console.log("❌ Conditions not met - Skipping auto-save");
        console.log("  - isRecordingRef:", isRecordingRef.current);
        console.log("  - questionIndex match:", currentQuestionIdx === currentQuestionIndex);
      }
    }, 10000); // 10 seconds from when recording starts

    autoSaveTimerRef.current = timerId;
    console.log("✅ Timer set with ID:", timerId);
    console.log("Timer will fire at:", new Date(Date.now() + 10000).toISOString());

    // Helper function to restart recognition
    const restartRecognition = () => {
      if (!isRecordingRef.current || currentQuestionIndex >= questions.length) {
        return;
      }

      setTimeout(() => {
        if (!isRecordingRef.current || currentQuestionIndex >= questions.length) {
          return;
        }

        console.log("Restarting speech recognition...");
        sttService.startListening({
          onResult: (result) => {
            console.log("Speech detected:", result.full);
            setCurrentAnswer(result.full);
            currentAnswerRef.current = result.full;
            lastSpeechTimeRef.current = Date.now();

            // Clear and restart timer
            if (autoSaveTimerRef.current) {
              clearTimeout(autoSaveTimerRef.current);
            }
            const currentQuestionIdx = currentQuestionIndex;
            autoSaveTimerRef.current = setTimeout(() => {
              if (isRecordingRef.current && currentQuestionIdx === currentQuestionIndex) {
                console.log("10-second timer fired - auto-saving...");
                handleAutoSave();
              }
            }, 10000);
          },
          onEnd: () => {
            // Restart if still recording
            restartRecognition();
          },
          onError: () => {
            // Restart on error if still recording
            restartRecognition();
          }
        });
      }, 500);
    };

    sttService.startListening({
      onResult: (result) => {
        console.log("Speech detected:", result.full);
        setCurrentAnswer(result.full);
        currentAnswerRef.current = result.full; // Update ref as well

        // Reset the auto-save timer when speech is detected
        lastSpeechTimeRef.current = Date.now();
        if (autoSaveTimerRef.current) {
          console.log("Clearing timer due to speech detection");
          clearTimeout(autoSaveTimerRef.current);
          autoSaveTimerRef.current = null;
        }

        // Restart the 10-second timer after last speech detected
        // This gives 10 seconds of silence before auto-submitting
        console.log("Restarting 10-second timer after speech...");
        const timerStartTime = Date.now();
        const currentQuestionIdx = currentQuestionIndex; // Capture current question index
        autoSaveTimerRef.current = setTimeout(() => {
          const elapsed = Date.now() - timerStartTime;
          console.log(`10-second timer after speech fired after ${elapsed}ms - saving answer...`);
          // Check if still recording and on same question
          if (isRecordingRef.current && currentQuestionIdx === currentQuestionIndex) {
            handleAutoSave();
          }
        }, 10000);
      },
      onEnd: () => {
        // Speech recognition ended automatically (browser timeout)
        // Restart it if we're still recording
        console.log("Speech recognition ended automatically - restarting if still recording");
        restartRecognition();
      },
      onError: (event) => {
        console.error("Speech recognition error:", event);
        // Restart on error if still recording
        restartRecognition();
      }
    });

    // Start 2-minute (120 seconds) absolute maximum timer
    const maxDurationQuestionIdx = currentQuestionIndex; // Capture current question index
    console.log("Starting 120-second max-duration timer at:", new Date().toISOString());
    maxAnswerTimerRef.current = setTimeout(() => {
      if (isRecordingRef.current && maxDurationQuestionIdx === currentQuestionIndex) {
        console.log("=== 120-SECOND MAX TIMER FIRED - Auto-saving... ===");
        handleAutoSave();
      }
    }, 120000); // 2 minutes
  };

  // Auto-save answer and move to next question
  const handleAutoSave = async () => {
    console.log("=== handleAutoSave called ===");
    console.log("isRecording (state):", isRecording);
    console.log("isRecordingRef.current:", isRecordingRef.current);
    console.log("currentAnswer (state):", currentAnswer);
    console.log("currentAnswerRef.current:", currentAnswerRef.current);

    // Prevent multiple calls
    if (!isRecordingRef.current) {
      console.log("Already saved or not recording, skipping...");
      return;
    }

    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
      autoSaveTimerRef.current = null;
    }

    if (maxAnswerTimerRef.current) {
      clearTimeout(maxAnswerTimerRef.current);
      maxAnswerTimerRef.current = null;
    }

    // Stop recording if still active
    isRecordingRef.current = false; // Update ref first
    if (isRecording) {
      setIsRecording(false);
    }
    try {
      sttService.stopListening();
    } catch (error) {
      console.error("Error stopping listening:", error);
    }

    // Get current answer value - use ref to get latest value (avoid stale closure)
    const answerValue = currentAnswerRef.current || currentAnswer || "";
    const answerToSave = answerValue.trim() !== "" ? answerValue : "NO response";
    console.log("Saving answer:", answerToSave);

    // Save the answer (even if empty - will be "NO response")
    if (!candidateId) {
      // Try to get candidate ID if not available
      try {
        const candidate = await candidateService.getProfile();
        if (candidate && candidate.id) {
          setCandidateId(candidate.id);
        }
      } catch (error) {
        console.error("Error getting candidate:", error);
      }
    }

    setIsSaving(true);

    try {
      const durationSeconds = answerStartTimeRef.current
        ? Math.floor((Date.now() - answerStartTimeRef.current) / 1000)
        : 0;

      const answerText = answerToSave;

      // Add current Q&A to accumulated list
      const currentQA = {
        questionId: questionId || `q_${currentQuestionIndex}_${Date.now()}`,
        question: questions[currentQuestionIndex],
        answer: answerText,
        questionIndex: currentQuestionIndex,
        durationSeconds: durationSeconds,
        language: "en-US"
      };

      // Calculate updated QA list using ref to get latest value
      const updatedQA = [...accumulatedQARef.current, currentQA];
      accumulatedQARef.current = updatedQA; // Update ref
      setAccumulatedQA(updatedQA); // Update state for UI

      // Send all accumulated Q&A pairs together
      console.log("Saving all Q&A pairs:", updatedQA.length, "pairs");
      await interviewService.saveQuestionAnswer({
        questionId: questionId || `q_${currentQuestionIndex}_${Date.now()}`,
        question: questions[currentQuestionIndex],
        answer: answerText,
        questionType: questionType,
        candidateId: candidateId,
        durationSeconds: durationSeconds,
        language: "en-US",
        sessionId: sessionId, // Same session ID for all Q&A in this interview
        questionSetId: questionId, // Reference to the question set
        allQuestionAnswers: updatedQA.map(qa => ({
          questionId: qa.questionId,
          question: qa.question,
          answer: qa.answer,
          durationSeconds: qa.durationSeconds,
          language: qa.language
        }))
      });

      console.log("Successfully saved all Q&A pairs to session:", sessionId);

      // Add answer to conversation
      setConversation(prev => [...prev, {
        type: 'answer',
        text: answerText,
        questionIndex: currentQuestionIndex,
        timestamp: new Date()
      }]);

      // Reset for next question
      setCurrentAnswer("");
      currentAnswerRef.current = ""; // Reset ref as well
      answerStartTimeRef.current = null;
      setIsSaving(false);

      // Auto-advance to next question
      if (currentQuestionIndex < questions.length - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex(prev => prev + 1);
        }, 500);
      } else {
        // All questions completed - stop recording and clear state
        setIsRecording(false);
        setCurrentAnswer("");
        currentAnswerRef.current = ""; // Reset ref as well
        sttService.stopListening();
        if (autoSaveTimerRef.current) {
          clearTimeout(autoSaveTimerRef.current);
          autoSaveTimerRef.current = null;
        }
        if (maxAnswerTimerRef.current) {
          clearTimeout(maxAnswerTimerRef.current);
          maxAnswerTimerRef.current = null;
        }
        setInterviewCompleted(true);
        setConversation(prev => [...prev, {
          type: 'system',
          text: 'Interview completed! Thank you for your responses.',
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      console.error("Error saving answer:", error);
      setIsSaving(false);
      // Still move to next question even if save fails
      if (currentQuestionIndex < questions.length - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex(prev => prev + 1);
        }, 500);
      } else {
        // All questions completed - stop recording even if save failed
        isRecordingRef.current = false;
        setIsRecording(false);
        setCurrentAnswer("");
        currentAnswerRef.current = ""; // Reset ref as well
        sttService.stopListening();
        if (autoSaveTimerRef.current) {
          clearTimeout(autoSaveTimerRef.current);
          autoSaveTimerRef.current = null;
        }
        if (maxAnswerTimerRef.current) {
          clearTimeout(maxAnswerTimerRef.current);
          maxAnswerTimerRef.current = null;
        }
        setInterviewCompleted(true);
      }
    }
  };

  // Analyze interview answers with AI
  const handleGetResult = async () => {
    if (accumulatedQA.length === 0) {
      alert("No answers to analyze. Please complete the interview first.");
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await interviewService.analyzeAnswers({
        sessionId: sessionId,
        questionType: questionType,
        candidateId: candidateId,
        allQuestionAnswers: accumulatedQA.map(qa => ({
          questionId: qa.questionId,
          question: qa.question,
          answer: qa.answer,
          durationSeconds: qa.durationSeconds,
          language: qa.language
        }))
      });

      setAnalysisResult(result);
    } catch (error) {
      console.error("Error analyzing answers:", error);
      alert("Failed to analyze answers. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };


  // Scroll to bottom of conversation
  useEffect(() => {
    if (conversationEndRef.current) {
      setTimeout(() => {
        conversationEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100);
    }
  }, [conversation]);

  // Also scroll on questions change
  useEffect(() => {
    if (conversationEndRef.current && questions.length > 0) {
      setTimeout(() => {
        conversationEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100);
    }
  }, [questions.length]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-300">
      {/* Top Bar with Back Button */}
      <div className="flex items-center gap-4 mb-2">
        <button
          onClick={() => navigate("/practice/ai/interview", { state: { questionType } })}
          className="p-2 hover:bg-white rounded-xl shadow-sm border border-gray-100 transition-all text-gray-400 hover:text-[#4C4CFF]"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex-1 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-black text-[#1a1a1a] tracking-tight uppercase">Mock Interview</h1>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{config.label} Generative Round</p>
          </div>
          <div className="text-[9px] font-black text-gray-300 uppercase tracking-widest hidden sm:block">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>
      </div>

      {/* Conversation Area - Chat Style Mock Interview */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        <div className="w-full">
          {questions.length > 0 ? (
            <div className="space-y-3 pb-4">
              {/* Show questions list if interview hasn't started yet */}
              {conversation.length === 0 && !interviewStarted && (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-5 border border-gray-200 dark:border-gray-700 w-full">
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                    Generated Questions ({questions.length})
                  </h2>
                  <div className="space-y-2">
                    {questions.map((question, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 w-full"
                      >
                        <div className="flex items-start gap-2">
                          <div className={`flex-shrink-0 w-6 h-6 ${colorClasses.bg} rounded-full flex items-center justify-center text-white font-semibold text-xs`}>
                            {idx + 1}
                          </div>
                          <p className="text-xs sm:text-sm text-gray-900 dark:text-white flex-1">
                            {question}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {candidateLoaded ? "Starting interview..." : "Loading..."}
                    </p>
                  </div>
                </div>
              )}

              {/* Conversation Messages - Show all questions and answers sequentially (filter duplicates) */}
              {conversation
                .filter((message, index, self) => {
                  // For questions, only show the first occurrence of each questionIndex
                  if (message.type === 'question') {
                    const firstIndex = self.findIndex(
                      m => m.type === 'question' && m.questionIndex === message.questionIndex
                    );
                    return index === firstIndex;
                  }
                  // Show all answers and system messages
                  return true;
                })
                .map((message, index) => (
                  <div
                    key={`${message.type}-${message.questionIndex !== undefined ? message.questionIndex : 'system'}-${message.timestamp?.getTime() || index}`}
                    className={`flex items-start gap-3 w-full ${message.type === 'question' ? 'justify-start' : 'justify-end'
                      }`}
                  >
                    {/* Question Message - Left side, Grey bubble */}
                    {message.type === 'question' && (
                      <>
                        <div className="flex-shrink-0 w-8 h-8 bg-gray-400 dark:bg-gray-600 rounded-full flex items-center justify-center">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 max-w-[85%]">
                          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-3 sm:p-4 shadow-sm">
                            <p className="text-xs sm:text-sm text-gray-900 dark:text-white leading-relaxed break-words">
                              {message.text}
                            </p>
                          </div>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 ml-1">
                            QwikBot
                          </p>
                        </div>
                      </>
                    )}

                    {/* Answer Message - Right side, White bubble */}
                    {message.type === 'answer' && (
                      <>
                        <div className="flex-1 max-w-[85%] flex flex-col items-end">
                          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4 shadow-sm">
                            <p className="text-xs sm:text-sm text-gray-900 dark:text-white leading-relaxed break-words">
                              {message.text}
                            </p>
                          </div>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 mr-1">
                            You
                          </p>
                        </div>
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      </>
                    )}

                    {/* System Message */}
                    {message.type === 'system' && (
                      <div className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg p-3 text-center">
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {message.text}
                        </p>
                      </div>
                    )}
                  </div>
                ))}

              {/* Current Answer Being Typed (only show after question is spoken and countdown is done) */}
              {(isRecording || currentAnswer) && currentQuestionIndex < questions.length && !isSpeaking && !showPopup && (
                <div className="flex items-start gap-3 w-full justify-end">
                  <div className="flex-1 max-w-[85%] flex flex-col items-end">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4 shadow-sm">
                      <p className="text-xs sm:text-sm text-gray-900 dark:text-white leading-relaxed break-words">
                        {currentAnswer || (isRecording ? "Listening..." : "")}
                      </p>
                      {isRecording && (
                        <div className="flex items-center gap-2 mt-2 text-gray-500 dark:text-gray-400">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                          <span className="text-[10px]">Recording...</span>
                        </div>
                      )}
                    </div>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 mr-1">
                      You
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}

              <div ref={conversationEndRef} />
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 text-center border border-gray-200 dark:border-gray-700 w-full">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                No questions generated. Please try again.
              </p>
            </div>
          )}

          {/* Get Result Button - Show after interview is completed */}
          {interviewCompleted && !analysisResult && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleGetResult}
                disabled={isAnalyzing}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 flex items-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  "Get Result"
                )}
              </button>
            </div>
          )}

          {/* Analysis Results Display */}
          {analysisResult && (
            <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700 w-full">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">
                Interview Analysis Results
              </h2>

              {/* Score Display */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300">
                    Overall Score
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {analysisResult.score || 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${analysisResult.score || 0}%` }}
                  ></div>
                </div>
              </div>

              {/* Feedback Section */}
              <div className="space-y-4">
                {analysisResult.issues && analysisResult.issues.length > 0 && (
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
                      Issues Identified
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                      {analysisResult.issues.map((issue, idx) => (
                        <li key={idx}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysisResult.improvements && analysisResult.improvements.length > 0 && (
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-green-600 dark:text-green-400 mb-2">
                      Areas for Improvement
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                      {analysisResult.improvements.map((improvement, idx) => (
                        <li key={idx}>{improvement}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysisResult.feedback && (
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Detailed Feedback
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {analysisResult.feedback}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Countdown Popup with Blur Background */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sm:p-8 max-w-md w-full text-center shadow-xl">
            <div className="mb-4">
              <div className="text-6xl sm:text-7xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {countdown}
              </div>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                Get ready to answer...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recording Status Indicator - Fixed Bottom (only show after question is spoken, countdown done, and recording started) */}
      {!showPopup && !isSpeaking && questions.length > 0 && currentQuestionIndex < questions.length && interviewStarted && isRecording && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-3 sm:p-4 z-40 shadow-lg">
          <div className="w-full text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Recording... {currentAnswer ? "Answer detected" : "Waiting for response..."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewQuestions;

