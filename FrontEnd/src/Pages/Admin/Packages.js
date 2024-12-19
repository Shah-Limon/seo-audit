import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import BackToAdminDashboard from "./BackToAdminDashboard";

const Packages = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [title, setTitle] = useState([]);
  const [user] = useAuthState(auth);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/package-titles/`)
      .then((res) => res.json())
      .then((info) => setTitle(info));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:5000/packages`)
      .then((res) => res.json())
      .then((info) => setPackages(info));
  }, []);

  const handlePackagesTitle = (event) => {
    event.preventDefault();
    const titleTop = event.target.titleTop.value;
    const titleOne = event.target.titleOne.value;
    const titleTwo = event.target.titleTwo.value;
    const description = event.target.description.value;

    const packageTitle = {
      titleTop,
      titleOne,
      titleTwo,
      description,
    };

    const url = `http://localhost:5000/edit-package-title/`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(packageTitle),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/dashboard/");
      });
  };

  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      padding: '2rem 1rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header Section */}
        <div style={{
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <BackToAdminDashboard />
          
          {title.map((e) => (
            <Link 
              key={e._id}
              to={`/package-title-edit/${e._id}`}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#4361ee',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '50px',
                fontSize: '0.875rem',
                fontWeight: '500',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(event) => {
                event.currentTarget.style.backgroundColor = '#3730a3';
                event.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(event) => {
                event.currentTarget.style.backgroundColor = '#4361ee';
                event.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <i className="fas fa-edit"></i>
              <span>Edit Price Title</span>
            </Link>
          ))}
        </div>

        {/* Table Container */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              minWidth: '600px'
            }}>
              <thead>
                <tr style={{
                  backgroundColor: '#f8f9fa',
                  borderBottom: '2px solid #e9ecef'
                }}>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#4b5563'
                  }}>SL No.</th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#4b5563'
                  }}>Package Name</th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'right',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#4b5563'
                  }}>Price</th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#4b5563'
                  }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((item, index) => (
                  <tr 
                    key={item._id}
                    style={{
                      borderBottom: '1px solid #e9ecef',
                      backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8f9fa',
                      transition: 'background-color 0.2s ease'
                    }}
                  >
                    <td style={{
                      padding: '1rem',
                      fontSize: '0.875rem',
                      color: '#64748b'
                    }}>{index + 1}</td>
                    <td style={{
                      padding: '1rem',
                      fontSize: '0.875rem',
                      color: '#1e293b',
                      fontWeight: '500'
                    }}>{item.packageName}</td>
                    <td style={{
                      padding: '1rem',
                      fontSize: '0.875rem',
                      color: '#1e293b',
                      fontWeight: '600',
                      textAlign: 'right'
                    }}>${item.price}</td>
                    <td style={{
                      padding: '1rem',
                      textAlign: 'center'
                    }}>
                      <Link
                        to={`/admin/package-edit/${item._id}`}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#4361ee',
                          color: 'white',
                          textDecoration: 'none',
                          borderRadius: '6px',
                          fontSize: '0.875rem',
                          transition: 'background-color 0.2s ease'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3730a3'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4361ee'}
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
                {packages.length === 0 && (
                  <tr>
                    <td 
                      colSpan="4" 
                      style={{
                        padding: '2rem',
                        textAlign: 'center',
                        color: '#64748b'
                      }}
                    >
                      No packages found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;