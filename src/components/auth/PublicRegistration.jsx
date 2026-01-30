import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserCheck, AlertCircle, Upload, Loader, Briefcase, MapPin, Calendar, Award } from "lucide-react";
import apiClient from "../../services/apiService";

const PublicRegistration = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [positionInfo, setPositionInfo] = useState(null);
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    phone: "",
    regNo: "",
    college: "",
    degree: "",
    stream: "",
    academicYearStart: "",
    academicYearEnd: "",
    semester: "",
    address: "",
    password: "",
    confirmPassword: "",
    resumeFile: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dropdowns, setDropdowns] = useState({
    degree: false,
    stream: false,
    semester: false
  });
  const [filters, setFilters] = useState({
    degree: "",
    stream: "",
    semester: ""
  });
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // Fetch position info using token
    const fetchPositionInfo = async () => {
      try {
        const response = await apiClient.get(`/auth/public-link-info/${token}`);
        setPositionInfo(response.data);
      } catch (err) {
        const errorData = err.response?.data;
        if (errorData?.expired) {
          setError("This registration link has expired. Please contact the administrator for a new link.");
        } else {
          setError(errorData?.error || "Invalid registration link");
        }
      } finally {
        setLoadingInfo(false);
      }
    };

    if (token) {
      fetchPositionInfo();
    } else {
      setError("Invalid registration link");
      setLoadingInfo(false);
    }
  }, [token]);

  const handleChange = (field) => (e) => {
    if (field === "resumeFile") {
      setFormData((prev) => ({
        ...prev,
        resumeFile: e.target.files[0] || null
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value
      }));
    }
    setError("");
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.fullName.trim()) {
      setError("Full name is required");
      return false;
    }
    if (!formData.phone.trim()) {
      setError("Phone number is required");
      return false;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("Please enter a valid 10-digit phone number");
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      // Upload resume if provided
      let resumeFilename = "";
      let resumeStoragePath = "";
      if (formData.resumeFile) {
        // For now, we'll just store the filename
        // In production, you'd upload to a file service
        resumeFilename = formData.resumeFile.name;
        resumeStoragePath = "pending_upload";
      }

      // Prepare registration data
      const registrationData = {
        email: formData.email.trim().toLowerCase(),
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        regNo: formData.regNo.trim() || "",
        college: formData.college.trim() || "",
        degree: formData.degree.trim() || "",
        stream: formData.stream.trim() || "",
        academicYearStart: formData.academicYearStart ? parseInt(formData.academicYearStart) : currentYear,
        academicYearEnd: formData.academicYearEnd ? parseInt(formData.academicYearEnd) : currentYear + 4,
        semester: formData.semester.trim() || "",
        address: formData.address.trim() || "",
        password: formData.password,
        resumeFilename,
        resumeStoragePath
      };

      const response = await apiClient.post(`/auth/public-register/${token}`, registrationData);
      
      // Redirect to test link if provided
      if (response.data.testLink) {
        window.location.href = response.data.testLink;
      } else {
        // Fallback: navigate to dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      const errorData = err.response?.data;
      if (errorData?.expired) {
        setError("This registration link has expired. Please contact the administrator for a new link.");
      } else {
        setError(errorData?.error || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const degreeOptions = [
    "B.Tech", "B.E", "B.Sc", "B.Com", "B.A", "BBA", "BCA",
    "M.Tech", "M.E", "M.Sc", "M.Com", "M.A", "MBA", "MCA",
    "B.Pharm", "M.Pharm", "BDS", "MBBS", "LLB", "LLM",
    "B.Ed", "M.Ed", "PhD", "Diploma", "Other"
  ];

  const streamOptions = [
    "Computer Science", "Information Technology", "Electronics and Communication",
    "Electrical Engineering", "Mechanical Engineering", "Civil Engineering",
    "Chemical Engineering", "Aerospace Engineering", "Biotechnology",
    "Data Science", "Artificial Intelligence", "Cyber Security", "Cloud Computing",
    "Mathematics", "Physics", "Chemistry", "Biology", "Commerce", "Economics",
    "Business Administration", "Finance", "Marketing", "Human Resources",
    "Arts", "Design", "Architecture", "Law", "Medical", "Pharmacy", "Education", "Other"
  ];

  const semesterOptions = [
    "Semester 1", "Semester 2", "Semester 3", "Semester 4",
    "Semester 5", "Semester 6", "Semester 7", "Semester 8",
    "1st Year", "2nd Year", "3rd Year", "4th Year",
    "Completed", "Passed Out"
  ];

  if (loadingInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-8 h-8 animate-spin text-purple-600" />
          <p className="text-gray-600">Loading registration form...</p>
        </div>
      </div>
    );
  }

  if (error && !positionInfo) {
    const isExpired = error.toLowerCase().includes("expired");
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <div className={`flex items-center gap-3 mb-4 ${isExpired ? "text-orange-600" : "text-red-600"}`}>
            <AlertCircle className="w-6 h-6" />
            <h2 className="text-lg font-semibold">
              {isExpired ? "Registration Link Expired" : "Registration Link Invalid"}
            </h2>
          </div>
          <p className="text-gray-600 mb-4">{error}</p>
          {isExpired && (
            <p className="text-sm text-gray-500 mb-4">
              Please contact the administrator or the person who shared this link to get a new registration link.
            </p>
          )}
          <button
            onClick={() => navigate("/login")}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Position Details Card - Beautiful Design */}
        {positionInfo && positionInfo.positionTitle && (
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-2xl p-8 mb-6 text-white">
            <div className="flex items-start gap-4">
              <div className="bg-white/20 rounded-full p-3">
                <UserCheck className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <div className="mb-3">
                  <p className="text-lg font-semibold mb-2 opacity-90">You have been assigned for this position</p>
                  <h1 className="text-3xl font-bold mb-2">{positionInfo.positionTitle}</h1>
                  {positionInfo.positionCode && (
                    <p className="text-sm opacity-80">Position Code: {positionInfo.positionCode}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/20">
                  {positionInfo.domainType && (
                    <div>
                      <p className="text-xs opacity-80 mb-1">Domain</p>
                      <p className="font-semibold">{positionInfo.domainType}</p>
                    </div>
                  )}
                  {(positionInfo.minExperience != null || positionInfo.maxExperience != null) && (
                    <div>
                      <p className="text-xs opacity-80 mb-1">Experience</p>
                      <p className="font-semibold">
                        {positionInfo.minExperience ?? 0} - {positionInfo.maxExperience ?? "N/A"} years
                      </p>
                    </div>
                  )}
                  {positionInfo.noOfPositions > 0 && (
                    <div>
                      <p className="text-xs opacity-80 mb-1">Open Positions</p>
                      <p className="font-semibold">{positionInfo.noOfPositions}</p>
                    </div>
                  )}
                  {positionInfo.applicationDeadline && (
                    <div>
                      <p className="text-xs opacity-80 mb-1">Application Deadline</p>
                      <p className="font-semibold">{new Date(positionInfo.applicationDeadline).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
                
                {((positionInfo.mandatorySkills && positionInfo.mandatorySkills.trim()) || 
                  (positionInfo.optionalSkills && positionInfo.optionalSkills.trim())) && (
                  <div className="mt-4 pt-4 border-t border-white/20">
                    {positionInfo.mandatorySkills && positionInfo.mandatorySkills.trim() && (
                      <div className="mb-2">
                        <p className="text-xs opacity-80 mb-2">Required Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {positionInfo.mandatorySkills.split(',').filter(s => s.trim()).map((skill, idx) => (
                            <span key={idx} className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                              {skill.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {positionInfo.optionalSkills && positionInfo.optionalSkills.trim() && (
                      <div>
                        <p className="text-xs opacity-80 mb-2">Preferred Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {positionInfo.optionalSkills.split(',').filter(s => s.trim()).map((skill, idx) => (
                            <span key={idx} className="bg-white/10 px-3 py-1 rounded-full text-xs">
                              {skill.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Registration Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <UserCheck className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">Complete Your Registration</h2>
          </div>
          <p className="text-sm text-gray-600">
            Please fill in your details below to complete the registration process and proceed to the assessment.
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-700 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-gray-900 mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={handleChange("email")}
                  disabled={loading}
                  required
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-gray-900 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange("fullName")}
                  disabled={loading}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-medium text-gray-900 mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  maxLength="10"
                  value={formData.phone}
                  onChange={handleChange("phone")}
                  disabled={loading}
                  required
                  placeholder="9876543210"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-medium text-gray-900 mb-1.5">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={handleChange("password")}
                  disabled={loading}
                  required
                  placeholder="At least 6 characters"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-medium text-gray-900 mb-1.5">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  disabled={loading}
                  required
                  placeholder="Confirm your password"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Registration Number */}
              <div>
                <label className="block text-xs font-medium text-gray-900 mb-1.5">
                  Registration Number
                </label>
                <input
                  type="text"
                  value={formData.regNo}
                  onChange={handleChange("regNo")}
                  disabled={loading}
                  placeholder="Enter registration number"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* College */}
              <div>
                <label className="block text-xs font-medium text-gray-900 mb-1.5">
                  College
                </label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={handleChange("college")}
                  disabled={loading}
                  placeholder="Enter college name"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Degree */}
              <div className="relative">
                <label className="block text-xs font-medium text-gray-900 mb-1.5">
                  Degree
                </label>
                <input
                  type="text"
                  value={formData.degree}
                  onChange={handleChange("degree")}
                  onFocus={() => setDropdowns(prev => ({ ...prev, degree: true }))}
                  onBlur={() => setTimeout(() => setDropdowns(prev => ({ ...prev, degree: false })), 200)}
                  disabled={loading}
                  placeholder="Select or type degree"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                {dropdowns.degree && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                    {degreeOptions
                      .filter(opt => opt.toLowerCase().includes((formData.degree || "").toLowerCase()))
                      .map((option) => (
                        <div
                          key={option}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setFormData(prev => ({ ...prev, degree: option }));
                            setDropdowns(prev => ({ ...prev, degree: false }));
                          }}
                          className="px-3 py-2 text-xs hover:bg-gray-100 cursor-pointer"
                        >
                          {option}
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* Stream */}
              <div className="relative">
                <label className="block text-xs font-medium text-gray-900 mb-1.5">
                  Stream
                </label>
                <input
                  type="text"
                  value={formData.stream}
                  onChange={handleChange("stream")}
                  onFocus={() => setDropdowns(prev => ({ ...prev, stream: true }))}
                  onBlur={() => setTimeout(() => setDropdowns(prev => ({ ...prev, stream: false })), 200)}
                  disabled={loading}
                  placeholder="Select or type stream"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                {dropdowns.stream && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                    {streamOptions
                      .filter(opt => opt.toLowerCase().includes((formData.stream || "").toLowerCase()))
                      .map((option) => (
                        <div
                          key={option}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setFormData(prev => ({ ...prev, stream: option }));
                            setDropdowns(prev => ({ ...prev, stream: false }));
                          }}
                          className="px-3 py-2 text-xs hover:bg-gray-100 cursor-pointer"
                        >
                          {option}
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* Semester */}
              <div className="relative">
                <label className="block text-xs font-medium text-gray-900 mb-1.5">
                  Semester
                </label>
                <input
                  type="text"
                  value={formData.semester}
                  onChange={handleChange("semester")}
                  onFocus={() => setDropdowns(prev => ({ ...prev, semester: true }))}
                  onBlur={() => setTimeout(() => setDropdowns(prev => ({ ...prev, semester: false })), 200)}
                  disabled={loading}
                  placeholder="Select or type semester"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                {dropdowns.semester && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                    {semesterOptions
                      .filter(opt => opt.toLowerCase().includes((formData.semester || "").toLowerCase()))
                      .map((option) => (
                        <div
                          key={option}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setFormData(prev => ({ ...prev, semester: option }));
                            setDropdowns(prev => ({ ...prev, semester: false }));
                          }}
                          className="px-3 py-2 text-xs hover:bg-gray-100 cursor-pointer"
                        >
                          {option}
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* Academic Year Start */}
              <div>
                <label className="block text-xs font-medium text-gray-900 mb-1.5">
                  Academic Year Start
                </label>
                <input
                  type="number"
                  value={formData.academicYearStart}
                  onChange={handleChange("academicYearStart")}
                  disabled={loading}
                  placeholder={currentYear.toString()}
                  min="2000"
                  max={currentYear + 10}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Academic Year End */}
              <div>
                <label className="block text-xs font-medium text-gray-900 mb-1.5">
                  Academic Year End
                </label>
                <input
                  type="number"
                  value={formData.academicYearEnd}
                  onChange={handleChange("academicYearEnd")}
                  disabled={loading}
                  placeholder={(currentYear + 4).toString()}
                  min="2000"
                  max={currentYear + 20}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-900 mb-1.5">
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={handleChange("address")}
                  disabled={loading}
                  rows="3"
                  placeholder="Enter your address"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Resume Upload */}
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-900 mb-1.5">
                  Resume (PDF, Word .docx)
                </label>
                <div className="flex items-center gap-3">
                  <label className="px-4 py-2 text-xs border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    {formData.resumeFile ? "Change File" : "Choose File"}
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleChange("resumeFile")}
                      disabled={loading}
                      className="hidden"
                    />
                  </label>
                  {formData.resumeFile && (
                    <span className="text-xs text-gray-600">{formData.resumeFile.name}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-md hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4" />
                    Register & Continue to Test
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PublicRegistration;
