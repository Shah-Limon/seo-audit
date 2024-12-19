import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import BackToAdminDashboard from "./BackToAdminDashboard";

const EditAboutList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/about-service/${id}`)
      .then((res) => res.json())
      .then((info) => setSliders(info));
  }, [id]);

  const handleSlider = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const description = event.target.description.value;
    const img = event.target.img.value;
    const pointOne = event.target.pointOne.value;
    const pointTwo = event.target.pointTwo.value;
    const pointThree = event.target.pointThree.value;

    const footerSocial = {
      title,
      description,
      img,
      pointOne,
      pointTwo,
      pointThree
    };

    const url = `http://localhost:5000/edit-about-service/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(footerSocial),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/setting");
      });
  }

  return (
    <div 
      className="container-fluid py-5"
      style={{
        backgroundColor: '#f8f9fa',
        minHeight: '100vh'
      }}
    >
      <BackToAdminDashboard />
      <div 
        className="row justify-content-center mt-5"
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          padding: '2rem'
        }}
      >
        <div className="col-12">
          <h4 
            className="text-center mb-4" 
            style={{
              color: '#333',
              fontWeight: '600',
              borderBottom: '2px solid #007bff',
              paddingBottom: '0.5rem'
            }}
          >
            Update About Section
          </h4>
          <form onSubmit={handleSlider}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  placeholder="Enter Title"
                  name="title"
                  defaultValue={sliders.title}
                  style={{
                    borderColor: '#007bff',
                    boxShadow: 'none'
                  }}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="img" className="form-label">Image URL</label>
                <input
                  type="text"
                  id="img"
                  className="form-control"
                  placeholder="Enter Image URL"
                  name="img"
                  defaultValue={sliders.img}
                  style={{
                    borderColor: '#007bff',
                    boxShadow: 'none'
                  }}
                />
              </div>
              <div className="col-12">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  id="description"
                  className="form-control"
                  placeholder="Enter Description"
                  name="description"
                  defaultValue={sliders.description}
                  rows="4"
                  style={{
                    borderColor: '#007bff',
                    boxShadow: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="pointOne" className="form-label">Point One</label>
                <input
                  type="text"
                  id="pointOne"
                  className="form-control"
                  placeholder="Enter Point One"
                  name="pointOne"
                  defaultValue={sliders.pointOne}
                  style={{
                    borderColor: '#007bff',
                    boxShadow: 'none'
                  }}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="pointTwo" className="form-label">Point Two</label>
                <input
                  type="text"
                  id="pointTwo"
                  className="form-control"
                  placeholder="Enter Point Two"
                  name="pointTwo"
                  defaultValue={sliders.pointTwo}
                  style={{
                    borderColor: '#007bff',
                    boxShadow: 'none'
                  }}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="pointThree" className="form-label">Point Three</label>
                <input
                  type="text"
                  id="pointThree"
                  className="form-control"
                  placeholder="Enter Point Three"
                  name="pointThree"
                  defaultValue={sliders.pointThree}
                  style={{
                    borderColor: '#007bff',
                    boxShadow: 'none'
                  }}
                />
              </div>
              <div className="col-12 text-center mt-4">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg rounded-pill px-5"
                  style={{
                    backgroundColor: '#007bff',
                    border: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.backgroundColor = '#0056b3';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.backgroundColor = '#007bff';
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAboutList;