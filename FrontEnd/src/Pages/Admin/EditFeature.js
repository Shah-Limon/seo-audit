import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackToAdminDashboard from "./BackToAdminDashboard";

const EditFeature = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feature, setFeature] = useState({});
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/feature/${id}`)
      .then((res) => res.json())
      .then((info) => {
        setFeature(info);
        if (info.featureImg) {
          setImagePreview(info.featureImg);
        }
      });
  }, [id]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleFeature = async (event) => {
    event.preventDefault();

    const featureDesc = event.target.featureDesc.value;
    const featureTitle = event.target.featureTitle.value;

    let featureImg = imagePreview;
    if (image) {
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
          featureImg = data.data.url;
        } else {
          alert("Image upload failed.");
          return;
        }
      } catch (error) {
        console.error("Error uploading image: ", error);
        return;
      }
    }

    const updatedFeature = {
      featureDesc,
      featureTitle,
      featureImg,
    };

    const url = `http://localhost:5000/feature/${id}`;
    try {
      const sliderResponse = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFeature),
      });

      if (sliderResponse.ok) {
        navigate("/admin/setting");
      } else {
        alert("Failed to update feature.");
      }
    } catch (error) {
      console.error("Error updating feature: ", error);
    }
  };

  return (
    <div className="container-fluid bg-light py-5">
      <div className="row">
        <div className="col-12 mb-4">
          <BackToAdminDashboard />
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white py-3">
              <h4 className="card-title mb-0 text-center">Edit Feature</h4>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleFeature}>
                <div className="mb-3">
                  <label htmlFor="featureTitle" className="form-label">Feature Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="featureTitle"
                    name="featureTitle"
                    placeholder="Enter Feature Title"
                    defaultValue={feature.featureTitle}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="featureDesc" className="form-label">Feature Description</label>
                  <textarea
                    className="form-control"
                    id="featureDesc"
                    name="featureDesc"
                    placeholder="Enter Feature Description"
                    rows="4"
                    defaultValue={feature.featureDesc}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="featureImage" className="form-label">Feature Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="featureImage"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>

                {imagePreview && (
                  <div className="mb-3 text-center">
                    <img 
                      src={imagePreview} 
                      alt="Feature Preview" 
                      className="img-fluid rounded shadow-sm"
                      style={{ 
                        maxHeight: '200px', 
                        objectFit: 'cover' 
                      }}
                    />
                  </div>
                )}

                <div className="d-grid">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg"
                  >
                    Update Feature
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFeature;