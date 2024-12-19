import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackToAdminDashboard from "./BackToAdminDashboard";

const User = () => {
  const { id } = useParams();
  const [member, setMember] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/user/${id}`)
      .then((res) => res.json())
      .then((users) => {
        const user = users.find((user) => user._id === id);
        if (user) {
          setMember(user);
        }
      });  
  }, [id]);
  

  const handleUpdateUser = (event) => {
    event.preventDefault();
    const userName = event.target.userName.value;
    const userEmail = event.target.userEmail.value;
    const userRole = event.target.userRole.value;
    const userUpdate = {
      userName,
      userEmail,
      userRole,
    };
    const url = `http://localhost:5000/user/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userUpdate),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate(`/admin/dashboard`);
      });
  };

  // Inline styles for modern, clean design
  const styles = {
    page: {
      backgroundColor: '#f9fafb',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '2rem 0',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    container: {
      maxWidth: '600px',
      width: '100%',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
      padding: '2rem',
      border: '1px solid #e9ecef',
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem',
      color: '#2c3e50',
      fontWeight: '600',
    },
    formGroup: {
      marginBottom: '1.5rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      color: '#6b7280',
      fontWeight: '500',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #e9ecef',
      borderRadius: '8px',
      backgroundColor: '#f8f9fa',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    },
    inputFocus: {
      borderColor: '#2563eb',
      boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)',
    },
    select: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #e9ecef',
      borderRadius: '8px',
      backgroundColor: '#f8f9fa',
      appearance: 'none',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M1 4l5 5 5-5' fill='none' stroke='%236b7280' stroke-width='2'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 0.75rem center',
      backgroundSize: '12px',
    },
    submitButton: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontWeight: '600',
      transition: 'background-color 0.2s ease, transform 0.1s ease',
      cursor: 'pointer',
    },
    submitButtonHover: {
      backgroundColor: '#1d4ed8',
      transform: 'translateY(-2px)',
    }
  };

  return (
    <div style={styles.page}>
      <BackToAdminDashboard />
      <div style={styles.container}>
        <h1 style={styles.header}>Update User</h1>
        <form onSubmit={handleUpdateUser}>
          <div style={styles.formGroup}>
            <label style={styles.label}>User Name</label>
            <input
              type="text"
              name="userName"
              defaultValue={member.userName}
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = styles.inputFocus.borderColor;
                e.target.style.boxShadow = styles.inputFocus.boxShadow;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = styles.input.border;
                e.target.style.boxShadow = 'none';
              }}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>User Email</label>
            <input
              type="email"
              name="userEmail"
              defaultValue={member.userEmail}
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = styles.inputFocus.borderColor;
                e.target.style.boxShadow = styles.inputFocus.boxShadow;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = styles.input.border;
                e.target.style.boxShadow = 'none';
              }}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>User Role</label>
            <select
              name="userRole"
              defaultValue={member.userRole}
              style={styles.select}
              required
            >
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
          <button 
            type="submit" 
            style={styles.submitButton}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = styles.submitButtonHover.backgroundColor;
              e.target.style.transform = styles.submitButtonHover.transform;
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = styles.submitButton.backgroundColor;
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default User;