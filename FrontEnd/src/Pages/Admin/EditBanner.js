import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import BackToAdminDashboard from "./BackToAdminDashboard";

const EditBanner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/banner/`)
      .then((res) => res.json())
      .then((info) => setBanner(info));
  }, [id]);

  const [user] = useAuthState(auth);

  const handleBanner = (event) => {
    event.preventDefault();
    const bannerHeadingText1 = event.target.bannerHeadingText1.value;
    const bannerImageMain = event.target.bannerImageMain.value;
    const bannerImageLeft = event.target.bannerImageLeft.value;
    const bannerImageRight = event.target.bannerImageRight.value;
    const bannerText = event.target.bannerText.value;

    const updateBanner = {
      bannerHeadingText1,
      bannerImageMain,
      bannerText,
      bannerImageLeft,
      bannerImageRight
    };

    const url = `http://localhost:5000/edit-banner/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateBanner),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/setting-homepage/");
      });
  };

  return (
    <div className="container-fluid py-5" style={{
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <BackToAdminDashboard />

      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0 rounded-lg" style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '15px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div className="card-header" style={{

              color: 'white',
              textAlign: 'center',
              padding: '1rem',
              marginBottom: '1.5rem',
              borderRadius: '10px 10px 0 0'
            }}>
              <h2 className="mb-0">Edit Banner Details</h2>
            </div>

            <form onSubmit={handleBanner} className="px-3">
              {banner.map((e) => (
                <div key={e._id}>
                  {/* Banner Title Input */}
                  <div className="form-group mb-4">
                    <label htmlFor="bannerHeadingText1" className="form-label">
                      Banner Title
                    </label>
                    <input
                      type="text"
                      id="bannerHeadingText1"
                      name="bannerHeadingText1"
                      className="form-control"
                      placeholder="Enter Banner Title"
                      defaultValue={e.bannerHeadingText1}
                      style={{
                        borderRadius: '8px',
                        padding: '0.75rem',
                        border: '1px solid #ced4da'
                      }}
                      required
                    />
                  </div>

                  {/* Banner Image Input */}
                  <div className="form-group mb-4">
                    <label htmlFor="bannerImage" className="form-label">
                      Banner Image Main URL 
                    </label>
                    <input
                      type="text"
                      id="bannerImageMain"
                      name="bannerImageMain"
                      className="form-control"
                      placeholder="Enter Image URL"
                      defaultValue={e.bannerImageMain}
                      style={{
                        borderRadius: '8px',
                        padding: '0.75rem',
                        border: '1px solid #ced4da'
                      }}
                      required
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label htmlFor="bannerImage" className="form-label">
                      Banner Image left URL
                    </label>
                    <input
                      type="text"
                      id="bannerImage"
                      name="bannerImageLeft"
                      className="form-control"
                      placeholder="Enter Image URL"
                      defaultValue={e.bannerImageLeft}
                      style={{
                        borderRadius: '8px',
                        padding: '0.75rem',
                        border: '1px solid #ced4da'
                      }}
                      required
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="bannerImage" className="form-label">
                      Banner Image Right URL
                    </label>
                    <input
                      type="text"
                      id="bannerImage"
                      name="bannerImageRight"
                      className="form-control"
                      placeholder="Enter Image URL"
                      defaultValue={e.bannerImageRight}
                      style={{
                        borderRadius: '8px',
                        padding: '0.75rem',
                        border: '1px solid #ced4da'
                      }}
                      required
                    />
                  </div>

                  {/* Banner Paragraph Input */}
                  <div className="form-group mb-4">
                    <label htmlFor="bannerText" className="form-label">
                      Banner Description
                    </label>
                    <textarea
                      id="bannerText"
                      name="bannerText"
                      className="form-control"
                      placeholder="Enter Banner Description"
                      defaultValue={e.bannerText}
                      rows="4"
                      style={{
                        borderRadius: '8px',
                        padding: '0.75rem',
                        border: '1px solid #ced4da',
                        resize: 'vertical'
                      }}
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="text-center mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      style={{
                        backgroundColor: '#007bff',
                        border: 'none',
                        borderRadius: '50px',
                        padding: '0.75rem 2rem',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'scale(1.05)';
                        e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      Update Banner
                    </button>
                  </div>
                </div>
              ))}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBanner;