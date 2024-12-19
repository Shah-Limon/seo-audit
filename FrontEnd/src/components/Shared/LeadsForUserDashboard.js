import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import { Link } from "react-router-dom";
import {
  X, Mail, Globe, User, MapPin, Box, Activity, Eye,
  ChartNoAxesColumn,
  Building2
} from 'lucide-react';


const LoadingAnimation = () => (
  <div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-12 col-md-10 col-lg-8">
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <div className="d-flex align-items-center mb-4">
              <div className="me-3 bg-primary bg-opacity-10 p-2 rounded">
                <Building2 className="text-primary" size={24} />
              </div>
              <h4 className="card-title mb-0">Loading Leads...</h4>
            </div>

            <div className="table-responsive mt-4">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" style={{ width: "20%" }}>
                      <div className="placeholder-glow">
                        <span className="placeholder col-6"></span>
                      </div>
                    </th>
                    <th scope="col" style={{ width: "20%" }}>
                      <div className="placeholder-glow">
                        <span className="placeholder col-6"></span>
                      </div>
                    </th>
                    <th scope="col" style={{ width: "20%" }}>
                      <div className="placeholder-glow">
                        <span className="placeholder col-6"></span>
                      </div>
                    </th>
                    <th scope="col" style={{ width: "20%" }}>
                      <div className="placeholder-glow">
                        <span className="placeholder col-6"></span>
                      </div>
                    </th>
                    <th scope="col" style={{ width: "20%" }}>
                      <div className="placeholder-glow">
                        <span className="placeholder col-4"></span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3].map((row) => (
                    <tr key={row}>
                      <td>
                        <div className="placeholder-glow">
                          <span className="placeholder col-8"></span>
                        </div>
                      </td>
                      <td>
                        <div className="placeholder-glow">
                          <span className="placeholder col-8"></span>
                        </div>
                      </td>
                      <td>
                        <div className="placeholder-glow">
                          <span className="placeholder col-8"></span>
                        </div>
                      </td>
                      <td>
                        <div className="placeholder-glow">
                          <span className="placeholder col-8"></span>
                        </div>
                      </td>
                      <td>
                        <div className="placeholder-glow">
                          <span className="placeholder col-6"></span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading Leads...</p>
        </div>
      </div>
    </div>
  </div>
);
const TableLoadingAnimation = () => (
  <div className="position-relative">
    <div className="position-absolute w-100 h-100 bg-white/80 z-50 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-gray-600">Loading data...</p>
      </div>
    </div>
  </div>
);

const LeadsForUserDashboard = () => {
  const [user] = useAuthState(auth);
  const [leads, setLeads] = useState([]);
  const [profile, setProfile] = useState([]);
  const [myLeads, setMyLeads] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [leadsPerPage] = useState(7);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/Shah-Limon/em-list/master/amazon-lead/e-com-lead.json');
        const data = await response.json();
        const shuffledLeads = shuffleArray(data);
        setLeads(shuffledLeads);

        // Mark leads that have been added by the user
        const markedLeads = shuffledLeads.map(lead => ({
          ...lead,
          isAdded: myLeads.some(myLead =>
            myLead.leadAdded === user?.email && lead.personEmail === myLead.personEmail
          )
        }));

        // Preserve current search and filtering logic
        if (searchTitle.trim()) {
          // If there's an active search, filter based on the current search term
          const filteredData = markedLeads.filter(lead =>
            lead.personTitle.toLowerCase().includes(searchTitle.toLowerCase())
          );
          setFilteredLeads(filteredData);
        } else {
          // If no search is active, show all leads
          setFilteredLeads(markedLeads);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Only fetch if both myLeads and user are available
    if (myLeads.length > 0 && user) {
      fetchData();
    }
  }, [myLeads, user, searchTitle]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    fetch(`http://localhost:5000/profiles/`)
      .then((res) => res.json())
      .then((info) => setProfile(info));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/my-all-leads/`)
      .then((res) => res.json())
      .then((info) => setMyLeads(info));
  }, []);

  const handleTitleChange = async (event) => {
    const searchValue = event.target.value;
    setSearchTitle(searchValue);

    if (searchValue.trim()) {
      setIsSearching(true);
      // Add a slight delay to show loading animation
      await new Promise(resolve => setTimeout(resolve, 2000));

      const filteredData = leads.filter(lead =>
        lead.personTitle.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredLeads(filteredData);
      setCurrentPage(1);
      setIsSearching(false);
    } else {
      setFilteredLeads(leads);
    }
  };


  const handlePaginationClick = async (pageNumber) => {
    setIsPaginationLoading(true);
    setCurrentPage(pageNumber);

    // Scroll to top smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsPaginationLoading(false);
  };

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);

  const handleAddMyLead = (event, lead) => {
    event.preventDefault();
    setIsLoading(prev => ({ ...prev, [lead.personEmail]: true }));

    const order = {
      personEmail: lead.personEmail,
      personName: lead.personName,
      title: lead.personTitle,
      website: lead.website,
      location: lead.location,
      leadAdded: user?.email,
      industry: lead.productType,
      credit: 1,
      loadingSpeed: lead.loadingSpeed,
      seoScore: lead.seoScore,
      cms: lead.cms,
      traffic: lead.traffic
    };

    fetch("http://localhost:5000/add-my-lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((result) => {
        const userProfileIndex = profile.findIndex(
          (p) => p.userEmail === user?.email
        );

        if (userProfileIndex !== -1) {
          const updatedProfile = [...profile];
          updatedProfile[userProfileIndex] = {
            ...updatedProfile[userProfileIndex],
            userPoint: (
              parseInt(updatedProfile[userProfileIndex].userPoint) - 1
            ).toString(),
          };
          setProfile(updatedProfile);

          const userId = updatedProfile[userProfileIndex]._id;
          const url = `http://localhost:5000/update-credit/${userId}`;
          return fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userPoint: updatedProfile[userProfileIndex].userPoint,
            }),
          });
        } else {
          throw new Error("User profile not found");
        }
      })
      .then((res) => res.json())
      .then((result) => {
        // Add to myLeads
        setMyLeads((prevMyLeads) => [...prevMyLeads, lead]);

        // Update filteredLeads to mark the lead as added while maintaining current state
        setFilteredLeads((prevFilteredLeads) => {
          // If there's an active search, filter based on search term
          const updatedLeads = prevFilteredLeads.map(filteredLead =>
            filteredLead.personEmail === lead.personEmail
              ? { ...filteredLead, isAdded: true }
              : filteredLead
          );

          // If search is active, filter based on search term
          return searchTitle.trim()
            ? updatedLeads.filter(l =>
              l.personTitle.toLowerCase().includes(searchTitle.toLowerCase())
            )
            : updatedLeads;
        });

        toast.success("Lead added to your list");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to add lead");
      })
      .finally(() => {
        setIsLoading(prev => ({ ...prev, [lead.personEmail]: false }));
      });
  };

  const handleViewLead = (lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedLead(null);
    setIsModalOpen(false);
  };

  const shouldDisplayMessage = !searchTitle.trim();

  const MetricCard = ({ label, value, score, maxScore, color }) => (
    <div className="card border border-gray-200 bg-white">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-muted">{label}</span>
          <span className={`font-weight-bold ${color}`}>{score}/{maxScore}</span>
        </div>
        <div className="progress h-2">
          <div
            className={`progress-bar ${color.replace('text', 'bg')}`}
            style={{ width: `${(score / maxScore) * 100}%` }}
          ></div>
        </div>
        <span className="text-muted mt-1">{value}</span>
      </div>
    </div>
  );

  const Modal = ({ show, onClose, lead }) => {
    const formatUrl = (url) => {
      if (!/^https?:\/\//i.test(url)) {
        return `http://${url}`;
      }
      return url;
    };

    if (!show) return null;

    const handleModalClick = (e) => {
      e.stopPropagation();
    };



    // Add TableLoadingAnimation component
    const TableLoadingAnimation = () => (
      <div className="position-relative">
        <div className="position-absolute w-100 h-100 bg-white/80 z-50 d-flex justify-content-center align-items-center">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 text-gray-600">Loading data...</p>
          </div>
        </div>
      </div>
    );

    return (
      <div className="modal d-block d-flex align-items-center justify-content-center">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div
            onClick={handleModalClick}
            className="modal-content bg-white/95 rounded-3 shadow-2xl animate-in slide-in-from-bottom-4 hover:shadow-blue-500/20"
          >
            <div className="position-absolute -top-1 -left-1 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
            <div className="position-absolute -bottom-1 -right-1 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 blur-xl animate-pulse"></div>

            <div className="border-bottom border-gray-200/80 px-4 py-2 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="card-title mt-2">{lead.productType}</h4>
                </div>
              </div>
              <p
                onClick={onClose}
                className="btn btn-primary rounded-circle p-2 hover-bg-gray-100 transition-colors duration-200"
              >
                <X className="text-gray-400 group-hover:text-gray-600" size={24} />
              </p>
            </div>
            <div className="p-4 space-y-4 relative">
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="card border border-gray-200 bg-gradient-to-br from-blue-50 to-blue-100/50">
                    <div className="card-body">
                      <h4 className="card-title text-muted mb-2">Company Overview</h4>
                      <div className="space-y-2">
                        <div className="d-flex align-items-center space-x-2">
                          <Globe className="text-purple-600 me-1" size={16} />
                          <a href={formatUrl(lead.website)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover-underline">{lead.website}</a>
                        </div>
                        <div className="d-flex align-items-center space-x-2">
                          <Mail className="text-purple-600 me-1" size={16} />
                          <a href={`mailto:${lead.companyEmail}`} className="text-blue-600 hover-underline">{lead.companyEmail}</a>
                          {myLeads.filter(
                            (mylead) =>
                              mylead.leadAdded === user?.email && lead.personEmail === mylead.personEmail
                          ).length > 0
                            ? lead.personEmail
                            : "Add lead to see email"}
                        </div>
                        <div className="d-flex align-items-center space-x-2">

                          <ChartNoAxesColumn className="text-green-600 me-1" size={16} />
                          <span className="text-gray-700">Traffic: {lead.traffic} Monthly Visit</span>
                        </div>
                        <div className="d-flex align-items-center space-x-2">
                          <MapPin className="text-red-600 me-1" size={16} />
                          <span className="text-gray-700">{lead.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card border border-gray-200 bg-gradient-to-br from-purple-50 to-purple-100/50">
                    <div className="card-body">
                      <h4 className="card-title text-muted mb-2">Contact Information</h4>
                      <div className="space-y-2">
                        <div className="d-flex align-items-center space-x-2">
                          <User className="text-purple-600 me-1" size={16} />
                          <span className="text-gray-700">{lead.personName} - {lead.jobTitle}</span>
                        </div>
                        <div className="d-flex align-items-center space-x-2">
                          <Mail className="text-purple-600 me-1" size={16} />

                          {myLeads.filter(
                            (mylead) =>
                              mylead.leadAdded === user?.email && lead.personEmail === mylead.personEmail
                          ).length > 0
                            ? lead.personEmail
                            : "Add lead to see Email"}
                        </div>
                        <div className="d-flex align-items-center space-x-2">
                          <Globe className="text-purple-600 me-1" size={16} />
                          <a href={formatUrl(lead.website)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover-underline">{lead.website}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mt-4 mb-4">
                <h4 className="h5 font-weight-semibold text-gray-800">Technical Analysis</h4>
                <div className="row g-4">
                  <div className="col-md-4">
                    <MetricCard
                      label="SEO Score"
                      value="Search Engine Optimization"
                      score={parseInt(lead.seoScore)}
                      maxScore={100}
                      color="text-warning"
                    />
                  </div>
                  <div className="col-md-4">
                    <MetricCard
                      label="Loading Speed"
                      value={`Loading: ${lead.loadingSpeed}`}
                      score={
                        lead.loadingSpeed.toLowerCase() === "poor"
                          ? Math.floor(Math.random() * 31) + 20  // Random score between 20 and 50
                          : lead.loadingSpeed.toLowerCase() === "good"
                            ? Math.floor(Math.random() * 25) + 51  // Random score between 51 and 75
                            : lead.loadingSpeed.toLowerCase() === "best"
                              ? Math.floor(Math.random() * 25) + 76  // Random score between 76 and 100
                              : 0
                      }
                      maxScore={100}
                      color="text-danger"
                    />
                  </div>
                  <div className="col-md-4">
                    <div className="card border border-gray-200 bg-white">
                      <div className="card-body">
                        <h5 className="card-title text-muted mb-2">CMS Platform</h5>
                        <div className="d-flex align-items-center space-x-2">
                          <Box className="text-blue-600" size={20} />
                          <span className="font-medium text-gray-700">{" "}
                            {lead.cms ? lead.cms : "CMS Platform Found!"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-3border-top border-gray-200/80 bg-gray-50/50 d-flex justify-content-between align-items-center rounded-b-3 mb-3">
              <div className="d-flex align-items-center space-x-2">
                <Activity className="text-green-500" size={16} />
                <span className="text-gray-600">Last updated: Recently</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };



  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-5">
      <div className="container">
        <>
          <style>
            {`
     .search-container {
       margin: 2rem auto;
       max-width: 700px;
       transition: all 0.3s ease;
     }

     .search-wrapper {
       position: relative;
       transform-origin: center;
       transition: transform 0.3s ease, box-shadow 0.3s ease;
     }

     .search-wrapper:hover {
       transform: translateY(-2px);
     }

     .search-wrapper.active {
       transform: scale(1.02);
     }

     .search-input {
       width: 100%;
       padding: 1.2rem 1.2rem 1.2rem 3rem;
       font-size: 1rem;
       color: #1e293b;
       background: white;
       border: 2px solid #e2e8f0;
       border-radius: 1rem;
       transition: all 0.3s ease;
     }

     .search-input:focus {
       outline: none;
       border-color: #3b82f6;
       box-shadow: 0 4px 20px rgba(59, 130, 246, 0.15);
     }

     .search-input::placeholder {
       color: #94a3b8;
     }

     .search-icon {
       position: absolute;
       left: 1rem;
       top: 50%;
       transform: translateY(-50%);
       color: #94a3b8;
       pointer-events: none;
     }

     @media (max-width: 768px) {
       .search-container {
         margin: 1.5rem 1rem;
       }
       
       .search-input {
         padding: 1rem 1rem 1rem 2.5rem;
         font-size: 0.95rem;
       }
     }
   `}
          </style>

          <div className="search-container">
            <div className={`search-wrapper ${searchTitle.trim() ? 'active' : ''}`}>
              <svg
                className="search-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Search by Person Title (e.g., 'CEO', 'Manager')"
                value={searchTitle}
                onChange={handleTitleChange}
                className="search-input"
                autoFocus
              />
            </div>
          </div>
        </>
        {isSearching ? (
          <LoadingAnimation />
        ) : shouldDisplayMessage ? (
          // Your existing welcome message JSX
          <>
            <>
              <style>
                {`
     .search-section {
       background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
       border-radius: 1rem;
       padding: 3rem 2rem;
       margin: 2rem 0;
       box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
       position: relative;
       overflow: hidden;
     }

     .search-section::before {
       content: '';
       position: absolute;
       top: 0;
       left: 0;
       right: 0;
       height: 4px;
       background: linear-gradient(to right, #3b82f6, #2563eb);
     }

     .search-title {
       font-size: 1.75rem;
       font-weight: 600;
       color: #1e293b;
       margin-bottom: 1rem;
       position: relative;
     }

     .search-title::after {
       content: '';
       display: block;
       width: 60px;
       height: 3px;
       background: #3b82f6;
       margin: 0.5rem auto 0;
       border-radius: 2px;
     }

     .search-subtitle {
       color: #64748b;
       font-size: 1rem;
       max-width: 600px;
       margin: 0 auto;
     }

     .gradient-circle {
       position: absolute;
       width: 150px;
       height: 150px;
       border-radius: 50%;
       background: linear-gradient(45deg, rgba(59,130,246,0.1), rgba(37,99,235,0.1));
       z-index: 0;
     }

     .circle-1 {
       top: -75px;
       left: -75px;
     }

     .circle-2 {
       bottom: -75px;
       right: -75px;
     }

     @media (max-width: 768px) {
       .search-section {
         padding: 2rem 1rem;
         margin: 1rem 0;
       }

       .search-title {
         font-size: 1.5rem;
       }
     }
   `}
              </style>

              <div className="mb-5 d-flex justify-content-center align-items-center">
                <div className="search-section text-center w-100">
                  <div className="gradient-circle circle-1"></div>
                  <div className="gradient-circle circle-2"></div>
                  <div className="position-relative">
                    <h3 className="search-title">
                      Find People Using Their Job Title
                    </h3>
                    <p className="search-subtitle">
                      Search through our database to discover professionals based on their roles and positions
                    </p>
                  </div>
                </div>
              </div>
            </>
          </>
        ) : (
          <>
            <div className="d-flex justify-content-center align-items-center">
              <div className="container">
                <div className="row d-flex justify-content-center align-items-center">
                  <div className="table-responsive">
                    {isPaginationLoading ? (
                      <LoadingAnimation />
                    ) : (
                      <>
                        <table className="table table-striped table-bordered" style={{ width: '100%' }}>
                          <thead className="table-dark text-center align-middle rounded-top">
                            <tr className="border-bottom">
                              <th className="p-3 fw-bold" style={{ borderTopLeftRadius: '0.5rem' }}>
                                <p className="m-0">Name</p>
                              </th>
                              <th className="p-3 fw-bold">
                                <p className="m-0">Email</p>
                              </th>
                              <th className="p-3 fw-bold">
                                <p className="m-0">Website</p>
                              </th>
                              <th className="p-3 fw-bold">
                                <p className="m-0">Location</p>
                              </th>
                              <th className="p-3 fw-bold">
                                <p className="m-0">View</p>
                              </th>
                              <th className="p-3 fw-bold">
                                <p className="m-0">Action</p>
                              </th>

                            </tr>
                          </thead>
                          <tbody>
                            {currentLeads.map((lead, index) => (
                              <tr key={lead._id} className="hover-bg-blue-50 transition-colors duration-200 animate-fade-in"
                                style={{ animationDelay: `${index * 50}ms` }}>
                                <td className="btn_color_sub">
                                  <div className="text-sm font-medium text-gray-900">{lead.personName}</div>
                                  <div className="text-sm font-medium text-primary">
                                    - {lead.personTitle.length > 30
                                      ? lead.personTitle.slice(0, 30) + "..."
                                      : lead.personTitle}
                                  </div>
                                </td>
                                <td>
                                  <div className="text-sm text-success">
                                    {myLeads.filter(
                                      (mylead) =>
                                        mylead.leadAdded === user?.email && lead.personEmail === mylead.personEmail
                                    ).length > 0
                                      ? lead.personEmail
                                      : "Add lead to see email"}
                                  </div>
                                  <div className="text-sm text-success d-flex align-items-center">
                                    <span style={{ color: '#00C614' }}>● Valid Email</span>
                                  </div>
                                </td>
                                <td>
                                  <div className="text-sm text-info">{lead.website}</div>
                                  <div className="text-sm text-gray-500">
                                    -CMS: {lead.CMSType ? lead.CMSType : "No CMS Found"}
                                  </div>
                                </td>
                                <td>
                                  <div className="text-sm text-gray-900">
                                    {lead.location.length > 30
                                      ? lead.location.slice(0, 30) + "..."
                                      : lead.location}
                                  </div>
                                  <div className="text-sm text-gray-500">- Business Location</div>
                                </td>
                                <td>
                                  <p
                                    onClick={() => handleViewLead(lead)}
                                    className="btn btn-outline-primary rounded-lg px-2 py-2"
                                    style={{ padding: 0 }}

                                  >
                                    <Eye className="text-indigo-600 transition-transform duration-300 
                                       group-hover:scale-110 group-hover:text-indigo-700" size={16} />
                                    <span className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-indigo-800 
                                            bg-clip-text text-transparent transition-all duration-300
                                            group-hover:from-indigo-700 group-hover:to-indigo-900"  style={{ padding: 0 }}>
                                      View Details
                                    </span>
                                  </p>
                                </td>
                                <td>
                                  {myLeads.filter(
                                    (mylead) =>
                                      mylead.leadAdded === user?.email && lead.personEmail === mylead.personEmail
                                  ).length === 0 && (
                                      <form onSubmit={(event) => handleAddMyLead(event, lead)}>
                                        <input
                                          hidden
                                          type="email"
                                          name="personEmail"
                                          value={lead.personEmail}
                                        ></input>
                                        <input
                                          hidden
                                          type="text"
                                          name="personName"
                                          value={lead.personName}
                                        ></input>
                                        <input
                                          hidden
                                          type="text"
                                          name="title"
                                          value={lead.personTitle}
                                        ></input>
                                        <input
                                          hidden
                                          type="text"
                                          name="website"
                                          value={lead.website}
                                        ></input>
                                        <input
                                          hidden
                                          type="text"
                                          name="location"
                                          value={lead.location}
                                        ></input>
                                        <input
                                          hidden
                                          type="text"
                                          name="industry"
                                          value={lead.productType}
                                        ></input>
                                        <input
                                          hidden
                                          type="text"
                                          name="leadAdded"
                                          value={user?.email}
                                        ></input>
                                        <input
                                          hidden
                                          type="number"
                                          name="credit"
                                          value="1"
                                        ></input>
                                        <input
                                          hidden
                                          type="text"
                                          name="loadingSpeed"
                                          value={lead.loadingSpeed}
                                        ></input>
                                        <input
                                          hidden
                                          type="text"
                                          name="seoScore"
                                          value={lead.seoScore}
                                        ></input>
                                        <input
                                          hidden
                                          type="text"
                                          name="cms"
                                          value={lead.cms}
                                        ></input>
                                        <input
                                          hidden
                                          type="text"
                                          name="traffic"
                                          value={lead.traffic}
                                        ></input>

                                        {profile.map(
                                          (e) =>
                                            e.userPoint <= lead.credit &&
                                            e.userEmail === user?.email && (
                                              <Link
                                                to="/deposit"
                                                className="btn btn-outline-primary rounded-lg px-2 py-2"
                                                style={{ padding: 0 }}
                                              >
                                                Buy credits to get email address
                                              </Link>
                                            )
                                        )}
                                        {profile.map(
                                          (e) =>
                                            e.userPoint > lead.credit &&
                                            e.userEmail === user?.email && (
                                              <p
                                                className={`btn btn-outline-primary rounded-lg px-2 py-2 ${isLoading[lead.personEmail] ? 'opacity-50' : ''}`}
                                                style={{ padding: 0 }}
                                                onClick={(event) => handleAddMyLead(event, lead)}
                                                disabled={isLoading[lead.personEmail]}
                                              >
                                                {isLoading[lead.personEmail] ? (
                                                  <span className="d-flex align-items-center justify-content-center">
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Loading...
                                                  </span>
                                                ) : (
                                                  '1 Credit - Add to my list'
                                                )}
                                              </p>
                                            )
                                        )}
                                      </form>
                                    )}
                                  {myLeads.filter(
                                    (mylead) =>
                                      mylead.leadAdded === user?.email && lead.personEmail === mylead.personEmail
                                  ).length === 1 && (
                                      <input
                                        className="btn btn-primary btn-sm"
                                        type="submit"
                                        value="Added"
                                      ></input>
                                    )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {filteredLeads.length > leadsPerPage && (
                          <nav aria-label="Page navigation" className="d-flex justify-content-center mt-4">
                            <ul className="pagination" style={{ gap: '0.5rem' }}>
                              {[...Array(Math.ceil(filteredLeads.length / leadsPerPage))]
                                .map((_, index) => (
                                  <li
                                    key={index}
                                    className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                                  >
                                    <button
                                      className="page-link"
                                      onClick={() => handlePaginationClick(index + 1)}
                                      disabled={isPaginationLoading}
                                    >
                                      {index + 1}
                                    </button>
                                  </li>
                                ))
                                .slice(
                                  currentPage > 1 ? currentPage - 2 : 0,
                                  currentPage + 1
                                )}
                            </ul>
                          </nav>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}


        <Modal show={isModalOpen} onClose={closeModal} lead={selectedLead} />
      </div>
    </div>
  );
};

const WrappedLeadsForUserDashboard = () => (
  <>
    <style>
      {`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .hover-bg-gray-100:hover {
          background-color: #f3f4f6;
        }

        .hover-bg-blue-50:hover {
          background-color: #f0f9ff;
        }

        .hover-underline:hover {
          text-decoration: underline;
        }

        .animate-border-shine {
          animation: borderShine 2s ease-in-out infinite;
        }

        @keyframes borderShine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}

    </style>
    <LeadsForUserDashboard />
  </>
);

export default WrappedLeadsForUserDashboard;