import React from "react";
import { X, Building2, MapPin, DollarSign, Briefcase, Tag, FileText, Send, Sparkles, Calendar } from "lucide-react";

const JobDetailsModal = ({ job, isOpen, onClose, onApply }) => {
    if (!isOpen || !job) return null;

    const companyInitials = job.companyName
        ? job.companyName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
        : '??';

    const links = job.links ? job.links.split(',').map(link => link.trim()).filter(link => link) : [];

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

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-[32px] shadow-2xl max-w-2xl w-full animate-in fade-in zoom-in duration-300 overflow-hidden outline-none">
                {/* Header */}
                <div className="relative p-8 pb-4">
                    <button
                        onClick={onClose}
                        className="absolute right-6 top-6 p-2 rounded-full hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={20} strokeWidth={2.5} />
                    </button>

                    <div className="flex gap-6 items-start">
                        <div className="w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner shrink-0 leading-none">
                            <span className="text-2xl font-black">{companyInitials}</span>
                        </div>
                        <div className="flex-1 min-w-0 pt-2">
                            <h2 className="text-2xl font-black text-[#1a1a1a] tracking-tight uppercase leading-tight mb-2">
                                {job.jobTitle}
                            </h2>
                            <div className="flex items-center gap-2">
                                <Building2 size={16} className="text-gray-300" />
                                <span className="text-sm font-bold text-[#1a1a1a] uppercase tracking-widest leading-none">{job.companyName}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="px-8 pb-8 space-y-8 overflow-y-auto max-h-[65vh] custom-scrollbar">
                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Location</span>
                            <div className="flex items-center gap-2 text-sm font-bold text-[#1a1a1a]">
                                <MapPin size={14} className="text-gray-300" />
                                <span>{job.location || "Remote"}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Package</span>
                            <div className="flex items-center gap-2 text-sm font-bold text-emerald-600">
                                <DollarSign size={14} />
                                <span>{job.packageAmount || "Competitive"}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Role Type</span>
                            <div className="flex items-center gap-2 text-sm font-bold text-indigo-600">
                                <Briefcase size={14} />
                                <span>Full Time</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Job Code</span>
                            <div className="flex items-center gap-2 text-sm font-bold text-orange-600">
                                <Tag size={14} />
                                <span>{job.jobCode || "N/A"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Job Description */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                                <FileText size={16} />
                            </div>
                            <h3 className="text-xs font-black text-[#1a1a1a] uppercase tracking-widest">Description</h3>
                        </div>
                        <p className="text-sm text-[#1a1a1a] leading-relaxed font-medium whitespace-pre-wrap">
                            {job.jd || "No job description provided."}
                        </p>
                    </div>

                    {/* Skills Area */}
                    {job.skills && (
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                                    <Sparkles size={16} />
                                </div>
                                <h3 className="text-xs font-black text-[#1a1a1a] uppercase tracking-widest">Required Skills</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {job.skills.split(',').map((skill, idx) => (
                                    <span key={idx} className="px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-100 text-[10px] font-black text-[#1a1a1a] uppercase tracking-widest shadow-sm">
                                        {skill.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Important Dates */}
                    {(job.startDate || job.lastDate) && (
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            {job.startDate && (
                                <div className="p-4 rounded-[20px] bg-blue-50/50 border border-blue-100/50 flex items-center gap-3">
                                    <Calendar size={18} className="text-blue-500" />
                                    <div>
                                        <span className="block text-[9px] font-black text-blue-400 uppercase tracking-widest">Application Starts</span>
                                        <span className="text-xs font-bold text-blue-700">{formatDate(job.startDate)}</span>
                                    </div>
                                </div>
                            )}
                            {job.lastDate && (
                                <div className="p-4 rounded-[20px] bg-red-50/50 border border-red-100/50 flex items-center gap-3">
                                    <Calendar size={18} className="text-red-500" />
                                    <div>
                                        <span className="block text-[9px] font-black text-red-400 uppercase tracking-widest">Application Ends</span>
                                        <span className="text-xs font-bold text-red-700">{formatDate(job.lastDate)}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer Action */}
                <div className="p-8 pt-4 bg-gray-50/50 border-t border-gray-50 flex justify-end">
                    <button
                        onClick={() => onApply(job)}
                        className="px-10 py-4 rounded-[20px] bg-[#4C4CFF] text-white text-[13px] font-black uppercase tracking-widest shadow-xl shadow-indigo-200 hover:bg-[#3d3dbf] active:scale-95 transition-all flex items-center gap-3"
                    >
                        <Send size={18} />
                        Apply Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobDetailsModal;
