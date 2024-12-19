import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackToAdminDashboard from "../../Pages/Admin/BackToAdminDashboard";

const ContactUsMessageRead = () => {
  const { id } = useParams();
  const [contact, setContact] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/contact-message/${id}`)
      .then((res) => res.json())
      .then((info) => setContact(info));
  }, [id]);

  const UserContactMessage = (event) => {
    event.preventDefault();
    const messageStatus = event.target.messageStatus.value;

    const contact = {
      messageStatus,
    };

    const url = `http://localhost:5000/contact-message/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(contact),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/contact-messages/");
      });
  };

  // Modernized, minimalist inline styles
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
      maxWidth: '1000px',
      width: '100%',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
      overflow: 'hidden',
      border: '1px solid #e9ecef',
    },
    header: {
      backgroundColor: '#f1f3f5',
      padding: '1.5rem 2rem',
      borderBottom: '1px solid #e9ecef',
    },
    content: {
      display: 'flex',
      padding: '2rem',
      gap: '2rem',
    },
    userInfo: {
      flex: '0 0 30%',
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      padding: '1.5rem',
    },
    messageSection: {
      flex: '1',
    },
    infoList: {
      listStyle: 'none',
      padding: 0,
    },
    infoItem: {
      marginBottom: '1rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid #e9ecef',
    },
    messageBox: {
      backgroundColor: '#f1f3f5',
      borderRadius: '12px',
      padding: '1.5rem',
      marginBottom: '1.5rem',
    },
    markReadBtn: {
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontWeight: 600,
      transition: 'background-color 0.2s ease, transform 0.1s ease',
      cursor: 'pointer',
    },
    btnHover: {
      ':hover': {
        backgroundColor: '#1d4ed8',
        transform: 'translateY(-2px)',
      }
    },
    icon: {
      width: '20px',
      height: '20px',
      marginRight: '0.5rem',
    }
  };

  return (
    <div style={styles.page}>
      <BackToAdminDashboard />
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={{
            margin: 0, 
            fontSize: '1.5rem', 
            color: '#2c3e50',
            fontWeight: 600
          }}>
            Contact Message Details
          </h1>
        </div>
        <div style={styles.content}>
          {/* User Information Section */}
          <div style={styles.userInfo}>
            <h2 style={{
              marginTop: 0, 
              marginBottom: '1.5rem', 
              fontSize: '1.25rem', 
              color: '#2c3e50'
            }}>
              User Information
            </h2>
            <ul style={styles.infoList}>
              <li style={styles.infoItem}>
                <strong style={{color: '#6b7280'}}>Name</strong>
                <div style={{marginTop: '0.5rem'}}>{contact.name}</div>
              </li>
              <li style={styles.infoItem}>
                <strong style={{color: '#6b7280'}}>Email</strong>
                <div style={{marginTop: '0.5rem'}}>{contact.email}</div>
              </li>
              <li>
                <strong style={{color: '#6b7280'}}>Date</strong>
                <div style={{marginTop: '0.5rem'}}>{contact.date}</div>
              </li>
            </ul>
          </div>

          {/* Message Section */}
          <div style={styles.messageSection}>
            <h2 style={{
              marginTop: 0, 
              marginBottom: '1.5rem', 
              fontSize: '1.25rem', 
              color: '#2c3e50'
            }}>
              Message Content
            </h2>
            <div style={styles.messageBox}>
              {contact.message}
            </div>

            <form onSubmit={UserContactMessage}>
              <input
                hidden
                type="text"
                name="messageStatus"
                value="Read"
                readOnly
              />
              <button 
                type="submit" 
                style={styles.markReadBtn}
              >
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/11840/11840157.png" 
                  alt="Mark as Read" 
                  style={styles.icon}
                />
                Mark as Read
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsMessageRead;