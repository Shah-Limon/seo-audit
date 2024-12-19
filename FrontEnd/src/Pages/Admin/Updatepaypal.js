import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import auth from "../../firebase.init";
import BackToAdminDashboard from "./BackToAdminDashboard";

const Updatepaypal = () => {
  const { id } = useParams();
  const [paymentEmail, setPaymentEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  // Page and container styles
  const pageStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
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

  const inputStyle = {
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    padding: '0.75rem 1rem',
    border: '1px solid #ced4da',
    transition: 'all 0.3s ease'
  };

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
        toast.error('Failed to load payment information');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentEmail();
  }, []);

  const handleUpdatePayment = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;

    try {
      const url = `http://localhost:5000/payment/${id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to update email');
      }

      toast.success('PayPal email updated successfully');
      navigate("/admin/setting");
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update PayPal email');
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div style={pageStyle}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Render error state
  if (error || !paymentEmail) {
    return (
      <div style={pageStyle}>
        <div className="alert alert-danger text-center" role="alert">
          {error || 'No payment information found'}
        </div>
      </div>
    );
  }

  return (
    <>
      <BackToAdminDashboard />
      <div style={pageStyle}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">


              <div style={cardStyle}>
                <h4 style={headingStyle}>
                  Update Your PayPal Email
                </h4>

                <form onSubmit={handleUpdatePayment}>
                  <div className="mb-3">
                    <input
                      required
                      type="email"
                      className="form-control"
                      placeholder="PayPal Email"
                      name="email"
                      defaultValue={paymentEmail.email}
                      style={inputStyle}
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary rounded-pill px-4 py-2"
                      style={{
                        backgroundColor: '#007bff',
                        borderColor: '#007bff',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Update Email
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Updatepaypal;