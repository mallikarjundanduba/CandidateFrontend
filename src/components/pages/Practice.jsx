import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Code, Sparkles, Target, Star, ArrowRight } from "lucide-react";
import { fetchCodingProgress } from "../../store/slices/codingSlice";
import { fetchProfile } from "../../store/slices/profileSlice";

const Practice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get coding progress from Redux store (cached)
  const codingState = useSelector((state) => state.coding || {});
  const progress = codingState.progress || { totalStars: 0 };
  const totalStars = progress.totalStars || 0;
  const loading = codingState.loading || false;
  
  // Get profile to get candidate ID
  const profile = useSelector((state) => state.profile?.data || state.profileData?.profile);

  useEffect(() => {
    // Fetch profile if not available
    if (!profile) {
      dispatch(fetchProfile());
    }
  }, [dispatch, profile]);

  useEffect(() => {
    // Fetch coding progress once we have candidate ID
    if (profile?.id || profile?.candidateId) {
      const candidateId = profile.id || profile.candidateId;
      dispatch(fetchCodingProgress(candidateId));
    }
  }, [dispatch, profile?.id, profile?.candidateId]);

  const practiceCategories = [
    {
      title: "Coding Problems",
      desc: "Practice with curated coding problems, run your code, and submit solutions",
      icon: Code,
      color: "blue",
      onClick: () => navigate("/practice/coding"),
      stat: loading ? "..." : `${totalStars} Stars Earned`,
      statIcon: Star
    },
    {
      title: "AI Generated",
      desc: "Generate custom coding problems based on your preferences using AI",
      icon: Sparkles,
      color: "orange",
      onClick: () => navigate("/practice/ai")
    },
    {
      title: "Coming Soon",
      desc: "More practice options will be available soon",
      icon: Target,
      color: "gray",
      disabled: true
    }
  ];

  return (
    <div className="w-full max-w-full px-4 sm:px-6 lg:px-8 mx-auto animate-fade-in space-y-4 pb-10">
      {/* Header - Consistent with Dashboard */}
      <div>
        <h1 className="text-2xl font-black text-[#1a1a1a] tracking-tight">Practice Arena 📖🌱</h1>
        <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
          Refine your skills with curated challenges and AI assessments
        </p>
      </div>

      {/* Content - Compact Horizontal Cards with Bottom Badge */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {practiceCategories.map((cat, i) => (
          <div
            key={i}
            onClick={!cat.disabled ? cat.onClick : undefined}
            className={`bg-white rounded-[24px] p-6 shadow-[0_0_20px_rgba(0,0,0,0.08)] border border-gray-50 flex flex-col gap-6 transition-all duration-500 group relative overflow-hidden
              ${cat.disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:scale-[1.03] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)]'}
            `}
          >
            {/* Background Glow Effect on Hover */}
            {!cat.disabled && (
              <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-3xl
                ${cat.color === 'blue' ? 'bg-blue-600' : ''}
                ${cat.color === 'orange' ? 'bg-orange-600' : ''}
                ${cat.color === 'gray' ? 'bg-gray-600' : ''}
              `}></div>
            )}

            {/* Top Section: Icon | Info */}
            <div className="flex gap-4">
              {/* Icon Container with Animation */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 shadow-inner
                ${!cat.disabled ? 'group-hover:rotate-6 group-hover:scale-110' : ''}
                ${cat.color === 'blue' ? 'bg-blue-50 text-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : ''}
                ${cat.color === 'orange' ? 'bg-orange-50 text-orange-600 shadow-[0_0_20px_rgba(249,115,22,0.1)]' : ''}
                ${cat.color === 'gray' ? 'bg-gray-50 text-gray-400 shadow-[0_0_20px_rgba(156,163,175,0.1)]' : ''}
              `}>
                <cat.icon size={26} strokeWidth={2.5} />
              </div>

              {/* Info: Title over Description */}
              <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                <h3 className="text-[15px] font-black text-[#1a1a1a] tracking-tight truncate uppercase">{cat.title}</h3>
                <p className="text-[11px] font-bold text-gray-400 leading-relaxed line-clamp-2">
                  {cat.desc}
                </p>
              </div>
            </div>

            {/* Bottom Section: Stat Badge | Arrow */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-50">
              <div className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-colors duration-300
                ${cat.stat ? 'bg-yellow-50 text-yellow-600 border border-yellow-100 group-hover:bg-yellow-100' : 'bg-[#4C4CFF]/5 text-[#4C4CFF] border border-[#4C4CFF]/10 group-hover:bg-[#4C4CFF]/10'}
              `}>
                {cat.stat ? (
                  <>
                    <cat.statIcon size={12} className="fill-yellow-500" />
                    {cat.stat}
                  </>
                ) : (
                  <>
                    <Target size={12} />
                    Assessment
                  </>
                )}
              </div>

              {/* Action Arrow */}
              {!cat.disabled ? (
                <div className="w-10 h-10 rounded-full bg-gray-50 text-gray-300 transition-all duration-500 group-hover:bg-[#4C4CFF] group-hover:text-white group-hover:translate-x-1 flex items-center justify-center">
                  <ArrowRight size={18} strokeWidth={3} />
                </div>
              ) : (
                <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded">Coming Soon</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Practice;

