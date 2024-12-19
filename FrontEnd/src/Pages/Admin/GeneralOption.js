import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import BackToAdminDashboard from "./BackToAdminDashboard";

const GeneralOption = () => {
  const { id } = useParams();
  const [logo, setLogo] = useState([]);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    fetch(`http://localhost:5000/logo`)
      .then((res) => res.json())
      .then((info) => setLogo(info));
  }, []);

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
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        <BackToAdminDashboard />
        <div style={{ padding: "2rem", borderBottom: "1px solid #e9ecef" }}>
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: "600",
              color: "#2d3436",
              marginBottom: "0.5rem",
            }}
          >
            Logo Options
          </h2>
          <p
            style={{
              color: "#64748b",
              marginBottom: 0,
            }}
          >
            Manage your logo settings
          </p>
        </div>

        <div style={{ padding: "2rem" }}>
          {logo.map((logoImg) => (
            <div
              key={logoImg._id}
              style={{
                marginBottom: "2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                className="footer__logo"
                src={logoImg.logo}
                alt=""
                style={{
                  width: "160px",
                  height: "38px",
                  marginBottom: "1rem",
                }}
              />
              <p
                style={{
                  color: "#64748b",
                  marginBottom: "1rem",
                }}
              >
                Logo Size: width="160px" height: "38px"
              </p>
              <Link
                to={`/admin/update-logo/${logoImg._id}`}
                className="btn btn-primary rounded-pill"
                style={{
                  backgroundColor: "#4361ee",
                  color: "#fff",
                  border: "none",
                  padding: "0.5rem 1.5rem",
                  fontSize: "0.875rem",
                  fontWeight: "bold",
                  textDecoration: "none",
                  transition: "background-color 0.2s ease",
                  "&:hover": {
                    backgroundColor: "#3730a3",
                  },
                }}
              >
                Update Logo
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GeneralOption;