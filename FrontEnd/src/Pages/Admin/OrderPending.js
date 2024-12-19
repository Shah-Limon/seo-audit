import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrderMenu from "./OrderMenu";
import { ScaleLoader } from "react-spinners";

const OrderPending = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;
  const paginationDigits = 3;

  useEffect(() => {
    fetch(`http://localhost:5000/orders`)
      .then((res) => res.json())
      .then((info) => {
        setOrders(info.reverse());
        setLoading(false);
      });
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const OrderFilter = orders.filter((order) => order.orderStatus === "Pending");
  const totalOrders = OrderFilter.length;
  const totalPages = Math.ceil(totalOrders / itemsPerPage);
  const startDigit = Math.max(1, currentPage - Math.floor(paginationDigits / 2));
  const endDigit = Math.min(startDigit + paginationDigits - 1, totalPages);
  const currentItems = OrderFilter.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <style>
        {`
          .dashboard-container {
            background: linear-gradient(to bottom right, #f8f9fa, #ffffff);
            padding: 2rem;
            border-radius: 0.5rem;
            min-height: calc(100vh - 4rem);
          }

          .content-card {
            background: white;
            border-radius: 0.5rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            overflow: hidden;
          }

          .page-title {
            font-size: 1.5rem;
            color: #2d3748;
            font-weight: 600;
            margin-bottom: 1.5rem;
            text-align: center;
          }

          .modern-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            margin-bottom: 1rem;
          }

          .modern-table th {
            background-color: #f8fafc;
            padding: 1rem;
            font-weight: 600;
            text-align: left;
            color: #4a5568;
            border-bottom: 2px solid #e2e8f0;
            white-space: nowrap;
          }

          .modern-table td {
            padding: 1rem;
            border-bottom: 1px solid #e2e8f0;
            color: #4a5568;
          }

          .modern-table tbody tr:hover {
            background-color: #f8fafc;
            transition: background-color 0.2s ease;
          }

          .action-link {
            padding: 0.5rem 1rem;
            background-color: #3b82f6;
            color: white;
            border-radius: 0.375rem;
            text-decoration: none;
            transition: background-color 0.2s ease;
            display: inline-block;
            font-size: 0.875rem;
          }

          .action-link:hover {
            background-color: #2563eb;
            color: white;
          }

          .status-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.875rem;
            font-weight: 500;
            background-color: #fef3c7;
            color: #92400e;
          }

          .pagination {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            margin-top: 2rem;
          }

          .page-link {
            padding: 0.5rem 1rem;
            border-radius: 0.375rem;
            background-color: white;
            border: 1px solid #e2e8f0;
            color: #4a5568;
            text-decoration: none;
            transition: all 0.2s ease;
            cursor: pointer;
          }

          .page-link:hover {
            background-color: #f8fafc;
            border-color: #cbd5e1;
          }

          .page-link.active {
            background-color: #3b82f6;
            color: white;
            border-color: #3b82f6;
          }

          .loader-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 400px;
          }

          @media (max-width: 768px) {
            .dashboard-container {
              padding: 1rem;
            }

            .modern-table {
              display: block;
              overflow-x: auto;
              white-space: nowrap;
            }

            .modern-table th,
            .modern-table td {
              padding: 0.75rem;
            }
          }
        `}
      </style>

      <div className="dashboard-container">
        <h1 className="page-title">Pending Orders Dashboard</h1>
        <OrderMenu />

        <div className="content-card">
          {loading ? (
            <div className="loader-container">
              <ScaleLoader color="#3b82f6" />
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="modern-table">
                  <thead>
                    <tr>
                      <th>SL No.</th>
                      <th>Date</th>
                      <th>Name</th>
                      <th>Package</th>
                      <th>Price</th>
                      <th>Website</th>
                      <th>Email</th>
                      <th>Note</th>
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
                        <td>${item.packagePrice}</td>
                        <td>{item.customerWebsite}</td>
                        <td>{item.customerEmail}</td>
                        <td>{item.customerNote}</td>
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

              <div className="pagination">
                {currentPage > 1 && (
                  <span className="page-link" onClick={() => paginate(currentPage - 1)}>
                    ←
                  </span>
                )}
                {Array.from({ length: endDigit - startDigit + 1 }, (_, index) => (
                  <span
                    key={startDigit + index}
                    className={`page-link ${currentPage === startDigit + index ? 'active' : ''}`}
                    onClick={() => paginate(startDigit + index)}
                  >
                    {startDigit + index}
                  </span>
                ))}
                {currentPage < totalPages && (
                  <span className="page-link" onClick={() => paginate(currentPage + 1)}>
                    →
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderPending;