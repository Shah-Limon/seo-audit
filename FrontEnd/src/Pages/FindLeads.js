import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Search, ChevronRight } from "lucide-react";
import LeadsForUserDashboard from "../components/Shared/LeadsForUserDashboard";
import auth from "../firebase.init";

const FindLeads = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState([]);
  const [user] = useAuthState(auth);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/profiles/`)
      .then((res) => res.json())
      .then((info) => setProfile(info));
  }, []);

  return (
    <div className="min-vh-100 bg-gradient-to-br from-blue-50 via-white to-purple-50 mt-5">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section with enhanced design */}
        <div className="mb-8 text-center">
          <div className="inline-block">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Find Leads
            </h2>
            <div className="mt-2 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform scale-x-50 group-hover:scale-x-100 transition-transform duration-300"></div>
          </div>
        </div>

        {/* Main Content with enhanced styling */}
        <div className="bg-white rounded-2xl shadow-xl backdrop-blur-lg backdrop-filter p-8 border border-gray-100">
          {profile.filter((pro) => pro.userEmail === user?.email).length === 1 ? (
            <div className="space-y-8">
           
              
              {/* Leads Dashboard with animation */}
              <div className="transform transition-all duration-300 hover:scale-[1.01]">
                <LeadsForUserDashboard />
              </div>
            </div>
          ) : (
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="text-center max-w-lg transform transition-all duration-300 hover:scale-105">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-10 rounded-2xl border border-gray-100 shadow-lg">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Complete Your Profile
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    Please update your profile to unlock access to leads and opportunities
                  </p>
                  <Link
                    to="/update-profile"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl font-medium"
                  >
                    Update Profile
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindLeads;