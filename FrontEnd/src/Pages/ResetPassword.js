import React, { useEffect, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../firebase.init";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [resetError, setResetError] = useState(null);
  const [logo, setLogo] = useState([]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setResetError("Email is required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setResetError("Invalid email address.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
      setResetError(null);
    } catch (error) {
      console.error("Error sending password reset email", error);
      setResetError("Error sending password reset email. Please try again.");
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/logo`)
      .then((res) => res.json())
      .then((info) => setLogo(info))
      .catch((error) => console.error("Error fetching logo", error));
  }, []);

  return (
    <div className="account-section bg-light min-vh-100 py-5" style={{
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-5 col-xl-6 col-lg-7 col-md-9">
            <div className="card shadow-lg border-0" style={{
              borderRadius: '15px',
              background: 'rgba(255, 255, 255, 0.98)'
            }}>
              <div className="card-body p-4 p-md-5">
                {logo.length > 0 && (
                  <div className="text-center mb-4">
                    <img
                      src={logo[0]?.logo}
                      alt="Company Logo"
                      style={{ maxHeight: '60px', marginBottom: '1rem' }}
                    />
                  </div>
                )}

                <div className="text-center mb-4">
                  <h2 className="fw-bold mb-2" style={{
                    color: '#2c3e50',
                    fontSize: '2rem'
                  }}>Reset Password</h2>
                  <p className="text-muted">Enter your email address to reset your password</p>
                </div>

                <form onSubmit={handleResetPassword}>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-semibold">Email address</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control form-control-lg"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        borderRadius: '10px',
                        padding: '12px 16px',
                        border: '1.5px solid #dee2e6',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </div>

                  {resetError && (
                    <div className="alert alert-danger py-2 text-center mb-4" role="alert">
                      {resetError}
                    </div>
                  )}

                  {resetSent ? (
                    <div className="alert alert-success py-3 text-center mb-4" role="alert">
                      <i className="fas fa-check-circle me-2"></i>
                      Password reset email sent. Please check your inbox!
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-primary w-100 mb-4 py-3"
                      style={{
                        borderRadius: '10px',
                        background: '#4a90e2',
                        border: 'none',
                        fontWeight: '500',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Send Reset Email
                    </button>
                  )}

                  <div className="text-center">
                    <span className="text-muted">Remember your password? </span>
                    <Link 
                      to="/login" 
                      className="text-decoration-none"
                      style={{ color: '#4a90e2' }}
                    >
                      Sign in now
                    </Link>
                  </div>

                  {resetSent && (
                    <div className="text-center mt-4">
                      <Link 
                        to="/login" 
                        className="btn btn-outline-primary"
                        style={{
                          borderRadius: '10px',
                          padding: '10px 20px',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Return to Login
                      </Link>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;