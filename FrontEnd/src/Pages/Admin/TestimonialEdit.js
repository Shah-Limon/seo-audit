import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";

const TestimonialEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [testimonial, setTestimonial] = useState([]);
  const [user] = useAuthState(auth);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/testimonial/${id}`)
      .then((res) => res.json())
      .then((info) => setTestimonial(info));
  }, [id]);

  useEffect(() => {
    if (testimonial.personImg) {
      setImagePreview(testimonial.personImg);
    }
  }, [testimonial.personImg]);

  const handleImageUpload = async (event) => {
    const imgbbApiKey = "9b9a8d0dcddf9fdbc0d69db3ef376eac";
    const formData = new FormData();
    formData.append("image", event.target.files[0]);

    try {
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=" + imgbbApiKey,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      const imageUrl = data.data.url;
      setImagePreview(imageUrl);
      setImageFile(null);
      setTestimonial((prevTestimonial) => ({
        ...prevTestimonial,
        personImg: imageUrl,
      }));
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleTestimonial = (event) => {
    event.preventDefault();
    const testimonialData = {
      personName: event.target.personName.value,
      personTitle: event.target.personTitle.value,
      personImg: testimonial.personImg,
      desc: event.target.desc.value,
    };

    fetch(`http://localhost:5000/testimonial/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(testimonialData),
    })
      .then((res) => res.json())
      .then(() => navigate("/admin/testimonials"));
  };

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    padding: '2rem 0'
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0 0 20px rgba(0,0,0,0.05)',
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto'
  };

  const headerStyle = {
    color: '#1a1a1a',
    fontSize: '24px',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '2rem'
  };

  const formGroupStyle = {
    marginBottom: '1.5rem'
  };

  const labelStyle = {
    color: '#4a5568',
    fontSize: '0.95rem',
    fontWeight: '500',
    marginBottom: '0.5rem',
    display: 'block'
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

  const fileInputStyle = {
    ...inputStyle,
    padding: '0.5rem',
    backgroundColor: '#ffffff'
  };

  const imagePreviewStyle = {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '10px',
    marginTop: '1rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
    color: 'white',
    padding: '0.75rem 2.5rem',
    borderRadius: '30px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(99, 102, 241, 0.25)',
    display: 'block',
    margin: '2rem auto 0'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={headerStyle}>Edit Testimonial</h2>
        <form onSubmit={handleTestimonial}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Person Name</label>
            <input
              type="text"
              style={inputStyle}
              placeholder="Enter Person Name"
              name="personName"
              defaultValue={testimonial.personName}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Person Title</label>
            <input
              type="text"
              style={inputStyle}
              placeholder="Enter Person Title"
              name="personTitle"
              defaultValue={testimonial.personTitle}
            />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Person Image</label>
            <input
              type="file"
              accept="image/*"
              style={fileInputStyle}
              onChange={(e) => {
                setImageFile(e.target.files[0]);
                handleImageUpload(e);
              }}
            />
            {(imageFile || imagePreview) && (
              <img
                src={imageFile ? URL.createObjectURL(imageFile) : imagePreview}
                alt="Preview"
                style={imagePreviewStyle}
              />
            )}
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>Description</label>
            <textarea
              type="text"
              style={inputStyle}
              placeholder="Type Testimonial Description"
              name="desc"
              defaultValue={testimonial.desc}
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
            Update Testimonial
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestimonialEdit;