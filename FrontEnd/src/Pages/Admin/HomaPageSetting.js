import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackToAdminDashboard from "./BackToAdminDashboard";

const HomePageSetting = () => {
  const [banner, setBanner] = useState([]);
  const [features, setFeatures] = useState([]);
  const [about, setAbout] = useState([]);
  const [why, setWhy] = useState([]);
  const [road, setRoad] = useState([]);

  // Fetch data for different sections
  useEffect(() => {
    const endpoints = [
      { url: 'http://localhost:5000/banner/', setter: setBanner },
      { url: 'http://localhost:5000/features', setter: setFeatures },
      { url: 'http://localhost:5000/about', setter: setAbout },
      { url: 'http://localhost:5000/why-choose', setter: setWhy },
      { url: 'http://localhost:5000/road', setter: setRoad }
    ];

    endpoints.forEach(({ url, setter }) => {
      fetch(url)
        .then((res) => res.json())
        .then((info) => setter(info))
        .catch((error) => console.error(`Error fetching from ${url}:`, error));
    });
  }, []);

  // Card configuration
  const settingsCards = [
    {
      icon: "https://cdn-icons-png.flaticon.com/512/3541/3541375.png",
      heading: "Update Banner",
      link: banner.length > 0 ? `/admin/edit-banner-option/${banner[0]._id}` : "/admin/edit-banner-option"
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/13731/13731314.png",
      heading: "Feature Options",
      link: "/admin/feature-page/"
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/10306/10306666.png",
      heading: "About Options",
      link: "/admin/about-service-list/"
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/10306/10306666.png",
      heading: "Why Choose Option",
      link: why.length > 0 ? `/admin/why-choose-edit/${why[0]._id}` : ""
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/10306/10306666.png",
      heading: "Cta Option",
      link: road.length > 0 ? `/admin/cta-edit/${road[0]._id}` : ""
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/512/2013/2013695.png",
      heading: "Update Testimonials",
      link: "/admin/testimonials"
    }
  ];

  return (
    <div style={{
      backgroundColor: '#f4f6f9',
      minHeight: '100vh',
      padding: '2rem 0'
    }}>
      <div className="container">
        <BackToAdminDashboard />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem'
          }}
        >
          {settingsCards.map((card, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                padding: '1.5rem',
                textAlign: 'center',
                transition: 'transform 0.3s ease',
                hover: { transform: 'scale(1.05)' }
              }}
            >
              <div
                style={{
                  backgroundColor: '#f0f4f8',
                  borderRadius: '50%',
                  width: '100px',
                  height: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}
              >
                <img
                  src={card.icon}
                  alt={`${card.heading} icon`}
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'contain'
                  }}
                />
              </div>
              <h5
                style={{
                  color: '#2c3e50',
                  marginBottom: '1rem',
                  fontSize: '1.25rem',
                  fontWeight: '600'
                }}
              >
                {card.heading}
              </h5>
              <Link
                to={card.link}
                style={{
                  display: 'inline-block',
                  backgroundColor: '#3498db',
                  color: 'white',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '25px',
                  textDecoration: 'none',
                  fontWeight: '500',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePageSetting;