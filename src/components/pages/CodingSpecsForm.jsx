import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Code, ChevronLeft, MessageSquare, Briefcase, Brain, Sparkles, Clock, Award, ArrowRight } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { candidateService } from "../../services/candidateService";

const CodingSpecsForm = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const questionTypes = [
    {
      id: "communication",
      label: "Communication",
      icon: MessageSquare,
      description: "Practice communication and soft skills interview questions",
      color: "blue",
      questionType: "COMMUNICATION"
    },
    {
      id: "position",
      label: "Position Specified",
      icon: Briefcase,
      description: "Generate questions specific to job positions and roles",
      color: "purple",
      questionType: "POSITION_SPECIFIC"
    },
    {
      id: "aptitude",
      label: "Aptitude",
      icon: Brain,
      description: "Practice aptitude and reasoning questions",
      color: "green",
      questionType: "APTITUDE"
    },
    {
      id: "coding",
      label: "Coding",
      icon: Code,
      description: "Generate coding problems and practice programming",
      color: "orange",
      questionType: "CODING"
    }
  ];

  useEffect(() => {
    loadRecentActivities();
  }, []);

  const loadRecentActivities = async () => {
    try {
      setLoading(true);
      const data = await candidateService.getRecentActivities();
      setActivities(data || []);
    } catch (error) {
      console.error("Error loading recent activities:", error);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBoxClick = (questionType) => {
    if (questionType === "CODING") {
      navigate("/practice/ai/form");
    } else {
      navigate("/practice/ai/interview", { state: { questionType } });
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hr ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto animate-fade-in space-y-4 pb-10 relative">
      {/* Background Tech Pattern */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(#4C4CFF 0.5px, transparent 0.5px), radial-gradient(#4C4CFF 0.5px, #f8f9fd 0.5px)', backgroundSize: '20px 20px' }}>
      </div>
      {/* Top Bar with Back Button */}
      <div className="flex items-center gap-4 mb-1">
        <button
          onClick={() => navigate("/practice")}
          className="p-2 hover:bg-white rounded-xl shadow-sm border border-gray-100 transition-all text-gray-400 hover:text-[#4C4CFF]"
        >
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-black text-[#1a1a1a] tracking-tight uppercase">AI Generator</h1>
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Generative Practice Round</p>
        </div>
      </div>

      {/* Category Cards - Interactive Premium Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {questionTypes.map((type) => {
          const Icon = type.icon;
          return (
            <div
              key={type.id}
              onClick={() => handleBoxClick(type.questionType)}
              className="bg-white rounded-[24px] p-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-gray-50 flex items-center gap-6 transition-all duration-500 group cursor-pointer hover:scale-[1.03] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] relative overflow-hidden"
            >
              {/* Background Glow Effect on Hover */}
              <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-3xl
                ${type.color === 'blue' ? 'bg-blue-600' : ''}
                ${type.color === 'purple' ? 'bg-purple-600' : ''}
                ${type.color === 'green' ? 'bg-green-600' : ''}
                ${type.color === 'orange' ? 'bg-orange-600' : ''}
              `}></div>

              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110
                ${type.color === 'blue' ? 'bg-blue-50 text-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : ''}
                ${type.color === 'purple' ? 'bg-purple-50 text-purple-600 shadow-[0_0_20px_rgba(147,51,234,0.1)]' : ''}
                ${type.color === 'green' ? 'bg-green-50 text-green-600 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : ''}
                ${type.color === 'orange' ? 'bg-orange-50 text-orange-600 shadow-[0_0_20px_rgba(249,115,22,0.1)]' : ''}
              `}>
                <Icon size={26} strokeWidth={2.5} />
              </div>

              <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                <h3 className="text-[15px] font-black text-[#1a1a1a] tracking-tight truncate uppercase leading-none">{type.label}</h3>
                <p className="text-[10px] font-bold text-gray-400 leading-relaxed line-clamp-2 max-w-[90%]">
                  {type.description}
                </p>
              </div>

              {/* Action Arrow */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-gray-300 transition-all duration-500 group-hover:bg-[#4C4CFF] group-hover:text-white group-hover:translate-x-1">
                <ArrowRight size={16} strokeWidth={3} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activities Section */}
      {!loading && (
        <div className="space-y-4 pt-4">
          <div>
            <h2 className="text-lg font-black text-[#1a1a1a] tracking-tight uppercase">Recent Activities</h2>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Your last 10 generative sessions</p>
          </div>

          <div className="bg-white rounded-[20px] shadow-[0_4px_25px_rgba(0,0,0,0.02)] border border-gray-50 overflow-hidden">
            {activities.length > 0 ? (
              <div className="divide-y divide-gray-50">
                {activities.map((activity, index) => (
                  <div
                    key={activity.id || index}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 hover:bg-gray-50/50 transition-colors group"
                  >
                    <div className="flex-shrink-0 w-40">
                      <span className="text-[10px] font-black text-[#1a1a1a] uppercase tracking-widest block">
                        {activity.roundType || activity.type || "Activity"}
                      </span>
                      {activity.difficulty && activity.difficulty !== "N/A" && (
                        <span className="text-[9px] font-bold text-[#4C4CFF] bg-indigo-50 px-2 py-0.5 rounded-md inline-block mt-1">
                          {activity.difficulty}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 flex flex-wrap items-center gap-6">
                      {activity.duration && activity.duration !== "N/A" && (
                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                          <Clock size={12} className="text-gray-300" />
                          <span>{activity.duration}</span>
                        </div>
                      )}
                      {activity.score && activity.score !== "N/A" && (
                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                          <Award size={12} className="text-gray-300" />
                          <span>{activity.score}</span>
                        </div>
                      )}
                      <div className="ml-auto flex items-center gap-2 text-[9px] font-black text-gray-300 group-hover:text-gray-400">
                        {formatTimestamp(activity.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-16 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 text-gray-200">
                  <Sparkles size={32} />
                </div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-1">No activities yet</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest max-w-[200px] leading-relaxed">
                  Start your first generative session to see your history here
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodingSpecsForm;

