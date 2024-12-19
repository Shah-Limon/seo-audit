import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

const UpdateLogo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleLogoUpload = async (event) => {
    event.preventDefault();
    const logoFile = event.target.logo.files[0];

    if (!logoFile) {
      toast.error("Please select a logo file to upload.");
      return;
    }

    if (!logoFile.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    try {
      const imgbbApiKey = "9b9a8d0dcddf9fdbc0d69db3ef376eac"; // Replace with your ImgBB API key
      const formData = new FormData();
      formData.append("image", logoFile);

      const imgbbResponse = await fetch(
        "https://api.imgbb.com/1/upload?key=" + imgbbApiKey,
        {
          method: "POST",
          body: formData,
        }
      );

      if (imgbbResponse.ok) {
        const imgbbData = await imgbbResponse.json();
        const logoUrl = imgbbData.data.url;

        const updateData = {
          logo: logoUrl,
        };

        const url = `http://localhost:5000/logo/${id}`;
        const updateResponse = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        });

        if (updateResponse.ok) {
          toast.success("Logo updated successfully!");
          navigate("/admin/setting-general/");
        } else {
          toast.error("Failed to update logo.");
        }
      } else {
        toast.error("Failed to upload logo to ImgBB.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while uploading the logo.");
    }
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#f8f9fa",
        padding: "3rem 1rem",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "2rem",
            borderBottom: "1px solid #e9ecef",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: "600",
              color: "#2d3436",
              marginBottom: "0.5rem",
            }}
          >
            Update Logo
          </h2>
          <p
            style={{
              color: "#64748b",
              marginBottom: 0,
            }}
          >
            Upload a new image for your logo
          </p>
        </div>

        <form className="form" onSubmit={handleLogoUpload} style={{ padding: "2rem" }}>
          <div className="form-group mb-3">
            <label
              htmlFor="logo"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#4b5563",
              }}
            >
              Upload Logo Image
            </label>
            <input
              type="file"
              className="form-control"
              id="logo"
              name="logo"
              accept="image/*"
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                fontSize: "1rem",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                backgroundColor: "white",
                transition: "border-color 0.2s ease",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#4361ee")}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary rounded-pill"
            style={{
              width: "100%",
              padding: "0.875rem",
              backgroundColor: "#4361ee",
              color: "#fff",
              border: "none",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
              "&:hover": {
                backgroundColor: "#3730a3",
              },
            }}
          >
            Upload Logo
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateLogo;