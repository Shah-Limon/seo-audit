import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import BackToAdminDashboard from "./BackToAdminDashboard";

const EditFeaturesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feature, setFeature] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/features`)
      .then((res) => res.json())
      .then((info) => setFeature(info));
  }, []);

  const [title, setTitle] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/features-title`)
      .then((res) => res.json())
      .then((info) => setTitle(info[0]));
  }, [id]);

  let rowNumber = 1;

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleFeature = async (event) => {
    event.preventDefault();

    const featureDesc = event.target.featureDesc.value;
    const featureTitle = event.target.featureTitle.value;

    if (!image) {
      alert("Please select an image for the service page.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    // Upload the image to ImgBB using the ImgBB API key
    const imgbbApiKey = "9b9a8d0dcddf9fdbc0d69db3ef376eac";
    const imgbbUploadUrl = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

    try {
      const response = await fetch(imgbbUploadUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const featureImg = data.data.url;
        const feature = {
          featureDesc,
          featureTitle,
          featureImg,
        };

        const url = `http://localhost:5000/add-feature`;
        const sliderResponse = await fetch(url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(feature),
        });

        if (sliderResponse.ok) {
          navigate("/admin/setting-homepage/");
        } else {
          alert("Failed to add feature.");
        }
      } else {
        alert("Image upload failed.");
      }
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  return (
    <div
      className="container-fluid px-4 py-4"
      style={{
        backgroundColor: '#f8f9fa',
        minHeight: '100vh'
      }}
    >
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <BackToAdminDashboard />
          <Link
            to={`/admin/feature-title/${title._id}`}
            className="btn btn-outline-primary"
            style={{
              borderRadius: '20px',
              fontWeight: 500
            }}
          >
            Edit Feature Title
          </Link>
        </div>
      </div>

      <div
        className="card shadow-sm mb-4"
        style={{
          borderRadius: '12px',
          overflow: 'hidden'
        }}
      >
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0" style={{ fontWeight: 600 }}>Add Features</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleFeature}>
            <div className="row g-3">
              <div className="col-md-12">
                <label className="form-label">Feature Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Feature Title"
                  name="featureTitle"
                  required
                  style={{
                    borderRadius: '8px',
                    padding: '10px 15px'
                  }}
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Feature Short Description</label>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Enter Feature Short Description"
                  name="featureDesc"
                  required
                  style={{
                    borderRadius: '8px',
                    padding: '10px 15px'
                  }}
                />
              </div>
              <div className="col-12">
                <label className="form-label">Upload Feature Image</label>
                <input
                  className="form-control"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  required
                  style={{
                    borderRadius: '8px'
                  }}
                />
              </div>
              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  style={{
                    borderRadius: '8px',
                    padding: '12px',
                    fontWeight: 600
                  }}
                >
                  Add Feature
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div
        className="card shadow-sm"
        style={{
          borderRadius: '12px',
          overflow: 'hidden'
        }}
      >
        <div className="card-header bg-secondary text-white">
          <h5 className="mb-0" style={{ fontWeight: 600 }}>Features List</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th className="text-center">SL No.</th>
                  <th>Feature Title</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {feature.map((item) => (
                  <tr key={item._id}>
                    <td className="text-center">{rowNumber++}</td>
                    <td>{item.featureTitle}</td>
                    <td className="text-center">
                      <Link
                        to={`/admin/edit-feature/${item._id}`}
                        className="btn btn-sm btn-outline-primary"
                        style={{
                          borderRadius: '20px',
                          padding: '5px 15px'
                        }}
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFeaturesPage;