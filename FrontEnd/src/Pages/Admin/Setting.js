import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BackToAdminDashboard from "./BackToAdminDashboard";

const Setting = () => {
  const { id } = useParams();
  const [contact, setContact] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/contact/`)
      .then((res) => res.json())
      .then((info) => setContact(info));
  }, [id]);

  return (
    <section
      style={{
        backgroundColor: "#f5f5f5",
        padding: "2rem 0",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div className="container">
        <BackToAdminDashboard />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
            marginTop: "2rem",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "0.5rem",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              padding: "1.5rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/14970/14970897.png"
                width={75}
                height={75}
                alt="Logo Setting"
              />
            </div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              <Link
                to="/admin/setting-general/"
                style={{
                  color: "#007bff",
                  textDecoration: "none",
                  "&:hover": {
                    color: "#0056b3",
                  },
                }}
              >
                Logo Setting
              </Link>
            </h3>
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "0.5rem",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              padding: "1.5rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/6212/6212786.png"
                width={75}
                height={75}
                alt="Footer Setting"
              />
            </div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              <Link
                to="/admin/setting-footer"
                style={{
                  color: "#007bff",
                  textDecoration: "none",
                  "&:hover": {
                    color: "#0056b3",
                  },
                }}
              >
                Footer Setting
              </Link>
            </h3>
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "0.5rem",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              padding: "1.5rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/8984/8984290.png"
                height={75}
                width={75}
                alt="Payment Setting"
              />
            </div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              <Link
                to="/admin/setting-payment"
                style={{
                  color: "#007bff",
                  textDecoration: "none",
                  "&:hover": {
                    color: "#0056b3",
                  },
                }}
              >
                Payment Setting
              </Link>
            </h3>
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "0.5rem",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              padding: "1.5rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/1116/1116310.png"
                width={75}
                height={75}
                alt="Home Page Setting"
              />
            </div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              <Link
                to="/admin/setting-homepage"
                style={{
                  color: "#007bff",
                  textDecoration: "none",
                  "&:hover": {
                    color: "#0056b3",
                  },
                }}
              >
                Home Page Setting
              </Link>
            </h3>
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "0.5rem",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              padding: "1.5rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/7021/7021220.png"
                height={75}
                width={75}
                alt="Contact Page Setting"
              />
            </div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              {contact.map((e) => (
                <Link
                  to={`/admin/edit-contact-page/${e._id}`}
                  style={{
                    color: "#007bff",
                    textDecoration: "none",
                    "&:hover": {
                      color: "#0056b3",
                    },
                  }}
                >
                  Contact Page Setting
                </Link>
              ))}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Setting;