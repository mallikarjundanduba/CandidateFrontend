import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Briefcase, Search, Building2, DollarSign, ExternalLink, FileText, Calendar, Send, MapPin, Tag, ArrowRight, Sparkles, Bookmark } from "lucide-react";
import JobDetailsModal from "../common/JobDetailsModal";
import { fetchAllJobs, markJobNotificationsAsRead } from "../../store/slices/jobsSlice";

const Jobs = () => {
  const dispatch = useDispatch();
  
  // Get jobs data from Redux store (cached)
  const jobsState = useSelector((state) => state.jobs || {});
  const jobs = jobsState.jobs || [];
  const loading = jobsState.loading || false;
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch jobs on mount (Redux handles caching)
    dispatch(fetchAllJobs(false));
    // Mark job notifications as read
    dispatch(markJobNotificationsAsRead());
  }, [dispatch]);

  const handleApply = (job) => {
    // Get the first available link from job links
    const links = job.links ? job.links.split(',').map(link => link.trim()).filter(link => link) : [];

    if (links.length > 0) {
      // Open the first link in a new tab
      const linkToOpen = links[0].startsWith('http') ? links[0] : `https://${links[0]}`;
      window.open(linkToOpen, '_blank', 'noopener,noreferrer');
    } else {
      alert("No application link available for this job. Please contact the company directly.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    } catch (e) {
      return dateString;
    }
  };

  const isApplicationOpen = (job) => {
    if (!job.startDate && !job.lastDate) return true; // If no dates set, assume open
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (job.startDate) {
      const startDate = new Date(job.startDate);
      startDate.setHours(0, 0, 0, 0);
      if (startDate > today) return false;
    }

    if (job.lastDate) {
      const lastDate = new Date(job.lastDate);
      lastDate.setHours(23, 59, 59, 999);
      if (lastDate < today) return false;
    }

    return true;
  };

  const filteredJobs = jobs.filter(job =>
    job.jobCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const JobCard = ({ job }) => {
    const [isSaved, setIsSaved] = useState(false);
    const links = job.links ? job.links.split(',').map(link => link.trim()).filter(link => link) : [];
    const companyInitials = job.companyName ? job.companyName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '??';

    // Generate a consistent random pastel color based on company name
    const colors = ['bg-orange-100', 'bg-blue-100', 'bg-pink-100', 'bg-red-100', 'bg-purple-100', 'bg-emerald-100', 'bg-indigo-100', 'bg-yellow-100'];
    const colorIndex = job.companyName ? job.companyName.charCodeAt(0) % colors.length : 0;
    const bgColor = colors[colorIndex];

    const tags = job.skills ? job.skills.split(',').slice(0, 2) : ['Full-time', 'Remote'];

    const getTimeAgo = (dateString) => {
      if (!dateString) return 'Recently';
      const date = new Date(dateString);
      const now = new Date();
      const seconds = Math.floor((now - date) / 1000);

      let interval = seconds / 31536000;
      if (interval > 1) return Math.floor(interval) + " years ago";
      interval = seconds / 2592000;
      if (interval > 1) return Math.floor(interval) + " months ago";
      interval = seconds / 604800;
      if (interval > 1) return Math.floor(interval) + " weeks ago";
      interval = seconds / 86400;
      if (interval > 1) return Math.floor(interval) + " days ago";
      interval = seconds / 3600;
      if (interval > 1) return Math.floor(interval) + " hours ago";
      interval = seconds / 60;
      if (interval > 1) return Math.floor(interval) + " minutes ago";
      return "Just now";
    };

    return (
      <div
        onClick={() => {
          setSelectedJob(job);
          setIsModalOpen(true);
        }}
        className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-[0_0_20px_rgba(0,0,0,0.08)] hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-gray-100 h-full flex flex-col"
      >
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className={`w-9 h-9 sm:w-10 sm:h-10 ${bgColor} rounded-full flex items-center justify-center text-lg sm:text-xl font-bold text-gray-700`}>
            {companyInitials}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsSaved(!isSaved);
            }}
            className="flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <span className="text-[10px] sm:text-xs text-gray-700">{isSaved ? 'Saved' : 'Save'}</span>
            <Bookmark
              size={14}
              className={isSaved ? 'fill-black' : ''}
            />
          </button>
        </div>

        <div className="mb-3 sm:mb-4 flex-1">
          <h3 className="text-gray-600 text-[10px] sm:text-xs mb-1">{job.companyName} <span className="text-gray-400"> {getTimeAgo(job.postDate || job.createdAt)}</span></h3>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 text-[#1a1a1a]">{job.jobTitle}</h2>
          <div className="flex gap-1.5 flex-wrap">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 rounded-lg text-[10px] sm:text-xs text-gray-700"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100 mt-auto gap-2">
          <div className="min-w-0">
            <p className="text-sm sm:text-base font-semibold mb-0.5 text-[#1a1a1a] truncate">{job.packageAmount || "Competitive"}</p>
            <p className="text-[9px] sm:text-[10px] text-gray-400 truncate">{job.location || "Remote"}</p>
          </div>
          <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-[10px] sm:text-xs shrink-0 whitespace-nowrap">
            Apply now
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-full px-4 sm:px-6 lg:px-8 mx-auto animate-fade-in space-y-4 pb-10 relative">
      {/* Background Tech Pattern */}


      {/* Header - Premium Dashboard Style */}
      <div>
        <h1 className="text-2xl font-black text-[#1a1a1a] tracking-tight uppercase">Job Opportunities 💼</h1>
        <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
          Browse and apply for curated positions matching your skills
        </p>
      </div>

      {/* Search Bar - Clean Premium Style */}
      <div className="bg-white rounded-[20px] shadow-[0_0_20px_rgba(0,0,0,0.08)] border border-gray-50 p-4 transition-all duration-300 focus-within:shadow-[0_8px_30px_rgba(0,0,0,0.04)] focus-within:border-indigo-100">
        <div className="flex items-center gap-4 px-2">
          <Search className="h-5 w-5 text-gray-300" />
          <input
            type="text"
            placeholder="Search by job title, company name, required skills, or job code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 outline-none text-[13px] font-medium bg-transparent text-[#1a1a1a] placeholder-gray-300 w-full"
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="bg-white rounded-[24px] shadow-[0_0_20px_rgba(0,0,0,0.08)] p-16 border border-gray-50">
          <div className="text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 text-[#4C4CFF] animate-pulse">
              <Briefcase size={32} />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest animate-bounce">Sourcing jobs...</p>
          </div>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="bg-white rounded-[24px] shadow-[0_0_20px_rgba(0,0,0,0.08)] p-16 border border-gray-50">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-6 text-gray-200">
              <Sparkles size={40} />
            </div>
            <h3 className="text-sm font-black text-[#1a1a1a] uppercase tracking-tight mb-2">
              {searchTerm ? "No matches found" : "No jobs posted yet"}
            </h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest max-w-[280px] leading-relaxed">
              {searchTerm
                ? "We couldn't find any positions matching your search. Try different keywords."
                : "Check back later for new career opportunities tailored for you."}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
          {filteredJobs.map((job) => (
            <JobCard key={job.jobId} job={job} />
          ))}
        </div>
      )}
      <JobDetailsModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedJob(null);
        }}
        onApply={handleApply}
      />
      {/* Background Tech Pattern */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(#4C4CFF 0.5px, transparent 0.5px), radial-gradient(#4C4CFF 0.5px, #f8f9fd 0.5px)', backgroundSize: '20px 20px' }}>
      </div>
    </div>
  );
};

export default Jobs;
