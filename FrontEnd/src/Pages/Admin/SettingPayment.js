import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import BackToAdminDashboard from "./BackToAdminDashboard";

const SettingPayment = () => {
  const [paymentEmail, setPaymentEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchPaymentEmail = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/payments`);

        if (!response.ok) {
          throw new Error('Failed to fetch payment information');
        }

        const info = await response.json();
        setPaymentEmail(info[0]); // Assuming we want the first payment email
      } catch (err) {
        setError(err.message);
        console.error('Error fetching payment email:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentEmail();
  }, []);

  const pageStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 0'
  };

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '15px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    padding: '2rem',
    maxWidth: '600px',
    width: '100%',
    transition: 'all 0.3s ease'
  };

  const headingStyle = {
    color: '#333',
    fontWeight: '600',
    marginBottom: '1.5rem',
    textAlign: 'center'
  };

  const emailDisplayStyle = {
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    padding: '1rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
    fontWeight: '500',
    color: '#495057'
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="alert alert-danger text-center" role="alert">
          {error}
          <button
            className="btn btn-outline-danger mt-3 d-block mx-auto"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      );
    }

    if (!paymentEmail) {
      return (
        <div className="alert alert-warning text-center" role="alert">
          No payment email found
        </div>
      );
    }

    return (
      <div style={cardStyle}>
        <h4 style={headingStyle}>
          Your PayPal Email
        </h4>

        <div style={emailDisplayStyle}>
          {paymentEmail.email}
        </div>

        <div className="text-center">
          <Link
            to={`/admin/paypal/${paymentEmail._id}`}
            className="btn btn-primary rounded-pill px-4 py-2"
            style={{
              backgroundColor: '#007bff',
              borderColor: '#007bff',
              transition: 'all 0.3s ease'
            }}
          >
            Update Email
          </Link>
        </div>
      </div>
    );
  };

  return (
    <>
      <BackToAdminDashboard />
      <div style={pageStyle}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingPayment;