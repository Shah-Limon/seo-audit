import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BackToAdminDashboard from "./BackToAdminDashboard";

const FooterEdit = () => {
  const { id } = useParams();
  const [footerLink, setFooterLink] = useState([]);
  const [social, setSocial] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/footer-links/`)
      .then((res) => res.json())
      .then((info) => setFooterLink(info));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:5000/footer-social/`)
      .then((res) => res.json())
      .then((info) => setSocial(info));
  }, [id]);

  return (
    <section style={{ padding: "2rem 0", backgroundColor: "#f8f9fa" }}>
      <div className="container">
        <BackToAdminDashboard />
        <div className="row">
          <div className="col-12">
            <div
              className="card shadow-sm border-0 mb-4"
              style={{ borderRadius: "8px" }}
            >
              <div
                className="card-body"
                style={{ padding: "2rem", backgroundColor: "#fff" }}
              >
                <h2
                  style={{
                    marginBottom: "1.5rem",
                    fontWeight: "600",
                    color: "#343a40",
                  }}
                >
                  Footer Settings
                </h2>
                <p style={{ color: "#6c757d" }}>
                  Manage your footer links and social media options
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-lg-4 mb-4">
            <div
              className="card shadow-sm border-0 h-100"
              style={{ borderRadius: "8px" }}
            >
              <div
                className="card-body text-center"
                style={{ padding: "2rem" }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/9195/9195144.png"
                  alt="Contact Options"
                  style={{ width: "75px", height: "75px", marginBottom: "1rem" }}
                />
                <h3
                  style={{
                    fontSize: "1.25rem",
                    marginBottom: "1rem",
                    fontWeight: "500",
                    color: "#343a40",
                  }}
                >
                  Contact Options
                </h3>
                {social.map((e) => (
                  <Link
                    key={e._id}
                    to={`/admin/edit-social/${e._id}`}
                    className="btn btn-primary btn-sm rounded-pill"
                    style={{
                      marginTop: "0.5rem",
                      padding: "0.4rem 1rem",
                      fontSize: "0.875rem",
                    }}
                  >
                    Edit
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4 mb-4">
            <div
              className="card shadow-sm border-0 h-100"
              style={{ borderRadius: "8px" }}
            >
              <div
                className="card-body text-center"
                style={{ padding: "2rem" }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/9111/9111543.png"
                  alt="Footer About Options"
                  style={{ width: "75px", height: "75px", marginBottom: "1rem" }}
                />
                <h3
                  style={{
                    fontSize: "1.25rem",
                    marginBottom: "1rem",
                    fontWeight: "500",
                    color: "#343a40",
                  }}
                >
                  Footer About Options
                </h3>
                {footerLink.map((e) => (
                  <Link
                    key={e._id}
                    to={`/admin/edit-footer/${e._id}`}
                    className="btn btn-primary btn-sm rounded-pill"
                    style={{
                      marginTop: "0.5rem",
                      padding: "0.4rem 1rem",
                      fontSize: "0.875rem",
                    }}
                  >
                    Edit
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterEdit;
