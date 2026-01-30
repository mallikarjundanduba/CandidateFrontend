import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  User, Mail, Phone, MapPin, Edit2, Save, X, FileText, Download,
  Briefcase, Calendar, GraduationCap, Building2, Clock, Star, Play, ChevronRight, Plus
} from "lucide-react";
import { fetchProfileData, updateProfileData } from "../../store/slices/profileDataSlice";

const Profile = ({ email }) => {
  const dispatch = useDispatch();
  
  // Get profile data from Redux store (cached)
  const profileDataState = useSelector((state) => state.profileData || {});
  const profileData = profileDataState.profile;
  const resumeData = profileDataState.resume;
  const jobApplications = profileDataState.applications || [];
  const loading = profileDataState.loading || false;
  const updating = profileDataState.updating || false;
  
  const [activeTab, setActiveTab] = useState("Experience");
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    // Fetch profile data on mount (Redux handles caching)
    dispatch(fetchProfileData(false));
  }, [dispatch]);

  // Initialize edit form data when profile loads
  useEffect(() => {
    if (profileData && !isEditing) {
      setEditFormData({
        fullName: profileData.fullName || profileData.name || "",
        phone: profileData.phone || profileData.mobileNumber || "",
        address: profileData.address || "",
        college: profileData.collegeName || profileData.college || "",
        degree: profileData.degree || "",
        stream: profileData.stream || "",
        semester: profileData.semester || "",
        academicYearStart: profileData.academicYearStart || "",
        academicYearEnd: profileData.academicYearEnd || ""
      });
    }
  }, [profileData, isEditing]);

  const handleSave = async () => {
    try {
      await dispatch(updateProfileData(editFormData)).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4C4CFF]"></div>
      </div>
    );
  }

  const tabs = ["Experience", "Education", "Certification"];
  const candidateName = profileData?.fullName || profileData?.name || "Candidate";
  const candidateId = profileData?.candidateId || "HiTe-0000";

  return (
    <div className="w-full max-w-full px-4 sm:px-6 lg:px-8 mx-auto animate-fade-in space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#1a1a1a]">User Profile</h1>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg ${isEditing
            ? "bg-green-500 hover:bg-green-600 text-white shadow-green-500/20"
            : "bg-[#4C4CFF] hover:bg-[#3D3DFF] text-white shadow-[#4C4CFF]/20"
            }`}
        >
          {isEditing ? <Save size={18} /> : <Edit2 size={18} />}
          {isEditing ? "Save Profile" : "Edit Profile"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Profile Card */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-[40px] p-8 shadow-[0_0_20px_rgba(0,0,0,0.08)] border border-gray-50 flex flex-col items-center text-center">
            <div className="relative w-36 h-36 mb-6">
              <div className="w-full h-full rounded-full border-[6px] border-blue-50 overflow-hidden shadow-inner">
                <img
                  src={profileData?.profileImage || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-2 right-2 w-7 h-7 bg-[#4C4CFF] rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
              </div>
            </div>

            <h2 className="text-xl font-bold text-[#1a1a1a] mb-1">{candidateId}</h2>
            <p className="text-sm font-medium text-gray-500 mb-1">{profileData?.title || "Lead Developer"}</p>
            <p className="text-[#4C4CFF] font-bold mb-6">{profileData?.expectedCtc ? `$${profileData.expectedCtc}/hr` : "$44/hr"}</p>

            <p className="text-xs leading-relaxed text-gray-500 mb-8 px-2 line-clamp-4">
              {profileData?.bio || "Passionate developer focused on building high-quality, responsive web applications with a focus on modern user experiences."}
            </p>

            <div className="w-full text-left pt-6 border-t border-gray-50">
              <h3 className="text-sm font-bold text-[#1a1a1a] mb-4">Skills:</h3>
              <div className="flex flex-wrap gap-2">
                {(profileData?.skills || ["React", "Node.js", "Tailwind"]).map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-[#F8F9FD] text-gray-600 text-[11px] font-bold rounded-xl border border-gray-100">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column: Details */}
        <div className="lg:col-span-6 space-y-8">
          <div className="bg-white rounded-[40px] p-10 shadow-[0_0_20px_rgba(0,0,0,0.08)] border border-gray-50">
            <h3 className="text-lg font-bold text-[#1a1a1a] mb-8">Basic Information:</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 mb-12">
              {[
                { label: "Phone", value: profileData?.phone || profileData?.mobileNumber || "N/A" },
                { label: "Experience", value: profileData?.experience || "4 Years" },
                { label: "Current CTC", value: profileData?.currentCtc || "12.5 Lac" },
                { label: "Location", value: profileData?.address || profileData?.city || "Pune, India" },
                { label: "Availability", value: profileData?.availability || "Full Time" },
                { label: "Experience", value: profileData?.experience || "4 Years" },
              ].map((info, i) => (
                <div key={i}>
                  <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-2">{info.label}:</p>
                  <p className="text-sm font-bold text-[#1a1a1a]">{info.value}</p>
                </div>
              ))}
            </div>


          </div>

          <div className="bg-white rounded-[40px] p-10 shadow-[0_0_20px_rgba(0,0,0,0.08)] border border-gray-50 min-h-[450px]">
            <div className="flex border-b border-gray-50 mb-10 overflow-x-auto whitespace-nowrap">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-4 text-sm font-bold transition-all relative ${activeTab === tab ? "text-[#4C4CFF]" : "text-gray-400 hover:text-gray-600"
                    }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#4C4CFF] rounded-t-full scale-x-75"></div>
                  )}
                </button>
              ))}
            </div>

            <div className="space-y-8">
              {activeTab === "Experience" ? (
                (profileData?.experiences || [
                  { company: "IBM", role: "Lead Developer", duration: "2020 - Present" },
                  { company: "Lumen", role: "Frontend Developer", duration: "2018 - 2020" }
                ]).map((exp, idx) => (
                  <div key={idx} className="flex items-center justify-between group">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-[#F8F9FD] rounded-[22px] flex items-center justify-center text-[#1B1B4B] font-black text-xs border border-gray-100 shadow-sm group-hover:scale-105 transition-all">
                        {exp.company?.charAt(0) || "B"}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#1a1a1a]">{exp.company}</h4>
                        <p className="text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-wide">{exp.role}</p>
                        <p className="text-[11px] text-gray-300 mt-1">{exp.duration}</p>
                      </div>
                    </div>
                    <button className="p-2.5 rounded-xl bg-gray-50 text-[#4C4CFF] group-hover:bg-[#4C4CFF] group-hover:text-white transition-all">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-gray-300">
                  <div className="w-16 h-16 bg-[#F8F9FD] rounded-3xl flex items-center justify-center mb-4">
                    <Plus size={24} className="text-gray-400" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest">No {activeTab} Added</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Media & Similar */}
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white rounded-[40px] p-5 shadow-[0_0_20px_rgba(0,0,0,0.08)] border border-gray-50 relative group overflow-hidden">
            <div className="aspect-[4/3] rounded-[30px] overflow-hidden bg-gray-900 relative">
              <img
                src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=400"
                alt="Profile Media"
                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <button className="absolute inset-0 m-auto w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95">
                <Play className="fill-white text-white ml-1" size={24} />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[35px] p-8 shadow-[0_0_20px_rgba(0,0,0,0.08)] border border-gray-50">
            <h3 className="text-sm font-bold text-[#1a1a1a] mb-8 uppercase tracking-widest px-1 border-l-4 border-[#4C4CFF] ml-[-8px] pl-2">Similar Profiles:</h3>
            <div className="space-y-8">
              {jobApplications.slice(0, 3).map((job, idx) => (
                <div key={idx} className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-[18px] overflow-hidden shadow-sm group-hover:scale-105 transition-all">
                    <img
                      src={`https://images.unsplash.com/photo-${1500648767791 + idx}?auto=format&fit=crop&q=80&w=100&h=100`}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#1a1a1a] truncate">Member #{idx + 10}</h4>
                    <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase truncate">{job.positionTitle || "Developer"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
