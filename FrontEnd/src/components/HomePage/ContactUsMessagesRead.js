// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import BackToAdminDashboard from "../../Pages/Admin/BackToAdminDashboard";

// const ContactUsMessagesRead = () => {
//   const [messages, setMessages] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5); // Number of items to display per page

//   useEffect(() => {
//     fetch(`http://localhost:5000/contact-messages`)
//       .then((res) => res.json())
//       .then((info) => setMessages(info.reverse()));
//   }, []);

//   // Calculate the index of the last item to display
//   const indexOfLastItem = currentPage * itemsPerPage;
//   // Calculate the index of the first item to display
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   // Get the current items to display
//   const currentMessages = messages.slice(indexOfFirstItem, indexOfLastItem);

//   // Function to handle page changes
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <>
//       <div className="container">
//         <BackToAdminDashboard></BackToAdminDashboard>
//         <div className="custom-ordermenu mt-5">
//           <ul className="menu d-flex">
//             <li className="menu-item menu-item-has-children">
//               <Link to="/admin/contact-message-unread/" class="btn-masco btn-masco--header rounded-pill btn-fill--up">
//                 <span>Unread Contact Messages</span>
//               </Link>
//             </li>
           
//           </ul>
//         </div>
        
//         <table className="rwd-table">
//         <span>Read Contact Messages</span>
//           <tbody>
//             <tr>
//               <th>SL No.</th>
//               <th>Date</th>
//               <th>Sender</th>
//               <th>Email</th>
//               <th>Subject</th>
//               <th>Status</th>
//               <th>Details</th>
//             </tr>
//             {currentMessages.map((item, index) => (
//               <tr key={item._id}>
//                 <td>{index + 1 + indexOfFirstItem}</td>
//                 <td>{item.date}</td>
//                 <td>{item.name}</td>
//                 <td>{item.email}</td>
//                 <td>{item.subject}</td>
//                 <td>{item.messageStatus}</td>
//                 <td>
//                   <Link
//                     to={`/admin/contact-message/${item._id}`}
//                     className="title"
//                   >
//                     View
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         <div className="pagination">
//           <ul>
//             <li className="pagination-contact">
//               {Array(Math.ceil(messages.length / itemsPerPage))
//                 .fill()
//                 .map((_, index) => (
//                   <Link
//                     key={index}
//                     className={index + 1 === currentPage ? "active" : ""}
//                     onClick={() => handlePageChange(index + 1)}
//                   >
//                     {index + 1}
//                   </Link>
//                 ))}
//             </li>
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ContactUsMessagesRead;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackToAdminDashboard from "../../Pages/Admin/BackToAdminDashboard";

const ContactUsMessagesRead = () => {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    fetch(`http://localhost:5000/contact-messages`)
      .then((res) => res.json())
      .then((info) => setMessages(info.reverse()));
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMessages = messages.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(messages.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    let pages = [];
    
    // Previous button
    if (currentPage > 1) {
      pages.push(
        <li key="prev" className="page-item">
          <button 
            className="page-link" 
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <i className="bi bi-chevron-left me-1"></i>
            Previous
          </button>
        </li>
      );
    }

    // Page numbers (max 3)
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li 
          key={i} 
          className={`page-item ${i === currentPage ? 'active' : ''}`}
        >
          <button 
            className="page-link" 
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        </li>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      pages.push(
        <li key="next" className="page-item">
          <button 
            className="page-link" 
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
            <i className="bi bi-chevron-right ms-1"></i>
          </button>
        </li>
      );
    }

    return pages;
  };

  return (
    <div className="container-fluid px-4 py-4" style={{
      backgroundColor: '#f4f6f9',
      minHeight: '100vh'
    }}>
      <style>{`
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
        .card {
          border: none;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          border-radius: 12px;
          overflow: hidden;
        }
        .card-header {
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          color: white;
          padding: 1rem 1.5rem;
        }
        .table {
          margin-bottom: 0;
        }
        .table th {
          background-color: #f1f3f5;
          color: #495057;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
          border-bottom: 2px solid #e9ecef;
        }
        .table-hover tbody tr:hover {
          background-color: rgba(37, 117, 252, 0.05);
          transition: background-color 0.3s ease;
        }
        .page-item.active .page-link {
          background-color: #2575fc;
          border-color: #2575fc;
          color: white;
        }
        .page-link {
          color: #2575fc;
          border: none;
          border-radius: 6px;
          margin: 0 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .page-link:hover {
          background-color: rgba(37, 117, 252, 0.1);
        }
        .btn-view {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
          border-radius: 6px;
        }
        .badge {
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.35em 0.65em;
        }
      `}</style>
      
      <BackToAdminDashboard />
      
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Contact Messages</h5>
              <Link 
                to="/admin/contact-message-unread/" 
                className="btn btn-outline-primary btn-sm rounded-pill"
              >
                <i className="bi bi-envelope-open me-2"></i>
                View Unread Messages
              </Link>
            </div>
            
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Date</th>
                      <th>Sender</th>
                      <th>Email</th>
                      <th>Subject</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentMessages.map((item, index) => (
                      <tr key={item._id}>
                        <td>{index + 1 + indexOfFirstItem}</td>
                        <td>{item.date}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.subject}</td>
                        <td>
                          <span 
                            className={`badge ${
                              item.messageStatus === 'Read' 
                                ? 'bg-success' 
                                : 'bg-warning'
                            }`}
                          >
                            {item.messageStatus}
                          </span>
                        </td>
                        <td>
                          <Link
                            to={`/admin/contact-message/${item._id}`}
                            className="btn btn-info btn-view"
                          >
                            <i className="bi bi-eye me-1"></i>
                            Read Message
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {messages.length > itemsPerPage && (
        <nav aria-label="Message navigation" className="d-flex justify-content-center">
          <ul className="pagination">
            {renderPagination()}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default ContactUsMessagesRead;