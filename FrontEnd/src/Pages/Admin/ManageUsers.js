import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom/dist";
import BackToAdminDashboard from "./BackToAdminDashboard";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then((res) => res.json())
      .then((info) => setUsers(info));
  }, []);

  const handleAddUsers = (event) => {
    event.preventDefault();
    const userName = event.target.userName.value;
    const userEmail = event.target.userEmail.value;
    const userRole = event.target.userRole.value;
    const edit = {
      userName,
      userEmail,
      userRole,
    };

    const url = `http://localhost:5000/add-user`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(edit),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate(`/admin/dashboard`);
      });
  };

  const handleDeleteUser = (userId) => {
    fetch(`http://localhost:5000/user/${userId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        const updatedUsers = users.filter((user) => user._id !== userId);
        setUsers(updatedUsers);
        navigate(`/admin/dashboard`);
      });
  };

  // Inline styles for modern, clean design
  const styles = {
    page: {
      backgroundColor: '#f9fafb',
      minHeight: '100vh',
      padding: '2rem 0',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
      padding: '2rem',
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem',
      color: '#2c3e50',
      fontWeight: '600',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: '0 1rem',
      backgroundColor: 'white',
    },
    tableHeader: {
      backgroundColor: '#f1f3f5',
      color: '#2c3e50',
      padding: '1rem',
      textAlign: 'left',
    },
    tableRow: {
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      marginBottom: '1rem',
    },
    tableCell: {
      padding: '1rem',
      borderBottom: '1px solid #e9ecef',
    },
    editLink: {
      color: '#2563eb',
      textDecoration: 'none',
      fontWeight: '500',
      transition: 'color 0.2s ease',
    },
    deleteButton: {
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '0.5rem 1rem',
      fontWeight: '600',
      transition: 'background-color 0.2s ease',
      cursor: 'pointer',
    },
    form: {
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
      padding: '2rem',
      marginTop: '2rem',
      maxWidth: '1200px',
      margin: '2rem auto',
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem',
      alignItems: 'end',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      marginBottom: '0.5rem',
      color: '#6b7280',
      fontWeight: '500',
    },
    input: {
      padding: '0.75rem',
      borderRadius: '8px',
      border: '1px solid #e9ecef',
      backgroundColor: '#f8f9fa',
    },
    addUserButton: {
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '0.75rem 1.5rem',
      fontWeight: '600',
      transition: 'background-color 0.2s ease, transform 0.1s ease',
      cursor: 'pointer',
    }
  };

  return (
    <div style={styles.page}>
      <BackToAdminDashboard />
      <div style={styles.container}>
        <h1 style={styles.header}>Manage Users</h1>
        <div style={{overflowX: 'auto'}}>
          <table style={styles.table}>
            <thead>
              <tr>
                {['SL No.', 'Website Name', 'Email', 'Role', 'Edit', 'Delete user'].map((header, index) => (
                  <th key={index} style={{...styles.tableHeader, ...(index === 0 ? {borderTopLeftRadius: '12px'} : {}), ...(index === 5 ? {borderTopRightRadius: '12px'} : {})}}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{index + 1}</td>
                  <td style={styles.tableCell}>{user.userName}</td>
                  <td style={styles.tableCell}>{user.userEmail}</td>
                  <td style={styles.tableCell}>{user.userRole}</td>
                  <td style={styles.tableCell}>
                    <Link 
                      to={`/admin/user/${user._id}`} 
                      style={styles.editLink}
                      onMouseOver={(e) => e.target.style.color = '#1d4ed8'}
                      onMouseOut={(e) => e.target.style.color = '#2563eb'}
                    >
                      Edit User
                    </Link>
                  </td>
                  <td style={styles.tableCell}>
                    <button 
                      style={styles.deleteButton}
                      onClick={() => handleDeleteUser(user._id)}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#bb2d3b'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
                    >
                      Delete user
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <form onSubmit={handleAddUsers} style={styles.form}>
        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>User Name</label>
            <input
              type="text"
              placeholder="Enter User Name"
              name="userName"
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>User Email</label>
            <input 
              type="email" 
              placeholder="Enter User Email" 
              name="userEmail" 
              style={styles.input}
              required 
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>User Role</label>
            <select
              name="userRole"
              style={{...styles.input, appearance: 'none'}}
              required
            >
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
          <div style={{display: 'flex', alignItems: 'flex-end'}}>
            <button 
              type="submit" 
              style={styles.addUserButton}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#1d4ed8';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#2563eb';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Add User
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ManageUsers;