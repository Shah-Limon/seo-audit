import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import BackToAdminDashboard from "./BackToAdminDashboard";

const TestimonialTitle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/testimonial-title/${id}`)
      .then((res) => res.json())
      .then((info) => setTitle(info));
  }, [id]);

  const handleTitle = (event) => {
    event.preventDefault();
    const titleOne = event.target.titleOne.value;
    const img = event.target.img.value;

    const testimonialTitle = {
      titleOne,
      img,
    };

    const url = `http://localhost:5000/testimonial-title/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(testimonialTitle),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/setting-homepage/");
      });
  };

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    paddingTop: '2rem',
    paddingBottom: '2rem'
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0 0 20px rgba(0,0,0,0.05)',
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
    marginTop: '2rem'
  };

  const headerStyle = {
    fontSize: '24px',
    color: '#1a1a1a',
    marginBottom: '1.5rem',
    textAlign: 'center',
    fontWeight: '600'
  };

  const inputGroupStyle = {
    marginBottom: '1.5rem'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#4a5568',
    fontSize: '0.95rem',
    fontWeight: '500'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    outline: 'none'
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
    color: 'white',
    padding: '0.75rem 2rem',
    borderRadius: '30px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(99, 102, 241, 0.25)',
    display: 'block',
    margin: '2rem auto 0',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      <BackToAdminDashboard />
      
      <div style={cardStyle}>
        <h2 style={headerStyle}>Update Testimonial Title</h2>
        
        <form onSubmit={handleTitle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Title</label>
            <input
              type="text"
              style={inputStyle}
              placeholder="Enter Title"
              name="titleOne"
              defaultValue={title.titleOne}
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Image URL</label>
            <input
              type="text"
              style={inputStyle}
              placeholder="Enter Image URL"
              name="img"
              defaultValue={title.img}
            />
          </div>

          <button 
            type="submit" 
            style={buttonStyle}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 8px rgba(99, 102, 241, 0.35)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 6px rgba(99, 102, 241, 0.25)';
            }}
          >
            Update Title
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestimonialTitle;