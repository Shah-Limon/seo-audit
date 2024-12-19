import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';

const UpdateProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/profile/${id}`)
      .then((res) => res.json())
      .then((info) => {
        setProfile(info);
        setPreviewURL(info.profileImg);
      });
  }, [id]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    setIsUploading(true);
    let profileURL = profile.profileImg;

    try {
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        const response = await fetch("https://server.enjoywiki.com/image-server/upload", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (data.file && data.file.url) {
          profileURL = data.file.url;
          toast.success("Image uploaded successfully!");
        }
      } else if (event.target.profileURL.value) {
        profileURL = event.target.profileURL.value;
      }

      const userUpdate = {
        userName: event.target.userName.value,
        profileImg: profileURL,
      };

      const url = `http://localhost:5000/update-profile/${id}`;
      const updateResponse = await fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userUpdate),
      });

      if (updateResponse.ok) {
        toast.success("Profile updated successfully!");
        window.location.href = "/admin/dashboard";
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("Profile update failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '3rem 1rem'
    }}>
      <div style={{
        maxWidth: '500px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '2rem',
          borderBottom: '1px solid #e9ecef',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '600',
            color: '#2d3436',
            margin: 0
          }}>
            Update Profile
          </h2>
          <p style={{
            color: '#64748b',
            marginTop: '0.5rem',
            marginBottom: 0
          }}>
            Update your profile information and image
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdateProfile} style={{ padding: '2rem' }}>
          {/* Profile Image Upload */}
          <div style={{
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <div style={{
              position: 'relative',
              width: '120px',
              height: '120px',
              margin: '0 auto',
              marginBottom: '1rem'
            }}>
              <img
                src={previewURL || 'https://via.placeholder.com/120'}
                alt="Profile"
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid #e2e8f0'
                }}
              />
              <label
                htmlFor="imageUpload"
                style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                  backgroundColor: '#4361ee',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <i className="fas fa-camera" style={{ color: 'white', fontSize: '14px' }}></i>
              </label>
            </div>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <p style={{
              fontSize: '0.875rem',
              color: '#64748b',
              marginTop: '0.5rem'
            }}>
              Click the camera icon to update your profile picture
            </p>
          </div>

          {/* Name Input */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label 
              htmlFor="userName"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#4b5563'
              }}
            >
              Your Name
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={profile.userName}
              placeholder="Enter your full name"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                backgroundColor: 'white',
                transition: 'border-color 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4361ee'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              required
            />
          </div>

          {/* Image URL Input (Optional) */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label 
              htmlFor="profileURL"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#4b5563'
              }}
            >
              Profile Image URL (Optional)
            </label>
            <input
              type="text"
              id="profileURL"
              name="profileURL"
              placeholder="Enter image URL"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                backgroundColor: 'white',
                transition: 'border-color 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4361ee'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isUploading}
            style={{
              width: '100%',
              padding: '0.875rem',
              backgroundColor: isUploading ? '#94a3b8' : '#4361ee',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: isUploading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
            onMouseOver={(e) => !isUploading && (e.target.style.backgroundColor = '#3730a3')}
            onMouseOut={(e) => !isUploading && (e.target.style.backgroundColor = '#4361ee')}
          >
            {isUploading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Updating Profile...
              </>
            ) : (
              <>
                <i className="fas fa-save"></i>
                Update Profile
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;