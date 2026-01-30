import React, { useState, useEffect, useMemo, useContext } from "react";
import {
  Briefcase,
  FileText,
  Users,
  Video,
  Award,
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  X,
  MoreVertical,
  Plus,
  Eye,
  ArrowRight,
  Download,
  Edit2,
  Trash2,
  ChevronLeft,
  Calendar as CalendarIcon,
  Play,
  StickyNote
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import aiResumeImg from "../../assets/ai_resume.png";
import { getCandidateData } from "../../utils/candidateUtils";
import { fetchProfile } from "../../store/slices/profileSlice";
import { fetchAllDashboardData } from "../../store/slices/dashboardSlice";
import { fetchTodaysQuiz, submitQuizAnswer } from "../../store/slices/dailyQuizSlice";
import { trendingSkillsService } from "../../services/trendingSkillsService";
import { candidateService } from "../../services/candidateService";
import { NotificationContext } from "./Dashboard";

/**
 * Service Continuity Card Component - Shows expiry date and days remaining based on payment
 */
const ServiceContinuityCard = ({ candidateData }) => {
  const serviceContinuity = useMemo(() => {
    if (!candidateData) {
      return {
        daysRemaining: 0,
        expiryDate: null,
        expiryDateFormatted: null,
        percentage: 0,
        status: "no-data",
        statusText: "N/A",
        displayText: "N/A"
      };
    }

    // Handle response wrapped in "candidate" key (from /auth/me API)
    const data = candidateData.candidate || candidateData;
    const registrationPaid = data.registrationPaid || data.subscribed;
    const createdAt = data.createdAt;

    if (!createdAt) {
      return {
        daysRemaining: 0,
        expiryDate: null,
        expiryDateFormatted: null,
        percentage: 0,
        status: "no-data",
        statusText: "Registration Date Not Available",
        displayText: "N/A"
      };
    }

    if (!registrationPaid) {
      // No payment - show days pending payment
      try {
        const createdDate = new Date(createdAt);
        const now = new Date();
        const daysPending = Math.floor((now - createdDate) / (1000 * 60 * 60 * 24));
        
        return {
          daysRemaining: daysPending,
          expiryDate: null,
          expiryDateFormatted: null,
          percentage: 0,
          status: "pending",
          statusText: "Payment Pending",
          displayText: `${daysPending} Days`
        };
      } catch (e) {
        return {
          daysRemaining: 0,
          expiryDate: null,
          expiryDateFormatted: null,
          percentage: 0,
          status: "no-data",
          statusText: "Invalid Date",
          displayText: "N/A"
        };
      }
    }

    // Payment successful - calculate expiry (1 month from registration date)
    try {
      const createdDate = new Date(createdAt);
      const expiryDate = new Date(createdDate);
      expiryDate.setMonth(expiryDate.getMonth() + 1); // Add 1 month
      
      const now = new Date();
      const daysElapsed = Math.floor((now - createdDate) / (1000 * 60 * 60 * 24));
      const daysRemaining = Math.floor((expiryDate - now) / (1000 * 60 * 60 * 24));
      
      // Calculate percentage based on how much of the month has passed (0-100%)
      const percentage = Math.min(Math.max((daysElapsed / 30) * 100, 0), 100);
      
      // Format expiry date for display
      const expiryDateFormatted = expiryDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
      
      let status = "active";
      let statusText = "";
      let displayText = "";
      
      if (daysRemaining < 0) {
        // Expired
        status = "expired";
        statusText = `Expired ${Math.abs(daysRemaining)} days ago`;
        displayText = `${Math.abs(daysRemaining)}`;
      } else if (daysRemaining <= 7) {
        // Warning - expiring soon
        status = "warning";
        statusText = `${daysRemaining} Days Remaining`;
        displayText = `${daysRemaining}`;
      } else {
        // Active
        status = "active";
        statusText = `${daysRemaining} Days Remaining`;
        displayText = `${daysRemaining}`;
      }

      return {
        daysRemaining,
        expiryDate: expiryDate.toISOString(),
        expiryDateFormatted,
        percentage: Math.round(percentage),
        status,
        statusText,
        displayText
      };
    } catch (e) {
      console.error("Error calculating service continuity:", e);
      return {
        daysRemaining: 0,
        expiryDate: null,
        expiryDateFormatted: null,
        percentage: 0,
        status: "no-data",
        statusText: "Calculation Error",
        displayText: "N/A"
      };
    }
  }, [candidateData]);

  const getStatusColor = (status) => {
    switch (status) {
      case "expired":
        return "text-red-500";
      case "warning":
        return "text-orange-500";
      case "active":
        return "text-[#1a1a1a]";
      case "pending":
        return "text-orange-500";
      default:
        return "text-gray-400";
    }
  };

  const getProgressBarColor = (status) => {
    switch (status) {
      case "expired":
        return "bg-red-500";
      case "warning":
        return "bg-orange-500";
      case "active":
        return "bg-[#4C4CFF]";
      case "pending":
        return "bg-gray-300";
      default:
        return "bg-gray-300";
    }
  };

  const getLabelText = (status) => {
    switch (status) {
      case "pending":
        return "Pending Payment";
      case "expired":
        return "Service Expired";
      case "warning":
        return "Expiring Soon";
      case "active":
        return "Days Remaining";
      default:
        return "N/A";
    }
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.08)] border border-gray-50 flex flex-col items-center justify-center text-center">
      <h2 className="text-sm font-bold text-[#1a1a1a] mb-6">Service Continuity</h2>
      <div className="space-y-1 mb-2">
        <p className={`text-3xl font-black tracking-tight ${getStatusColor(serviceContinuity.status)}`}>
          {serviceContinuity.displayText}
        </p>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          {getLabelText(serviceContinuity.status)}
        </p>
        {serviceContinuity.expiryDateFormatted && (
          <p className="text-[9px] font-bold text-gray-500 mt-2">
            Expires: {serviceContinuity.expiryDateFormatted}
          </p>
        )}
      </div>
      {serviceContinuity.status !== "pending" && serviceContinuity.status !== "no-data" && (
        <div className="mt-6 w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${getProgressBarColor(serviceContinuity.status)}`}
            style={{ width: `${Math.min(Math.max(serviceContinuity.percentage, 0), 100)}%` }}
          ></div>
        </div>
      )}
      {serviceContinuity.status !== "no-data" && serviceContinuity.statusText && (
        <p className={`text-[9px] font-bold mt-3 ${getStatusColor(serviceContinuity.status)}`}>
          {serviceContinuity.statusText}
        </p>
      )}
    </div>
  );
};

const DashboardContent = ({ email }) => {
  const dispatch = useDispatch();
  const { markAsRead, notifications } = useContext(NotificationContext) || { markAsRead: () => {}, notifications: [] };
  
  // Get candidate profile from Redux store (updated via /auth/me API)
  // Note: /auth/me returns { candidate: { ... } }, so profile.data will be { candidate: { ... } }
  const profile = useSelector((state) => state.profile?.data || null);
  
  // Get dashboard data from Redux store (cached for 30 seconds)
  const dashboardData = useSelector((state) => state.dashboard || {});
  const dashboardStats = dashboardData.stats || {
    jobsCount: 0,
    appliedCount: 0,
    notesCount: 0,
    mockTestsCount: 0,
    eventsCount: 0
  };
  const unreadCount = dashboardData.unreadCount || 0;
  const recentActivities = dashboardData.recentActivities || [];
  const isLoading = dashboardData.loading || false;
  
  // Get candidate data from localStorage (for reference only - not used in API calls)
  // Backend gets candidate_id from authentication automatically
  // Handle both formats: { candidate: { ... } } from API or direct object from localStorage
  const candidateData = profile || getCandidateData();

  // Fetch profile data on mount (if not already in Redux store)
  useEffect(() => {
    if (!profile) {
      dispatch(fetchProfile());
    }
  }, [dispatch, profile]);

  // OPTIMIZED: Use Redux with caching - fetch on mount if needed
  // The fetchAllDashboardData thunk has a condition that prevents dispatch if cache is fresh (30 seconds)
  // This means when you navigate back to dashboard, it won't reload if data is less than 30 seconds old
  useEffect(() => {
    // Always try to dispatch - the thunk's condition will prevent actual API call if cache is fresh
    // This ensures data is available immediately from cache if it exists
    dispatch(fetchAllDashboardData(false)); // false = don't force refresh, use cache if available
  }, [dispatch]); // Only run once on mount


  const stats = [
    { label: "Jobs", value: dashboardStats.jobsCount || "0", icon: Briefcase, color: "blue", trend: "+5%" },
    { label: "Applied", value: dashboardStats.appliedCount || "0", icon: FileText, color: "violet", trend: "+25%" },
    { label: "Notes", value: dashboardStats.notesCount || "0", icon: StickyNote, color: "pink", trend: "+10%" },
    { label: "Events", value: "0", icon: CalendarIcon, color: "orange", trend: "+0%" },
    { label: "Mock Test", value: dashboardStats.mockTestsCount || "0", icon: Video, color: "emerald", trend: "+8%" },
  ];


  // Get daily quiz from Redux store (cached)
  const dailyQuizState = useSelector((state) => state.dailyQuiz || {});
  const quizQuestions = dailyQuizState.questions || [];
  const quizLoading = dailyQuizState.loading || false;
  const quizSubmitting = dailyQuizState.submitting || false;
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);
  const [dailyCountdown, setDailyCountdown] = useState({ h: 0, m: 0, s: 0 });
  const [showQuizView, setShowQuizView] = useState(false);
  const [viewQuizIndex, setViewQuizIndex] = useState(0);

  // Calculate quiz completion status and score
  // Ensure only first 5 questions are shown (same for all candidates)
  const displayedQuestions = Array.isArray(quizQuestions) ? quizQuestions.slice(0, 5) : [];
  const allQuestionsAnswered = displayedQuestions.length > 0 && displayedQuestions.every(q => q && q.answered);
  const quizScore = displayedQuestions.filter(q => q && q.answered && q.isCorrect).length;
  const totalQuestions = displayedQuestions.length;

  // Reset viewQuizIndex when modal opens/closes or when questions change
  useEffect(() => {
    if (showQuizView && displayedQuestions.length > 0) {
      if (viewQuizIndex >= displayedQuestions.length) {
        setViewQuizIndex(0);
      }
    }
  }, [showQuizView, displayedQuestions.length, viewQuizIndex]);

  // Trending Skills state
  const [trendingSkills, setTrendingSkills] = useState({
    itSkills: [],
    nonItSkills: [],
    updatedAt: "",
    loading: true,
    error: null
  });

  // Assigned Tests state
  const [assignedTests, setAssignedTests] = useState({
    tests: [],
    loading: true,
    error: null
  });
  const [showTestsModal, setShowTestsModal] = useState(false);

  // Fetch daily quiz on mount
  useEffect(() => {
    dispatch(fetchTodaysQuiz(false));
  }, [dispatch]);

  // Fetch trending skills on mount
  useEffect(() => {
    const loadTrendingSkills = async () => {
      try {
        setTrendingSkills(prev => ({ ...prev, loading: true, error: null }));
        const data = await trendingSkillsService.getTodaysTrendingSkills();
        setTrendingSkills({
          itSkills: data?.itSkills || [],
          nonItSkills: data?.nonItSkills || [],
          updatedAt: data?.updatedAt || "Updated Daily",
          loading: false,
          error: null
        });
      } catch (error) {
        console.error("Error fetching trending skills:", error);
        setTrendingSkills(prev => ({ 
          ...prev, 
          loading: false, 
          error: "Failed to load trending skills" 
        }));
      }
    };
    
    loadTrendingSkills();
  }, []); // Only fetch once on mount (skills update daily via cron job)

  // Fetch assigned tests on mount
  useEffect(() => {
    const loadAssignedTests = async () => {
      try {
        setAssignedTests(prev => ({ ...prev, loading: true, error: null }));
        const data = await candidateService.getAssignedTests();
        setAssignedTests({
          tests: data?.tests || [],
          loading: false,
          error: null
        });
      } catch (error) {
        console.error("Error fetching assigned tests:", error);
        setAssignedTests(prev => ({ 
          ...prev, 
          loading: false, 
          error: "Failed to load assigned tests" 
        }));
      }
    };
    
    loadAssignedTests();
  }, []); // Fetch on mount and when tests might be updated

  // Reset active quiz index when questions change or if current question is out of bounds
  useEffect(() => {
    if (displayedQuestions.length > 0 && activeQuizIndex >= displayedQuestions.length) {
      setActiveQuizIndex(0);
    }
  }, [displayedQuestions.length, activeQuizIndex]);

  // Update countdown to next quiz (midnight)
  useEffect(() => {
    const updateDaily = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      midnight.setMinutes(0);
      midnight.setSeconds(0);
      midnight.setMilliseconds(0);
      const diff = midnight - now;
      setDailyCountdown({
        h: Math.floor(diff / (1000 * 60 * 60)),
        m: Math.floor((diff / (1000 * 60)) % 60),
        s: Math.floor((diff / 1000) % 60)
      });
    };

    updateDaily();
    const dailyTimer = setInterval(updateDaily, 1000);

    return () => {
      clearInterval(dailyTimer);
    };
  }, []);

  // Handle quiz answer selection
  const handleQuizAnswerSelect = async (questionId, selectedIndex) => {
    const question = displayedQuestions.find(q => q && q.questionId === questionId);
    
    // Don't allow selection if already answered
    if (question?.answered || quizSubmitting) {
      return;
    }

    try {
      await dispatch(submitQuizAnswer({ questionId, selectedAnswerIndex: selectedIndex })).unwrap();
    } catch (error) {
      console.error("Error submitting quiz answer:", error);
    }
  };

  // Format test date/time for display
  const formatTestDate = (dateString) => {
    if (!dateString) return "Not scheduled";
    try {
      const date = new Date(dateString);
      const now = new Date();
      const isToday = date.toDateString() === now.toDateString();
      
      if (isToday) {
        return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      } else {
        return date.toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
      }
    } catch (e) {
      return "Not scheduled";
    }
  };

  // Get first test for display (if only one) or count
  const firstTest = assignedTests.tests.length > 0 ? assignedTests.tests[0] : null;
  const testsCount = assignedTests.tests.length;

  const aiAnalysisRounds = [
    { label: "Communication", percentage: 85, color: "bg-[#4C4CFF]" },
    { label: "Position", percentage: 72, color: "bg-[#FF4FB1]" },
    { label: "Coding", percentage: 90, color: "bg-[#00D1A0]" },
    { label: "Aptitude", percentage: 78, color: "bg-[#FF7A00]" }
  ];


  const latestJobs = [
    { title: "Frontend Developer", company: "Google", location: "Mountain View, CA", type: "Full Time", logo: "https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" },
    { title: "Product Designer", company: "Apple", location: "Cupertino, CA", type: "Remote", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { title: "Full Stack Engineer", company: "Meta", location: "Menlo Park, CA", type: "Contract", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
    { title: "Backend Architect", company: "Amazon", location: "Seattle, WA", type: "Full Time", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { title: "UI/UX Engineer", company: "Netflix", location: "Los Gatos, CA", type: "Hybrid", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" }
  ];

  // Show loading skeleton while fetching data - always show during initial load
  // If we have cached data, show it with loading overlay indicators
  const isInitialLoad = !dashboardData.lastFetchTime;
  const hasCachedData = dashboardStats && dashboardStats.jobsCount !== undefined;
  const showLoadingSkeleton = isLoading && isInitialLoad && !hasCachedData;

  if (showLoadingSkeleton) {
    return (
      <div className="w-full max-w-full px-2 sm:px-3 lg:px-4 mx-auto animate-fade-in space-y-3 pb-6">
        {/* Loading skeleton for stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 p-5 shadow-[0_0_20px_rgba(0,0,0,0.08)] animate-pulse">
              <div className="h-3 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div className="h-6 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>

        {/* Loading skeleton for Row 2: Performance & Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Overall Performance Skeleton */}
          <div className="lg:col-span-3 bg-gray-50 rounded-[16px] p-8 shadow-[0_0_20px_rgba(0,0,0,0.08)] border border-gray-50 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-2/3 mb-6"></div>
            <div className="w-48 h-48 mx-auto bg-gray-200 rounded-full mb-8"></div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                  <div className="flex flex-col gap-1">
                    <div className="h-3 bg-gray-200 rounded w-10"></div>
                    <div className="h-2 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service Continuity & Resume Score Skeleton */}
          <div className="lg:col-span-2 space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.08)] border border-gray-50 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
                <div className="h-12 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
                <div className="h-2 bg-gray-200 rounded w-2/3 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Loading skeleton for Row 3: Analysis, Quiz, Mock Test */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* AI Analysis Skeleton */}
          <div className="lg:col-span-5 bg-gray-50 rounded-[16px] p-8 shadow-[0_0_20px_rgba(0,0,0,0.08)] border border-gray-50 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="space-y-7">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Quiz Skeleton */}
          <div className="lg:col-span-4 bg-gray-50 rounded-xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.08)] border border-gray-50 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>

          {/* Mock Test Skeleton */}
          <div className="lg:col-span-3 bg-gray-50 rounded-xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.08)] border border-gray-50 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="h-40 bg-gray-200 rounded-3xl"></div>
          </div>
        </div>

        {/* Loading skeleton for Row 4: Jobs & Resume Builder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Latest Jobs Skeleton */}
          <div className="lg:col-span-9 bg-gray-50 rounded-[16px] p-8 shadow-[0_0_20px_rgba(0,0,0,0.08)] border border-gray-50 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-[24px] p-5 h-48"></div>
              ))}
            </div>
          </div>

          {/* AI Resume Promo Skeleton */}
          <div className="lg:col-span-3 bg-gray-50 rounded-[16px] p-4 shadow-[0_0_20px_rgba(0,0,0,0.08)] border border-gray-50 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded-[24px]"></div>
          </div>
        </div>

        {/* Loading spinner with overlay */}
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4 min-w-[200px]">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#4C4CFF] border-t-transparent"></div>
            <p className="text-base font-semibold text-gray-700">Loading dashboard...</p>
            <p className="text-sm text-gray-500">Fetching your data</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full px-2 sm:px-3 lg:px-4 mx-auto animate-fade-in space-y-3 pb-6 relative">
      
      {/* Loading overlay indicator when refreshing (has cached data but still loading) */}
      {isLoading && hasCachedData && (
        <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-xl p-4 flex items-center gap-3 border border-gray-200 animate-fade-in">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#4C4CFF] border-t-transparent"></div>
          <p className="text-sm font-medium text-gray-700">Refreshing data...</p>
        </div>
      )}

      {/* Row 1: Summary Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 p-5 flex items-center justify-between shadow-[0_0_20px_rgba(0,0,0,0.08)] group hover:scale-[1.01] transition-transform duration-300 relative">
            {/* Loading indicator on individual card when refreshing */}
            {isLoading && hasCachedData && (
              <div className="absolute top-2 right-2 z-10">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#4C4CFF] border-t-transparent"></div>
              </div>
            )}
            <div className="flex-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{stat.label}</p>
              <p className="text-2xl font-black text-[#1a1a1a] tracking-tight">
                {isLoading && !hasCachedData ? (
                  <span className="inline-block w-12 h-8 bg-gray-200 rounded animate-pulse"></span>
                ) : (
                  stat.value
                )}
              </p>
              <div className={`flex items-center gap-1 mt-2 text-[9px] font-bold ${stat.trend.startsWith('+') ? 'text-emerald-500 bg-emerald-50' : 'text-red-500 bg-red-50'} px-2 py-0.5 rounded-full w-fit`}>
                <TrendingUp size={10} /> {stat.trend}
              </div>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner shrink-0
              ${stat.color === 'blue' ? 'bg-blue-50 text-blue-600' : ''}
              ${stat.color === 'pink' ? 'bg-pink-50 text-pink-600' : ''}
              ${stat.color === 'violet' ? 'bg-violet-50 text-violet-600' : ''}
              ${stat.color === 'orange' ? 'bg-orange-50 text-orange-600' : ''}
              ${stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : ''}
              ${stat.color === 'red' ? 'bg-red-50 text-red-600' : ''}
            `}>
              {isLoading && !hasCachedData ? (
                <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                <stat.icon size={22} />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: Job Ads & Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Overall Performance Donut Chart */}
        <div className="lg:col-span-3 bg-gray-50 rounded-[16px] p-8 shadow-[0_0_20px_rgba(0,0,0,0.08)] border border-gray-50 flex flex-col justify-between">
          <h2 className="text-lg font-bold text-[#1a1a1a] mb-6">Overall Performance</h2>
          <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
            {/* Donut Chart SVG */}
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="96" cy="96" r="70" fill="transparent" stroke="#F3F4F6" strokeWidth="20" />
              <circle cx="96" cy="96" r="70" fill="transparent" stroke="#4C4CFF" strokeWidth="20" strokeDasharray="340 440" strokeLinecap="round" />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-black text-[#1a1a1a]">78%</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Avg. Score</span>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-y-4 gap-x-2">
            {[
              { label: "Skill Match", val: "85%", col: "bg-[#4C4CFF]" },
              { label: "Readiness", val: "92%", col: "bg-[#FF4FB1]" },
              { label: "Visibility", val: "64%", col: "bg-[#00D1A0]" },
              { label: "Technical", val: "78%", col: "bg-[#FF7A00]" },
              { label: "Aptitude", val: "88%", col: "bg-[#8B5CF6]" },
              { label: "Soft Skills", val: "72%", col: "bg-[#3B82F6]" }
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${m.col}`}></div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-[#1a1a1a] leading-none">{m.val}</span>
                  <span className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter mt-1">{m.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Account & Video Cards */}
        <div className="lg:col-span-2 space-y-4">
          <ServiceContinuityCard candidateData={candidateData} />

          <div className="bg-gray-50 rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.08)] border border-gray-50 flex flex-col items-center justify-center text-center">
            <h2 className="text-sm font-bold text-[#1a1a1a] mb-6">Resume Score</h2>
            <div className="relative w-24 h-24 mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="40" fill="transparent" stroke="#F3F4F6" strokeWidth="8" />
                <circle cx="48" cy="48" r="40" fill="transparent" stroke="#00D1A0" strokeWidth="8" strokeDasharray="200 251" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-black text-[#1a1a1a]">84</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Latest Profile Score</p>
              <div className="flex items-center gap-1.5 justify-center text-[#00D1A0]">
                <CheckCircle2 size={12} />
                <span className="text-[10px] font-bold uppercase tracking-tight">High Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Experience Levels, Quizzes & Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Ai Analysis (formerly Experience Levels) */}
        <div className="lg:col-span-5 bg-gray-50 rounded-[16px] p-8 shadow-[0_0_20px_rgba(0,0,0,0.08)] border border-gray-50">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-bold text-[#1a1a1a]">Ai Analysis</h2>
            <div className="px-2 py-0.5 bg-indigo-50 text-[#4C4CFF] text-[8px] font-bold rounded-full uppercase tracking-tighter">Verified</div>
          </div>
          <p className="text-[10px] font-bold text-gray-400 mb-8 lowercase tracking-tight">Performance across different assessment rounds</p>
          <div className="space-y-7">
            {aiAnalysisRounds.map((round, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-[#1a1a1a]">{round.label}</span>
                  <span className="text-[11px] font-bold text-gray-400">{round.percentage}%</span>
                </div>
                <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${round.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${round.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz for the Day (Dynamic) */}
        <div className="lg:col-span-4 bg-gray-50 rounded-xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.08)] border border-gray-50 flex flex-col h-full overflow-hidden min-h-[400px]">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-[#1a1a1a]">Quiz for the Day</h2>
              {quizLoading && (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#4C4CFF] border-t-transparent"></div>
              )}
            </div>
            <div className="flex items-center gap-3">
              {allQuestionsAnswered && (
                <button
                  onClick={() => {
                    setShowQuizView(true);
                    setViewQuizIndex(0);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#4C4CFF] hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  <Eye size={14} />
                  View
                </button>
              )}
              {displayedQuestions.length > 0 && !allQuestionsAnswered && (
                <div className="flex gap-1.5">
                  {displayedQuestions.map((q, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        i === activeQuizIndex 
                          ? 'w-4 bg-[#4C4CFF]' 
                          : q?.answered 
                          ? 'w-2 bg-green-400' 
                          : 'w-1 bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {quizLoading && quizQuestions.length === 0 ? (
            <div className="flex-1 flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4C4CFF] mx-auto mb-4"></div>
                <p className="text-sm text-gray-500">Loading quiz questions...</p>
              </div>
            </div>
          ) : displayedQuestions.length === 0 ? (
            <div className="flex-1 flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <p className="text-sm text-gray-500">No quiz available today. Check back tomorrow!</p>
              </div>
            </div>
          ) : allQuestionsAnswered ? (
            /* Show Score Summary when all questions are answered */
            <div className="flex-1 flex flex-col items-center justify-center min-h-[300px]">
              <div className="text-center w-full">
                <div className="mb-6">
                  <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="56" fill="transparent" stroke="#E5E7EB" strokeWidth="8" />
                      <circle 
                        cx="64" 
                        cy="64" 
                        r="56" 
                        fill="transparent" 
                        stroke="#10B981" 
                        strokeWidth="8" 
                        strokeDasharray={`${(quizScore / totalQuestions) * 351.86} 351.86`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-black text-[#1a1a1a]">{quizScore}</span>
                      <span className="text-sm font-bold text-gray-400">/{totalQuestions}</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">
                  {quizScore === totalQuestions ? "Perfect Score! 🎉" : quizScore >= totalQuestions * 0.7 ? "Well Done! 👍" : "Keep Practicing! 💪"}
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  You answered {quizScore} out of {totalQuestions} questions correctly
                </p>
                <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <Clock size={12} />
                  <span>New Questions in</span>
                  <span className="text-[#4C4CFF] tabular-nums">
                    {dailyCountdown.h}h {dailyCountdown.m}m {dailyCountdown.s}s
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Show Questions when not all answered */
            <>
              <p className="text-[10px] font-bold text-gray-400 mb-6 uppercase tracking-widest">
                {displayedQuestions[activeQuizIndex]?.category || "GENERAL"}
              </p>

              <div className="flex-1 flex flex-col justify-between min-h-[300px]">
                <div className="animate-fade-in transition-all duration-500 transform py-2">
                  <h3 className="text-lg font-bold text-[#1a1a1a] mb-6 leading-tight">
                    {displayedQuestions[activeQuizIndex]?.question || "Loading question..."}
                  </h3>

                  <div className="flex flex-col gap-2">
                    {(displayedQuestions[activeQuizIndex]?.options || []).map((option, idx) => {
                      const question = displayedQuestions[activeQuizIndex];
                      const isAnswered = question?.answered;
                      const isSelected = question?.selectedAnswerIndex === idx;
                      const isCorrect = question?.isCorrect && isSelected;
                      const isWrong = isSelected && !isCorrect;
                      const showCorrect = isAnswered && question?.correctAnswerIndex === idx;
                      
                      return (
                        <button
                          key={idx}
                          onClick={() => !isAnswered && handleQuizAnswerSelect(question.questionId, idx)}
                          disabled={isAnswered || quizSubmitting}
                          className={`group flex items-center gap-3 py-3 px-3 rounded-lg transition-all text-left ${
                            isAnswered 
                              ? 'cursor-not-allowed' 
                              : 'cursor-pointer hover:bg-gray-100'
                          } ${
                            isCorrect || showCorrect 
                              ? 'bg-green-50 border-2 border-green-400' 
                              : isWrong 
                              ? 'bg-red-50 border-2 border-red-400' 
                              : 'border-2 border-transparent'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isCorrect || showCorrect
                              ? 'border-green-500 bg-green-500'
                              : isWrong
                              ? 'border-red-500 bg-red-500'
                              : isSelected && !isAnswered
                              ? 'border-[#4C4CFF] bg-[#4C4CFF]'
                              : 'border-gray-200 group-hover:border-[#4C4CFF]'
                          }`}>
                            {isCorrect || showCorrect ? (
                              <CheckCircle2 size={12} className="text-white" />
                            ) : isWrong ? (
                              <XCircle size={12} className="text-white" />
                            ) : isSelected && !isAnswered ? (
                              <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                            ) : (
                              <div className="w-2.5 h-2.5 rounded-full bg-transparent group-hover:bg-[#4C4CFF]"></div>
                            )}
                          </div>
                          <span className={`text-xs font-bold flex-1 ${
                            isCorrect || showCorrect
                              ? 'text-green-700'
                              : isWrong
                              ? 'text-red-700'
                              : 'text-[#4c4c4c] group-hover:text-[#1a1a1a]'
                          }`}>
                            {option}
                          </span>
                          {showCorrect && !isSelected && (
                            <span className="text-[10px] font-bold text-green-600">Correct</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {displayedQuestions[activeQuizIndex]?.answered && displayedQuestions[activeQuizIndex]?.explanation && (
                    <div className={`mt-4 p-3 rounded-lg ${
                      displayedQuestions[activeQuizIndex]?.isCorrect ? 'bg-green-50' : 'bg-red-50'
                    }`}>
                      <p className="text-xs font-semibold mb-1">
                        {displayedQuestions[activeQuizIndex]?.isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                      </p>
                      <p className="text-xs text-gray-700">
                        {displayedQuestions[activeQuizIndex]?.explanation || ""}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-50">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">New Questions in</span>
                    <span className="text-[10px] font-black text-[#4C4CFF] tabular-nums">
                      {dailyCountdown.h}h {dailyCountdown.m}m {dailyCountdown.s}s
                    </span>
                  </div>
                  {displayedQuestions.length > 1 && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveQuizIndex((prev) => (prev > 0 ? prev - 1 : displayedQuestions.length - 1))}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        disabled={quizSubmitting}
                      >
                        <ChevronLeft size={16} className="text-gray-600" />
                      </button>
                      <button
                        onClick={() => setActiveQuizIndex((prev) => (prev < displayedQuestions.length - 1 ? prev + 1 : 0))}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        disabled={quizSubmitting}
                      >
                        <ChevronRight size={16} className="text-gray-600" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Quiz View Modal */}
          {showQuizView && allQuestionsAnswered && displayedQuestions.length > 0 && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
              <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
                  <h2 className="text-lg sm:text-xl font-bold text-[#1a1a1a]">Quiz Review</h2>
                  <button
                    onClick={() => setShowQuizView(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={20} className="text-gray-600" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                  <div className="mb-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Question {viewQuizIndex + 1} of {totalQuestions} • {displayedQuestions[viewQuizIndex]?.category || "GENERAL"}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-base sm:text-lg font-bold text-[#1a1a1a] mb-6 leading-tight">
                      {displayedQuestions[viewQuizIndex]?.question || ""}
                    </h3>

                    <div className="flex flex-col gap-2">
                      {(displayedQuestions[viewQuizIndex]?.options || []).map((option, idx) => {
                        const question = displayedQuestions[viewQuizIndex];
                        const isSelected = question?.selectedAnswerIndex === idx;
                        const isCorrect = question?.isCorrect && isSelected;
                        const isWrong = isSelected && !isCorrect;
                        const showCorrect = question?.correctAnswerIndex === idx;
                        
                        return (
                          <div
                            key={idx}
                            className={`flex items-center gap-3 py-3 px-3 rounded-lg ${
                              isCorrect || showCorrect 
                                ? 'bg-green-50 border-2 border-green-400' 
                                : isWrong 
                                ? 'bg-red-50 border-2 border-red-400' 
                                : 'border-2 border-gray-100'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              isCorrect || showCorrect
                                ? 'border-green-500 bg-green-500'
                                : isWrong
                                ? 'border-red-500 bg-red-500'
                                : showCorrect && !isSelected
                                ? 'border-green-500 bg-transparent'
                                : 'border-gray-300 bg-transparent'
                            }`}>
                              {isCorrect || showCorrect ? (
                                <CheckCircle2 size={12} className="text-white" />
                              ) : isWrong ? (
                                <XCircle size={12} className="text-white" />
                              ) : showCorrect && !isSelected ? (
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                              ) : null}
                            </div>
                            <span className={`text-xs font-bold flex-1 ${
                              isCorrect || showCorrect
                                ? 'text-green-700'
                                : isWrong
                                ? 'text-red-700'
                                : showCorrect && !isSelected
                                ? 'text-green-700'
                                : 'text-[#4c4c4c]'
                            }`}>
                              {option}
                            </span>
                            {isSelected && (
                              <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                                isCorrect ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                              }`}>
                                Your Answer
                              </span>
                            )}
                            {showCorrect && !isSelected && (
                              <span className="text-[10px] font-bold text-green-600 px-2 py-1 rounded bg-green-100">
                                Correct Answer
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {displayedQuestions[viewQuizIndex]?.explanation && (
                      <div className={`mt-4 p-4 rounded-lg ${
                        displayedQuestions[viewQuizIndex]?.isCorrect ? 'bg-green-50' : 'bg-red-50'
                      }`}>
                        <p className="text-xs font-semibold mb-2">
                          {displayedQuestions[viewQuizIndex]?.isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                        </p>
                        <p className="text-xs text-gray-700 leading-relaxed">
                          {displayedQuestions[viewQuizIndex]?.explanation || ""}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Modal Footer with Navigation */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-t border-gray-200 bg-gray-50 flex-wrap gap-3 sm:gap-4">
                  <button
                    onClick={() => setViewQuizIndex((prev) => (prev > 0 ? prev - 1 : totalQuestions - 1))}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={totalQuestions <= 1}
                  >
                    <ChevronLeft size={16} className="text-gray-600" />
                    <span className="text-xs sm:text-sm font-bold text-gray-600 hidden sm:inline">Previous</span>
                  </button>

                  <div className="flex gap-1.5 flex-1 justify-center min-w-0">
                    {displayedQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => setViewQuizIndex(i)}
                        className={`h-2 rounded-full transition-all duration-300 flex-shrink-0 ${
                          i === viewQuizIndex
                            ? 'w-6 bg-[#4C4CFF]'
                            : q?.isCorrect
                            ? 'w-2 bg-green-400 hover:bg-green-500'
                            : 'w-2 bg-red-400 hover:bg-red-500'
                        }`}
                        aria-label={`Go to question ${i + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => setViewQuizIndex((prev) => (prev < totalQuestions - 1 ? prev + 1 : 0))}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={totalQuestions <= 1}
                  >
                    <span className="text-xs sm:text-sm font-bold text-gray-600 hidden sm:inline">Next</span>
                    <ChevronRight size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Scheduled Mock Test (formerly Calendar) */}
        <div className="lg:col-span-3 bg-gray-50 rounded-xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.08)] border border-gray-50 flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-lg font-bold text-[#1a1a1a]">Mock Test</h2>
            {testsCount > 0 && (
              <div className="px-2 py-0.5 bg-blue-50 text-[#4C4CFF] text-[8px] font-bold rounded-full uppercase tracking-tighter">
                {testsCount > 1 ? `${testsCount} Tests` : "Scheduled"}
              </div>
            )}
          </div>
          <p className="text-[10px] font-bold text-gray-400 mb-8 uppercase tracking-widest">Admin Assigned Activity</p>

          <div className="flex-1 flex flex-col">
            {assignedTests.loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4C4CFF]"></div>
              </div>
            ) : assignedTests.error ? (
              <div className="text-center py-12">
                <p className="text-xs text-gray-400">{assignedTests.error}</p>
              </div>
            ) : testsCount === 0 ? (
              <div className="text-center py-12">
                <Video size={40} className="mx-auto mb-3 text-gray-300" />
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">No Tests Assigned</p>
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 border border-gray-100 relative overflow-hidden group">
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-50">
                        <Video size={20} className="text-[#4C4CFF]" />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-black text-[#1a1a1a]">
                          {firstTest?.positionTitle || "Mock Assessment"}
                        </h4>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tight">AI PROCTORED</p>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-[#1a1a1a] mb-2 leading-tight">
                      {firstTest?.positionTitle || "Assessment"}
                    </h3>

                    {firstTest?.expectedStartDate && (
                      <div className="flex items-center gap-2 mb-6">
                        <Clock size={12} className="text-gray-400" />
                        <span className="text-[11px] font-bold text-gray-500">
                          {formatTestDate(firstTest.expectedStartDate)}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={async () => {
                          // Mark notification as read if there's an ASSESSMENT notification for this test
                          const relatedNotification = notifications.find(
                            n => n.type === 'ASSESSMENT' && n.referenceId === firstTest.positionId && (!n.isSeen && !n.read)
                          );
                          if (relatedNotification && markAsRead) {
                            await markAsRead(relatedNotification.id);
                          }
                          window.location.href = `/assessment/${firstTest.positionId}`;
                        }}
                        className="flex-1 py-4 bg-[#4C4CFF] text-white rounded-2xl font-black text-xs uppercase tracking-[2px] shadow-lg shadow-indigo-100 hover:scale-[1.02] transition-all"
                      >
                        Join Assessment
                      </button>
                      {testsCount > 1 && (
                        <button
                          onClick={() => setShowTestsModal(true)}
                          className="px-4 py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold text-xs uppercase tracking-[2px] hover:bg-gray-200 transition-all"
                        >
                          View
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Decorative Circle */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-50/50 rounded-full blur-3xl shadow-inner"></div>
                </div>
              </>
            )}
          </div>

        </div>
      </div>

      {/* Row 4: Top Candidates & Promo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Latest Jobs Updates */}
        <div className="lg:col-span-9 bg-gray-50 rounded-[16px] p-8 shadow-[0_0_20px_rgba(0,0,0,0.08)] border border-gray-50">
          <h2 className="text-lg font-bold text-[#1a1a1a]">Latest Jobs Updates</h2>
          <p className="text-[10px] font-bold text-gray-400 mb-8">Recently posted positions from top companies</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {latestJobs.map((job, i) => (
              <div key={i} className="bg-gray-50 rounded-[24px] border border-gray-50 shadow-[0_0_20px_rgba(0,0,0,0.08)] p-5 text-center flex flex-col items-center group hover:translate-y-[-4px] transition-all cursor-pointer">
                <div className="relative w-16 h-16 mb-4 flex items-center justify-center p-3 bg-gray-50 rounded-2xl group-hover:bg-white transition-colors border border-transparent group-hover:border-gray-100">
                  <img src={job.logo} alt={job.company} className="max-w-full max-h-full object-contain" />
                </div>
                <h4 className="text-[11px] font-bold text-[#1a1a1a] mb-0.5 truncate w-full">{job.title}</h4>
                <p className="text-[9px] text-gray-400 mb-4 truncate w-full font-medium">{job.company}</p>
                <div className="flex gap-1.5 mt-auto">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-500 text-[8px] font-bold rounded-md uppercase tracking-wider">{job.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Resume Promo Card */}
        <div className="lg:col-span-3 bg-gray-50 rounded-[16px] p-4 shadow-[0_0_20px_rgba(0,0,0,0.08)] border border-gray-50 flex flex-col">
          <div className="flex items-center justify-between px-2 mb-4">
            <h2 className="text-sm font-bold text-[#1a1a1a]">AI Resume Builder</h2>
            <div className="px-2 py-0.5 bg-orange-50 text-[#FF7A00] text-[8px] font-bold rounded-full uppercase tracking-tighter">New</div>
          </div>
          <div className="flex-1 rounded-[24px] overflow-hidden relative group aspect-[4/3] lg:aspect-auto">
            <img
              src={aiResumeImg}
              alt="AI Resume Templates"
              className="w-full h-full object-cover brightness-100 group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B4B]/90 via-transparent to-transparent flex flex-col justify-end p-6">
              <h3 className="text-white font-bold text-sm mb-2">Check your ATS Score</h3>
              <p className="text-white/70 text-[10px] mb-4 font-medium leading-tight">Optimized resumes for 100% higher shortlist rate.</p>
              <button
                onClick={() => window.open('https://systemmindz-rb.vercel.app/', '_blank')}
                className="w-full py-4 bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold text-[11px] rounded-xl flex items-center justify-center gap-2 hover:bg-white hover:text-[#1B1B4B] transition-all uppercase tracking-[2px]"
              >
                Build Now
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Row 5: Trending Skills - IT and Non-IT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* IT Trending Skills */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm text-gray-700">IT Trending Skills</h2>
            <span className="text-xs text-gray-500">{trendingSkills.updatedAt || "Updated Daily"}</span>
          </div>
          
          {trendingSkills.loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
            </div>
          ) : trendingSkills.error ? (
            <div className="text-center py-8">
              <p className="text-xs text-gray-400">{trendingSkills.error}</p>
            </div>
          ) : trendingSkills.itSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {trendingSkills.itSkills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1.5 bg-gray-100 text-xs text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-xs text-gray-400">No Trending Skills Available</p>
            </div>
          )}
        </div>

        {/* Non-IT Trending Skills */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm text-gray-700">Non-IT Trending Skills</h2>
            <span className="text-xs text-gray-500">{trendingSkills.updatedAt || "Updated Daily"}</span>
          </div>
          
          {trendingSkills.loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
            </div>
          ) : trendingSkills.error ? (
            <div className="text-center py-8">
              <p className="text-xs text-gray-400">{trendingSkills.error}</p>
            </div>
          ) : trendingSkills.nonItSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {trendingSkills.nonItSkills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1.5 bg-gray-100 text-xs text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-xs text-gray-400">No Trending Skills Available</p>
            </div>
          )}
        </div>
      </div>

      {/* All Tests Modal */}
      {showTestsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-[#1a1a1a]">All Assigned Tests</h2>
              <button
                onClick={() => setShowTestsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {assignedTests.tests.length > 0 ? (
                <div className="space-y-4">
                  {assignedTests.tests.map((test, index) => (
                    <div
                      key={test.id || index}
                      className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-50">
                            <Video size={20} className="text-[#4C4CFF]" />
                          </div>
                          <div>
                            <h4 className="text-[14px] font-black text-[#1a1a1a]">
                              {test.positionTitle || "Mock Assessment"}
                            </h4>
                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tight">AI PROCTORED</p>
                          </div>
                        </div>
                        {test.positionCode && (
                          <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {test.positionCode}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-[#1a1a1a] mb-4 leading-tight">
                        {test.positionTitle || "Assessment"}
                      </h3>

                      {test.expectedStartDate && (
                        <div className="flex items-center gap-2 mb-4">
                          <Clock size={12} className="text-gray-400" />
                          <span className="text-[11px] font-bold text-gray-500">
                            {formatTestDate(test.expectedStartDate)}
                          </span>
                        </div>
                      )}

                      <button
                        onClick={async () => {
                          setShowTestsModal(false);
                          // Mark notification as read if there's an ASSESSMENT notification for this test
                          const relatedNotification = notifications.find(
                            n => n.type === 'ASSESSMENT' && n.referenceId === test.positionId && (!n.isSeen && !n.read)
                          );
                          if (relatedNotification && markAsRead) {
                            await markAsRead(relatedNotification.id);
                          }
                          window.location.href = `/assessment/${test.positionId}`;
                        }}
                        className="w-full py-3 bg-[#4C4CFF] text-white rounded-xl font-bold text-xs uppercase tracking-[2px] hover:bg-[#3a3ae6] transition-all"
                      >
                        Join Assessment
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Video size={40} className="mx-auto mb-3 text-gray-300" />
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">No Tests Available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DashboardContent;
