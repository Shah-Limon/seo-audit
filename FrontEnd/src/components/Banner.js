import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import auth from "../firebase.init";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const STORAGE_KEY = 'searchResults';
const STORAGE_TIMESTAMP_KEY = 'searchResultsTimestamp';
const LEADS_STORAGE_KEY = 'leadsData';
const LEADS_TIMESTAMP_KEY = 'leadsTimestamp';
const BANNER_STORAGE_KEY = 'bannerData';
const BANNER_TIMESTAMP_KEY = 'bannerTimestamp';
const STORAGE_DURATION = 3 * 60 * 60 * 1000; // 3 hours in milliseconds

const Banner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [banner, setBanner] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);

  // Generic function to check if stored data is valid
  const isStoredDataValid = (timestampKey) => {
    const savedTimestamp = localStorage.getItem(timestampKey);
    if (!savedTimestamp) return false;
    
    const timestamp = parseInt(savedTimestamp);
    const currentTime = new Date().getTime();
    return currentTime - timestamp < STORAGE_DURATION;
  };

  // Generic function to save data to localStorage
  const saveToLocalStorage = (key, timestampKey, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      localStorage.setItem(timestampKey, new Date().getTime().toString());
    } catch (error) {
      console.error(`Error saving to localStorage for ${key}:`, error);
    }
  };

  // Generic function to load data from localStorage
  const loadFromLocalStorage = (key, timestampKey) => {
    if (isStoredDataValid(timestampKey)) {
      const savedData = localStorage.getItem(key);
      if (savedData) {
        return JSON.parse(savedData);
      }
    }
    // Clear expired data
    localStorage.removeItem(key);
    localStorage.removeItem(timestampKey);
    return null;
  };

  // Load banner data
  useEffect(() => {
    const loadBannerData = async () => {
      const storedBanner = loadFromLocalStorage(BANNER_STORAGE_KEY, BANNER_TIMESTAMP_KEY);
      if (storedBanner) {
        setBanner(storedBanner);
      } else {
        try {
          const response = await fetch(`http://localhost:5000/banner/`);
          const info = await response.json();
          setBanner(info[0]);
          saveToLocalStorage(BANNER_STORAGE_KEY, BANNER_TIMESTAMP_KEY, info[0]);
        } catch (error) {
          console.error('Error fetching banner data:', error);
        }
      }
    };

    loadBannerData();
  }, []);

  // Load leads data
  useEffect(() => {
    const loadLeadsData = async () => {
      const storedLeads = loadFromLocalStorage(LEADS_STORAGE_KEY, LEADS_TIMESTAMP_KEY);
      if (storedLeads) {
        setLeads(storedLeads);
      } else {
        try {
          const response = await fetch('/assets/lead.json');
          const data = await response.json();
          setLeads(data);
          saveToLocalStorage(LEADS_STORAGE_KEY, LEADS_TIMESTAMP_KEY, data);
        } catch (error) {
          console.error('Error fetching leads data:', error);
        }
      }
    };

    loadLeadsData();
  }, []);

  // Load saved search results
  useEffect(() => {
    const storedResults = loadFromLocalStorage(STORAGE_KEY, STORAGE_TIMESTAMP_KEY);
    if (storedResults) {
      setSearchResults(storedResults);
      if (storedResults.length > 0) {
        setShowTable(true);
      }
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowTable(false);
      return;
    }

    setIsLoading(true);
    setShowTable(false);

    setTimeout(() => {
      const filteredLeads = leads.filter((lead) =>
        lead.personTitle.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const shuffledResults = [...filteredLeads].sort(() => Math.random() - 0.5);
      const limitedResults = shuffledResults.slice(0, 10);

      setSearchResults(limitedResults);
      saveToLocalStorage(STORAGE_KEY, STORAGE_TIMESTAMP_KEY, limitedResults);
      setIsLoading(false);
      setShowTable(true);
    }, 1000);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (!e.target.value.trim()) {
      setSearchResults([]);
      setShowTable(false);
    }
  };

  const ResultRow = ({ lead, index, isBlurred }) => (
    <tr style={{ opacity: isBlurred ? 0.7 : 1 }}>
      <td style={{
        padding: '15px',
        verticalAlign: 'middle',
        filter: isBlurred ? 'blur(4px)' : 'none'
      }}>{index + 1}</td>
      <td style={{
        padding: '15px',
        verticalAlign: 'middle',
        filter: isBlurred ? 'blur(4px)' : 'none'
      }}>
        {lead.personName}
        <br />
        <span style={{ color: '#7209B7' }}>- {lead.personTitle}</span>
      </td>
      <td style={{
        padding: '15px',
        verticalAlign: 'middle',
        filter: isBlurred ? 'blur(4px)' : 'none'
      }}>
        {lead.personEmail}
        <br />
        <span style={{ color: '#00C614' }}>● Valid Email</span>
      </td>
      <td style={{
        padding: '15px',
        verticalAlign: 'middle',
        filter: isBlurred ? 'blur(4px)' : 'none'
      }}>
        {lead.website}
        <br />
        <span style={{ color: '#666' }}>-CMS: {lead.cms || '-'}</span>
      </td>
      <td style={{
        padding: '15px',
        verticalAlign: 'middle',
        filter: isBlurred ? 'blur(4px)' : 'none'
      }}>
        Loading Speed: {lead.loadingSpeed.charAt(0).toUpperCase() + lead.loadingSpeed.slice(1)}
        <br />
        SEO Score: <span style={{ color: '#7209B7' }}>{lead.seoScore}</span>
      </td>
    </tr>
  );

  return (
    <>
      <div
        className="banner-software text-center text-light"
        style={{ backgroundImage: "url(assets/img/shape/banner-1.jpg)" }}
      >
        <div className="container">
          <div className="content-box">
            <div className="row align-center">
              <div className="col-lg-8 offset-lg-2 info">
                <h2>
                  {banner.bannerHeadingText1?.split(' ').map((word, index) => {
                    if (index === 1) {
                      return <strong key={index}>{word} </strong>;
                    }
                    return word + ' ';
                  })}
                </h2>
                <p>
                  {banner.bannerText}
                </p>

                {/* Search Form */}
                {!user && <div className="search-form mt-4 mb-5">
                  <form onSubmit={handleSearch} className="d-flex justify-content-center">
                    <input
                      type="text"
                      className="form-control form-control-lg placeholder-gray-400 placeholder-italic"
                      style={{
                        maxWidth: "500px",
                        borderRadius: "30px 0 0 30px",
                        color: "#333",
                        paddingLeft: "15px",
                        fontSize: "15px",
                        fontWeight: "bold"
                      }}
                      placeholder="Search by Person Title (e.g., 'CEO', 'Manager')"
                      value={searchQuery}
                      onChange={handleInputChange}
                    />

                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      style={{ borderRadius: "0 30px 30px 0" }}
                    >
                      Search
                    </button>
                  </form>
                </div>}

                {isLoading && (
                  <div className="text-center mt-4">
                    <div className="spinner-border text-light" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
              </div>
              {showTable && searchResults.length > 0 && !isLoading && (
                <div className="search-results">
                  <div className="table-responsive">
                    <table className="table mb-0" style={{
                      background: 'white',
                      borderRadius: '8px',
                      overflow: 'hidden'
                    }}>
                      <thead>
                        <tr style={{ background: '#7209B7' }}>
                          <th style={{ color: 'white', padding: '15px', fontWeight: '500' }}>SL NO.</th>
                          <th style={{ color: 'white', padding: '15px', fontWeight: '500' }}>PERSON NAME</th>
                          <th style={{ color: 'white', padding: '15px', fontWeight: '500' }}>PERSON EMAIL</th>
                          <th style={{ color: 'white', padding: '15px', fontWeight: '500' }}>WEBSITE</th>
                          <th style={{ color: 'white', padding: '15px', fontWeight: '500' }}>PERFORMANCE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchResults.slice(0, 3).map((lead, index) => (
                          <ResultRow key={index} lead={lead} index={index} isBlurred={false} />
                        ))}

                        {searchResults.length > 3 && (
                          <>
                            {searchResults.slice(3, 10).map((lead, index) => (
                              <ResultRow key={index + 3} lead={lead} index={index + 3} isBlurred={true} />
                            ))}
                            <tr>
                              <td colSpan="5" className="position-relative p-0">
                                <div style={{
                                  position: 'absolute',
                                  bottom: '300px',
                                  left: '50%',
                                  transform: 'translate(-50%, -50%)',
                                  background: 'rgba(114, 9, 183, 0.95)',
                                  padding: '20px 40px',
                                  borderRadius: '8px',
                                  width: '80%',
                                  maxWidth: '400px',
                                  zIndex: 10
                                }}>
                                  <h4 style={{ color: 'white', marginBottom: '15px', fontWeight: '500' }}>
                                    Want to see more leads?
                                  </h4>
                                  <Link
                                    to="/register"
                                    style={{
                                      background: 'white',
                                      color: '#7209B7',
                                      padding: '10px 25px',
                                      borderRadius: '25px',
                                      textDecoration: 'none',
                                      fontWeight: '500',
                                      display: 'inline-block',
                                      transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                  >
                                    Sign Up Now
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              <div className="col-lg-10 offset-lg-1">
                <div className="thumb-inner">
                  <img
                    className="animate fadeInRight animated"
                    data-animate="fadeInRight"
                    src={banner.bannerImageMain}
                    alt="Thumb"
                    style={{ visibility: "visible" }}
                  />
                  <img
                    className="animate fadeInLeft animated"
                    data-animate="fadeInLeft"
                    data-delay="500ms"
                    src={banner.bannerImageRight}
                    alt="Thumb"
                    style={{ animationDelay: "500ms", visibility: "visible" }}
                  />
                  <img
                    className="animate fadeInLeft animated"
                    data-animate="fadeInLeft"
                    data-delay="300ms"
                    src={banner.bannerImageLeft}
                    alt="Thumb"
                    style={{ animationDelay: "300ms", visibility: "visible" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Banner;