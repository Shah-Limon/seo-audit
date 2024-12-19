import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";

const TestimonialsList = () => {
  const navigate = useNavigate();
  const [testimonial, setTestimonial] = useState([]);
  const [title, setTitle] = useState([]);
  const [user] = useAuthState(auth);
  const { id } = useParams();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetch(`http://localhost:5000/testimonials`)
      .then((res) => res.json())
      .then((info) => setTestimonial(info));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/testimonials-title/`)
      .then((res) => res.json())
      .then((info) => setTitle(info));
  }, [id]);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = testimonial.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(testimonial.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleImageUpload = async (event) => {
    const imgbbApiKey = "9b9a8d0dcddf9fdbc0d69db3ef376eac";
    const file = event.target.files[0];
    setImageFile(file);
    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.success) {
        setImagePreview(data.data.url);
        setUploading(false);
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      setUploading(false);
    }
  };

  const handleTestimonials = (event) => {
    event.preventDefault();
    const testimonialData = {
      personName: event.target.personName.value,
      personTitle: event.target.personTitle.value,
      personImg: imagePreview,
      desc: event.target.desc.value,
    };

    fetch(`http://localhost:5000/testimonial`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(testimonialData),
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/admin/setting-homepage/");
      });
  };

  const containerStyle = {
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    padding: '2rem 0'
  };

  const cardStyle = {
    borderRadius: '15px',
    border: 'none',
    boxShadow: '0 0 20px rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease',
    backgroundColor: '#ffffff'
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
    color: 'white',
    borderRadius: '15px 15px 0 0',
    padding: '1.5rem',
    marginBottom: '1rem'
  };

  const inputStyle = {
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    padding: '0.75rem',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    backgroundColor: '#f8fafc'
  };

  const fileInputStyle = {
    ...inputStyle,
    padding: '0.5rem'
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
    border: 'none',
    padding: '0.75rem 2rem',
    borderRadius: '30px',
    color: 'white',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(99, 102, 241, 0.25)'
  };

  const tableStyle = {
    borderRadius: '10px',
    overflow: 'hidden',
    border: '1px solid #e2e8f0'
  };

  const paginationContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    borderTop: '1px solid #e2e8f0'
  };

  const paginationButtonStyle = {
    padding: '0.5rem 1rem',
    margin: '0 0.25rem',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#ffffff',
    color: '#6366F1',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '500'
  };

  const activePageStyle = {
    ...paginationButtonStyle,
    backgroundColor: '#6366F1',
    color: '#ffffff',
    border: 'none'
  };

  const selectStyle = {
    padding: '0.5rem',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    marginLeft: '0.5rem',
    marginRight: '0.5rem'
  };

  return (
    <div style={containerStyle}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            {/* Add New Testimonial Card */}
            <div style={cardStyle} className="mb-5">
              <div style={headerStyle}>
                <h3 className="m-0 text-center">Add New Testimonial</h3>
              </div>
              <div style={{ padding: '2rem' }}>
                <form onSubmit={handleTestimonials}>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="form-group mb-4">
                        <label className="mb-2">Person Name</label>
                        <input
                          type="text"
                          className="form-control"
                          style={inputStyle}
                          name="personName"
                          placeholder="Enter person's name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-4">
                        <label className="mb-2">Person Title</label>
                        <input
                          type="text"
                          className="form-control"
                          style={inputStyle}
                          name="personTitle"
                          placeholder="Enter person's title"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mb-4">
                        <label className="mb-2">Upload Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          className="form-control"
                          style={fileInputStyle}
                          onChange={handleImageUpload}
                        />
                        {uploading && (
                          <div className="text-center mt-2">
                            <div className="spinner-border text-primary" role="status">
                              <span className="visually-hidden">Uploading...</span>
                            </div>
                          </div>
                        )}
                        {imagePreview && (
                          <div className="mt-2">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              style={imagePreviewStyle}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mb-4">
                        <label className="mb-2">Description</label>
                        <textarea
                          className="form-control"
                          style={inputStyle}
                          name="desc"
                          placeholder="Enter testimonial description"
                          rows="4"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-4">
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
                      Add Testimonial
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Testimonial List Card */}
            <div style={cardStyle}>
              <div style={headerStyle} className="d-flex justify-content-between align-items-center">
                <h3 className="m-0">Testimonial List</h3>
                {title.map((e) => (
                  <Link
                    key={e._id}
                    to={`/admin/edit-testimonial-title/${e._id}`}
                    style={{
                      ...buttonStyle,
                      backgroundColor: 'transparent',
                      border: '2px solid white'
                    }}
                  >
                    Update Title
                  </Link>
                ))}
              </div>
              <div style={{ padding: '2rem' }}>
                <div style={tableStyle} className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr style={{ backgroundColor: '#f8fafc' }}>
                        <th style={{ padding: '1rem' }}>#</th>
                        <th style={{ padding: '1rem' }}>Image</th>
                        <th style={{ padding: '1rem' }}>Person Name</th>
                        <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((item, index) => (
                        <tr key={item._id}>
                          <td style={{ padding: '1rem' }}>{indexOfFirstItem + index + 1}</td>
                          <td style={{ padding: '1rem' }}>
                            {item.personImg && (
                              <img
                                src={item.personImg}
                                alt={item.personName}
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  borderRadius: '50%',
                                  objectFit: 'cover'
                                }}
                              />
                            )}
                          </td>
                          <td style={{ padding: '1rem' }}>{item.personName}</td>
                          <td style={{ padding: '1rem', textAlign: 'right' }}>
                            <Link
                              to={`/admin/testimonial-edit/${item._id}`}
                              style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                color: '#6366F1',
                                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease'
                              }}
                              onMouseOver={(e) => {
                                e.target.style.backgroundColor = 'rgba(99, 102, 241, 0.2)';
                              }}
                              onMouseOut={(e) => {
                                e.target.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
                              }}
                            >
                              Edit
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Pagination Controls */}
                  <div style={paginationContainerStyle}>
                    

                    <div>
                      <button
                        style={{
                          ...paginationButtonStyle,
                          opacity: currentPage === 1 ? 0.5 : 1,
                        }}
                        onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>

                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index + 1}
                          style={
                            currentPage === index + 1
                              ? activePageStyle
                              : paginationButtonStyle
                          }
                          onClick={() => paginate(index + 1)}
                        >
                          {index + 1}
                        </button>
                      ))}

                      <button
                        style={{
                          ...paginationButtonStyle,
                          opacity: currentPage === totalPages ? 0.5 : 1,
                        }}
                        onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </div>

                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsList;