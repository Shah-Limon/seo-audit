import React from "react";
import { Link } from "react-router-dom";

const BackToAdminDashboard = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: "1rem",
        borderRadius: "0.5rem",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Link
        to="/admin/dashboard"
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
          transition: 'all 0.2s ease',
          
        }}
      >
        <span>Admin Dashboard</span>
      </Link>
    </div>
  );
};

export default BackToAdminDashboard;