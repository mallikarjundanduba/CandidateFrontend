import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FileText, Download, Folder, Calendar, Clock, File } from "lucide-react";
import { API_BASE_URL, ADMIN_BACKEND_URL } from "../../constants/api";
import { fetchAssessments, markAssessmentNotificationsAsRead } from "../../store/slices/assessmentsSlice";

const Assessments = () => {
    const dispatch = useDispatch();
    
    // Get assessments data from Redux store (cached)
    const assessmentsState = useSelector((state) => state.assessments || {});
    const assessments = assessmentsState.assessments || [];
    const loading = assessmentsState.loading || false;

    useEffect(() => {
        // Fetch assessments on mount (Redux handles caching)
        dispatch(fetchAssessments(false));
        // Mark assessment notifications as read
        dispatch(markAssessmentNotificationsAsRead());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Library</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Access notes and resources shared by your mentors</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg border border-blue-100 dark:border-blue-800 flex items-center gap-2">
                    <Folder className="text-blue-600 dark:text-blue-400" size={18} />
                    <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">{assessments.length} Total items</span>
                </div>
            </div>

            {assessments.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="bg-gray-50 dark:bg-gray-700/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Folder className="text-gray-400" size={32} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your library is empty</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mt-2 text-sm">
                        When your mentors share notes or resources with your class, they will appear here.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
                    {assessments.map((a) => (
                        <div key={a.id} className="relative group w-full max-w-[280px] mx-auto pt-3">
                            {/* Folder Tab (Darker Blue) */}
                            <div className="absolute top-0 left-0 w-20 h-5 bg-[#4A90E2] rounded-t-lg z-0 shadow-sm transition-all group-hover:w-24 group-hover:-mt-1"></div>

                            {/* Main Folder Body (Blue Gradient) */}
                            <div
                                onClick={() => a.filePath && window.open(`${ADMIN_BACKEND_URL}/api/files/download?path=${encodeURIComponent(a.filePath)}`, '_blank')}
                                className={`relative z-10 bg-gradient-to-br from-[#50A7FF] to-[#007AFF] rounded-b-xl rounded-tr-xl shadow-[0_8px_20px_rgba(0,122,255,0.25)] p-4 h-[210px] flex flex-col justify-between text-white transition-transform duration-300 group-hover:translate-y-[-4px] group-hover:shadow-[0_15px_30px_rgba(0,122,255,0.35)] ${a.filePath ? 'cursor-pointer hover:ring-2 hover:ring-blue-300/50' : ''}`}
                            >
                                {/* Decoration dots */}
                                <div className="absolute top-3 right-3 flex gap-1 opacity-60">
                                    <div className="w-1 h-1 bg-white rounded-full"></div>
                                    <div className="w-1 h-1 bg-white rounded-full"></div>
                                </div>

                                {/* Icon & Date Header */}
                                <div className="flex items-start justify-between mb-2">
                                    <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white border border-white/10 shadow-inner">
                                        <Folder size={18} fill="currentColor" className="opacity-90" />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[9px] font-bold text-white/90 bg-black/10 px-2 py-1 rounded-lg backdrop-blur-sm">
                                            {new Date(a.createdAt).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                                        </p>
                                    </div>
                                </div>

                                {/* Content Info */}
                                <div className="space-y-0.5 mb-2 flex-grow">
                                    <h4 className="text-sm font-bold leading-tight line-clamp-2 drop-shadow-sm" title={a.topic || a.content}>
                                        {a.topic || a.content || "Untitled Note"}
                                    </h4>
                                    <p className="text-[10px] font-medium text-blue-100 uppercase tracking-wider truncate" title={a.subject}>
                                        {a.subject || "General Resource"}
                                    </p>
                                </div>

                                {/* Assigned By Info */}
                                {a.assignedBy && (
                                    <div className="mb-2 px-0.5">
                                        <p className="text-[9px] text-blue-100/90 truncate flex items-center gap-1" title={`Assigned by ${a.assignedBy}`}>
                                            <span className="opacity-70">By:</span>
                                            <span className="font-semibold text-white">{a.assignedBy}</span>
                                        </p>
                                    </div>
                                )}

                                {/* Metadata - Vertical Stack */}
                                <div className="space-y-2">
                                    <div className="bg-black/20 rounded-lg p-2.5 backdrop-blur-sm border border-white/5 w-full">
                                        <p className="text-[8px] text-blue-200 uppercase tracking-widest mb-1 opacity-80">Class Details</p>
                                        <div className="flex flex-col gap-0.5">
                                            <p className="text-[10px] font-bold text-white truncate w-full leading-tight" title={`${a.degree} • ${a.stream}`}>
                                                {a.degree} • {a.stream}
                                            </p>
                                            <p className="text-[10px] text-white/90 font-medium">
                                                {a.semester}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Assessments;
