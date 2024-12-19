import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackToAdminDashboard from "../../Pages/Admin/BackToAdminDashboard";

const ContactUsMessages = () => {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [messagesPerPage] = useState(10);

  useEffect(() => {
    fetch(`http://localhost:5000/contact-messages`)
      .then((res) => res.json())
      .then((info) => setMessages(info.reverse()));
  }, []);

  // Get current messages
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);

  // Pagination logic
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Pagination rendering
  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(messages.length / messagesPerPage); i++) {
      pageNumbers.push(i);
    }

    // Determine which page numbers to show
    let displayedPages = pageNumbers;
    if (pageNumbers.length > 3) {
      if (currentPage <= 2) {
        displayedPages = pageNumbers.slice(0, 3);
      } else if (currentPage >= pageNumbers.length - 1) {
        displayedPages = pageNumbers.slice(-3);
      } else {
        displayedPages = [currentPage - 1, currentPage, currentPage + 1];
      }
    }

    return (
      <nav aria-label="Message navigation" style={styles.paginationContainer}>
        <ul style={styles.pagination}>
          {/* Previous button */}
          {currentPage > 1 && (
            <li style={styles.paginationItem}>
              <button 
                onClick={() => paginate(currentPage - 1)}
                style={styles.paginationButton}
                className="btn btn-outline-primary"
              >
                &laquo; Prev
              </button>
            </li>
          )}

          {/* Page numbers */}
          {displayedPages.map(number => (
            <li 
              key={number} 
              style={{
                ...styles.paginationItem,
                ...(currentPage === number ? styles.activePage : {})
              }}
            >
              <button 
                onClick={() => paginate(number)}
                style={styles.paginationButton}
                className={`btn ${currentPage === number ? 'btn-primary' : 'btn-outline-primary'}`}
              >
                {number}
              </button>
            </li>
          ))}

          {/* Next button */}
          {currentPage < pageNumbers.length && (
            <li style={styles.paginationItem}>
              <button 
                onClick={() => paginate(currentPage + 1)}
                style={styles.paginationButton}
                className="btn btn-outline-primary"
              >
                Next &raquo;
              </button>
            </li>
          )}
        </ul>
      </nav>
    );
  };

  const styles = {
    container: {
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      backgroundColor: '#f4f6f9',
      minHeight: '100vh',
      padding: '2rem',
    },
    navigationMenu: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '1.5rem',
      gap: '1rem'
    },
    tableContainer: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
      overflow: 'hidden',
      border: '1px solid #e9ecef'
    },
    tableHeader: {
      backgroundColor: '#f8f9fa',
      color: '#2c3e50',
      padding: '1rem',
      textAlign: 'center',
      fontSize: '1.25rem',
      fontWeight: '600',
      borderBottom: '1px solid #e9ecef'
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0
    },
    tableHeadCell: {
      backgroundColor: '#f1f3f5',
      padding: '12px 15px',
      textAlign: 'left',
      borderBottom: '1px solid #e9ecef',
      fontWeight: '600',
      color: '#495057'
    },
    tableRow: {
      transition: 'background-color 0.2s ease'
    },
    tableRowHover: {
      ':hover': {
        backgroundColor: '#f8f9fa'
      }
    },
    tableCell: {
      padding: '12px 15px',
      borderBottom: '1px solid #e9ecef',
      color: '#212529'
    },
    viewLink: {
      color: '#007bff',
      textDecoration: 'none',
      fontWeight: '500',
      transition: 'color 0.3s ease'
    },
    viewLinkHover: {
      ':hover': {
        color: '#0056b3',
        textDecoration: 'underline'
      }
    },
    navButton: {
      padding: '10px 20px',
      borderRadius: '8px',
      textTransform: 'uppercase',
      fontWeight: '600',
      transition: 'all 0.3s ease'
    },
    paginationContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '1.5rem'
    },
    pagination: {
      display: 'flex',
      listStyle: 'none',
      padding: 0,
      margin: 0,
      alignItems: 'center',
      gap: '0.5rem'
    },
    paginationItem: {
      margin: 0
    },
    paginationButton: {
      padding: '8px 12px',
      margin: 0,
      borderRadius: '6px'
    },
    activePage: {
      fontWeight: 'bold'
    }
  };

  return (
    <div style={styles.container} className="container-fluid">
      <BackToAdminDashboard />
      
      <div style={styles.navigationMenu}>
        <Link 
          to="/admin/contact-message-unread/" 
          className="btn btn-primary"
          style={{
            ...styles.navButton,
            backgroundColor: '#007bff',
            borderColor: '#007bff'
          }}
        >
          Unread Messages
        </Link>
        <Link 
          to="/admin/contact-message-read/" 
          className="btn btn-outline-primary"
          style={{
            ...styles.navButton,
            backgroundColor: 'white',
            color: '#007bff',
            borderColor: '#007bff'
          }}
        >
          Read Messages
        </Link>
      </div>

      <div style={styles.tableContainer} className="shadow-sm">
        <div style={styles.tableHeader}>
          Contact Messages
        </div>
        
        <div className="table-responsive">
          <table style={styles.table} className="table">
            <thead>
              <tr>
                <th style={styles.tableHeadCell}>No.</th>
                <th style={styles.tableHeadCell}>Date</th>
                <th style={styles.tableHeadCell}>Sender</th>
                <th style={styles.tableHeadCell}>Email</th>
                <th style={styles.tableHeadCell}>Subject</th>
                <th style={styles.tableHeadCell}>Status</th>
                <th style={styles.tableHeadCell}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentMessages.map((item, index) => (
                <tr 
                  key={item._id} 
                  style={{
                    ...styles.tableRow,
                    ...styles.tableRowHover
                  }}
                >
                  <td style={styles.tableCell}>{indexOfFirstMessage + index + 1}</td>
                  <td style={styles.tableCell}>{item.date}</td>
                  <td style={styles.tableCell}>{item.name}</td>
                  <td style={styles.tableCell}>{item.email}</td>
                  <td style={styles.tableCell}>{item.subject}</td>
                  <td style={styles.tableCell}>{item.messageStatus}</td>
                  <td style={styles.tableCell}>
                    <Link
                      to={`/admin/contact-message/${item._id}`}
                      style={{
                        ...styles.viewLink,
                        ...styles.viewLinkHover
                      }}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {messages.length > messagesPerPage && renderPagination()}
      </div>
    </div>
  );
};

export default ContactUsMessages;