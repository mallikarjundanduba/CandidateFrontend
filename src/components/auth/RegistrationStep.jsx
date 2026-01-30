import React, { useState } from "react";
import { UserCheck, AlertCircle, Upload } from "lucide-react";
import { authService } from "../../services/authService";

const RegistrationStep = ({ email, otp, onRegistered }) => {
  const [formData, setFormData] = useState({
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
    if (!formData.regNo.trim()) {
      setError("Registration number is required");
      return false;
    }
    if (!formData.college.trim()) {
      setError("College name is required");
      return false;
    }
    if (!formData.degree.trim()) {
      setError("Degree is required");
      return false;
    }
    if (!formData.stream.trim()) {
      setError("Stream is required");
      return false;
    }
    if (!formData.semester.trim()) {
      setError("Semester is required");
      return false;
    }
    if (!formData.academicYearStart || !formData.academicYearEnd) {
      setError("Academic year start and end are required");
      return false;
    }
    if (parseInt(formData.academicYearEnd) <= parseInt(formData.academicYearStart)) {
      setError("Academic year end must be greater than start year");
      return false;
    }
    if (!formData.address.trim()) {
      setError("Address is required");
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

      // Prepare registration data with all fields
      const registrationData = {
        email,
        otp,
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        regNo: formData.regNo.trim(),
        college: formData.college.trim(),
        degree: formData.degree.trim(),
        stream: formData.stream.trim(),
        academicYearStart: parseInt(formData.academicYearStart),
        academicYearEnd: parseInt(formData.academicYearEnd),
        semester: formData.semester.trim(),
        address: formData.address.trim(),
        password: formData.password,
        resumeFilename: formData.resumeFile ? formData.resumeFile.name : "",
        resumeStoragePath: formData.resumeFile ? "pending_upload" : "",
        source: "CANDIDATE_PORTAL"
      };

      await authService.register(registrationData);
      onRegistered();
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
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

  const handleDropdownSelect = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setFilters(prev => ({ ...prev, [field]: value }));
    setDropdowns(prev => ({ ...prev, [field]: false }));
  };

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    setFilters(prev => ({ ...prev, [field]: value }));
    setDropdowns(prev => ({ ...prev, [field]: true }));
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <img src="/logo.png" alt="KareerGrowth Logo" className="h-12 w-auto" />
          </div>
          <h1 className="text-base font-semibold text-gray-900 mb-1">Complete Registration</h1>
          <p className="text-gray-600 text-xs">Fill in all your details to create an account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 border border-gray-200">
          <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-md">
            <p className="text-xs text-gray-900">
              📋 Registration fee of <span className="font-bold">₹49</span> will be charged in the next step.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Grid Layout - Responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="md:col-span-2">
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

              {/* Email (Read-only) */}
              <div>
                <label className="block text-xs font-medium text-gray-900 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
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

              {/* Registration Number */}
              <div>
                <label className="block text-xs font-medium text-gray-900 mb-1.5">
                  Registration Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.regNo}
                  onChange={handleChange("regNo")}
                  disabled={loading}
                  required
                  placeholder="Enter registration number"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* College */}
              <div>
                <label className="block text-xs font-medium text-gray-900 mb-1.5">
                  College Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={handleChange("college")}
                  disabled={loading}
                  required
                  placeholder="Enter college name"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Degree */}
              <div className="relative">
                <label className="block text-xs font-medium text-gray-900 mb-1.5">
                  Degree <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.degree}
                  onChange={handleInputChange("degree")}
                  onFocus={() => {
                    setDropdowns(prev => ({ ...prev, degree: true }));
                    setFilters(prev => ({ ...prev, degree: formData.degree }));
                  }}
                  onBlur={() => setTimeout(() => setDropdowns(prev => ({ ...prev, degree: false })), 200)}
                  disabled={loading}
                  required
                  placeholder="Type or select degree"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                {dropdowns.degree && degreeOptions.filter(opt => opt.toLowerCase().includes(filters.degree.toLowerCase())).length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                    {degreeOptions.filter(opt => opt.toLowerCase().includes(filters.degree.toLowerCase())).map((option) => (
                      <div
                        key={option}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleDropdownSelect("degree", option);
                        }}
                        className="px-3 py-2 text-xs hover:bg-purple-50 cursor-pointer"
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
                  Stream <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.stream}
                  onChange={handleInputChange("stream")}
                  onFocus={() => {
                    setDropdowns(prev => ({ ...prev, stream: true }));
                    setFilters(prev => ({ ...prev, stream: formData.stream }));
                  }}
                  onBlur={() => setTimeout(() => setDropdowns(prev => ({ ...prev, stream: false })), 200)}
                  disabled={loading}
                  required
                  placeholder="Type or select stream"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                {dropdowns.stream && streamOptions.filter(opt => opt.toLowerCase().includes(filters.stream.toLowerCase())).length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                    {streamOptions.filter(opt => opt.toLowerCase().includes(filters.stream.toLowerCase())).map((option) => (
                      <div
                        key={option}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleDropdownSelect("stream", option);
                        }}
                        className="px-3 py-2 text-xs hover:bg-purple-50 cursor-pointer"
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
                  Semester <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.semester}
                  onChange={handleInputChange("semester")}
                  onFocus={() => {
                    setDropdowns(prev => ({ ...prev, semester: true }));
                    setFilters(prev => ({ ...prev, semester: formData.semester }));
                  }}
                  onBlur={() => setTimeout(() => setDropdowns(prev => ({ ...prev, semester: false })), 200)}
                  disabled={loading}
                  required
                  placeholder="Type or select semester"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                {dropdowns.semester && semesterOptions.filter(opt => opt.toLowerCase().includes(filters.semester.toLowerCase())).length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                    {semesterOptions.filter(opt => opt.toLowerCase().includes(filters.semester.toLowerCase())).map((option) => (
                      <div
                        key={option}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleDropdownSelect("semester", option);
                        }}
                        className="px-3 py-2 text-xs hover:bg-purple-50 cursor-pointer"
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
                  Academic Year Start <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="2000"
                  max={currentYear + 10}
                  value={formData.academicYearStart}
                  onChange={handleChange("academicYearStart")}
                  disabled={loading}
                  required
                  placeholder={currentYear.toString()}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Academic Year End */}
              <div>
                <label className="block text-xs font-medium text-gray-900 mb-1.5">
                  Academic Year End <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="2000"
                  max={currentYear + 15}
                  value={formData.academicYearEnd}
                  onChange={handleChange("academicYearEnd")}
                  disabled={loading}
                  required
                  placeholder={(currentYear + 4).toString()}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-900 mb-1.5">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.address}
                  onChange={handleChange("address")}
                  disabled={loading}
                  required
                  rows="3"
                  placeholder="Enter your complete address"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
                />
              </div>

              {/* Resume Upload */}
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-900 mb-1.5">
                  Resume (Optional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleChange("resumeFile")}
                    disabled={loading}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="flex items-center justify-center gap-2 w-full px-3 py-2 text-xs border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Upload className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">
                      {formData.resumeFile ? formData.resumeFile.name : "Upload Resume (PDF, DOC, DOCX)"}
                    </span>
                  </label>
                </div>
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
                  placeholder="Minimum 6 characters"
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
                  placeholder="Re-enter password"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <p className="text-xs text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-purple-900 hover:bg-purple-800 text-white font-medium text-xs rounded-md transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  "Save & Continue to Payment"
                )}
              </button>
            </div>
          </form>

          {/* Footer */}
          <p className="text-center text-[10px] text-gray-500 mt-4">
            🔒 Your information is secure and will not be shared
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationStep;
