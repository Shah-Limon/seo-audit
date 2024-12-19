import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrderMenu from "./OrderMenu";

const OrdersCancelled = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const paginationDigits = 3;

  useEffect(() => {
    fetch(`http://localhost:5000/orders`)
      .then((res) => res.json())
      .then((info) => setOrders(info));
  }, []);

  const OrdersCancelled = orders.filter(
    (order) => order.orderStatus === "Cancelled"
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(OrdersCancelled.length / itemsPerPage);
  const startDigit = Math.max(1, currentPage - Math.floor(paginationDigits / 2));
  const endDigit = Math.min(startDigit + paginationDigits - 1, totalPages);
  const currentItems = OrdersCancelled.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <style>
        {`
         .dashboard-container {
           background: linear-gradient(to right bottom, #f8fafc, #fff);
           padding: 2rem;
           min-height: 100vh;
         }

         .content-wrapper {
           max-width: 1400px;
           margin: 0 auto;
         }

         .dashboard-header {
           background: white;
           border-radius: 1rem;
           padding: 2rem;
           margin-bottom: 2rem;
           box-shadow: 0 1px 3px rgba(0,0,0,0.1);
           text-align: center;
         }

         .header-title {
           font-size: 1.75rem;
           font-weight: 600;
           color: #1e293b;
           margin-bottom: 0.5rem;
         }

         .header-subtitle {
           color: #64748b;
         }

         .table-card {
           background: white;
           border-radius: 1rem;
           box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
           overflow: hidden;
         }

         .data-table {
           width: 100%;
           border-collapse: separate;
           border-spacing: 0;
         }

         .data-table th {
           background: #f8fafc;
           padding: 1rem;
           font-weight: 600;
           font-size: 0.875rem;
           color: #475569;
           text-align: left;
           border-bottom: 2px solid #e2e8f0;
           white-space: nowrap;
         }

         .data-table td {
           padding: 1rem;
           color: #475569;
           font-size: 0.875rem;
           border-bottom: 1px solid #e2e8f0;
         }

         .data-table tbody tr:hover {
           background-color: #f8fafc;
           transition: all 0.2s;
         }

         .status-badge {
           padding: 0.375rem 0.75rem;
           border-radius: 9999px;
           font-size: 0.75rem;
           font-weight: 500;
           background-color: #fee2e2;
           color: #991b1b;
           display: inline-block;
         }

         .action-link {
           display: inline-flex;
           padding: 0.5rem 1rem;
           background: #3b82f6;
           color: white;
           border-radius: 0.375rem;
           font-size: 0.875rem;
           text-decoration: none;
           transition: all 0.2s;
         }

         .action-link:hover {
           background: #2563eb;
           transform: translateY(-1px);
         }

         .amount-cell {
           font-weight: 500;
           color: #dc2626;
         }

         .pagination-wrapper {
           margin-top: 2rem;
           display: flex;
           justify-content: center;
           gap: 0.5rem;
         }

         .page-button {
           min-width: 2.5rem;
           height: 2.5rem;
           padding: 0 0.75rem;
           display: inline-flex;
           align-items: center;
           justify-content: center;
           border-radius: 0.375rem;
           background: white;
           border: 1px solid #e2e8f0;
           color: #475569;
           font-size: 0.875rem;
           transition: all 0.2s;
           cursor: pointer;
         }

         .page-button:hover {
           background: #f8fafc;
           border-color: #cbd5e1;
         }

         .page-button.active {
           background: #3b82f6;
           color: white;
           border-color: #3b82f6;
         }

         @media (max-width: 1024px) {
           .table-card {
             overflow-x: auto;
           }
           
           .data-table {
             min-width: 1000px;
           }
         }

         @media (max-width: 640px) {
           .dashboard-container {
             padding: 1rem;
           }
           
           .dashboard-header {
             padding: 1.5rem;
           }
         }
       `}
      </style>

      <div className="dashboard-container">
        <div className="content-wrapper">
          <div className="dashboard-header">
            <h1 className="header-title">Cancelled Orders</h1>
            <p className="header-subtitle">Overview of all cancelled orders</p>
          </div>

          <OrderMenu />

          <div className="table-card">
            <table className="data-table">
              <thead>
                <tr>
                  <th>SL No.</th>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Package</th>
                  <th>Price</th>
              
                  <th>Email</th>
                 
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                    <td>{item.orderDate}</td>
                    <td>{item.customerName}</td>
                    <td>{item.packageName}</td>
                    <td className="amount-cell">${item.packagePrice}</td>
                  
                    <td>{item.customerEmail}</td>
                 
                    <td>
                      <span className="status-badge">{item.orderStatus}</span>
                    </td>
                    <td>
                      <Link to={`/admin/order/${item._id}`} className="action-link">
                        Action
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination-wrapper">
            {currentPage > 1 && (
              <button
                className="page-button"
                onClick={() => paginate(currentPage - 1)}
              >
                ←
              </button>
            )}

            {Array.from({ length: endDigit - startDigit + 1 }, (_, index) => (
              <button
                key={startDigit + index}
                className={`page-button ${currentPage === startDigit + index ? 'active' : ''}`}
                onClick={() => paginate(startDigit + index)}
              >
                {startDigit + index}
              </button>
            ))}

            {currentPage < totalPages && (
              <button
                className="page-button"
                onClick={() => paginate(currentPage + 1)}
              >
                →
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersCancelled;