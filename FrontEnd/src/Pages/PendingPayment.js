import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../firebase.init";

const PendingPayment = () => {
  const [orders, setOrders] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    fetch(`http://localhost:5000/orders`)
      .then((res) => res.json())
      .then((info) => setOrders(info.reverse()));
  }, []);

  const pendingOrders = orders.filter(
    order => order.customerEmail === user?.email && order.paymentStatus === "Pending"
  );

  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      padding: '2rem 1rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '2rem',
          borderBottom: '1px solid #e9ecef'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#2d3436',
            margin: 0
          }}>
            Pending Payments
          </h2>
          <p style={{
            color: '#64748b',
            marginTop: '0.5rem',
            marginBottom: 0
          }}>
            {pendingOrders.length} pending payment{pendingOrders.length !== 1 ? 's' : ''} to process
          </p>
        </div>

        {/* Table Container */}
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
                }}>Order ID</th>
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
                }}>Amount</th>
                <th style={{
                  padding: '1rem',
                  textAlign: 'center',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#4b5563'
                }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingOrders.map((order, index) => (
                <tr 
                  key={order._id}
                  style={{
                    borderBottom: '1px solid #e9ecef',
                    backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8f9fa',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  <td style={{
                    padding: '1rem',
                    color: '#64748b',
                    fontSize: '0.875rem'
                  }}>{index + 1}</td>
                  <td style={{
                    padding: '1rem',
                    color: '#1e293b',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}>{order.orderId}</td>
                  <td style={{
                    padding: '1rem',
                    color: '#1e293b',
                    fontSize: '0.875rem'
                  }}>{order.packageName}</td>
                  <td style={{
                    padding: '1rem',
                    color: '#1e293b',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    textAlign: 'right'
                  }}>${order.packagePrice}</td>
                  <td style={{
                    padding: '1rem',
                    textAlign: 'center'
                  }}>
                    <Link
                      to={`/pay-now/${order._id}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '0.5rem 1rem',
                        backgroundColor: '#4361ee',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        transition: 'background-color 0.2s ease',
                        gap: '0.5rem'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3730a3'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4361ee'}
                    >
                      <i className="fab fa-paypal" style={{ fontSize: '1rem' }}></i>
                      Pay Now
                    </Link>
                  </td>
                </tr>
              ))}
              {pendingOrders.length === 0 && (
                <tr>
                  <td 
                    colSpan="5" 
                    style={{
                      padding: '3rem',
                      textAlign: 'center',
                      color: '#64748b'
                    }}
                  >
                    No pending payments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PendingPayment;