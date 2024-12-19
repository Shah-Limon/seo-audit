import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrderMenu from "./OrderMenu";

const TotalOrders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const paginationDigits = 3;

  useEffect(() => {
    fetch(`http://localhost:5000/orders`)
      .then((res) => res.json())
      .then((info) => setOrders(info.reverse()));
  }, []);

  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  const receivedOrders = orders.filter(
    (order) => order.paymentStatus === "Received"
  );

  const sortedOrders = [...receivedOrders].sort((a, b) => {
    return parseDate(b.orderDate) - parseDate(a.orderDate);
  });

  const totalSpend = sortedOrders.reduce(
    (total, order) => total + parseFloat(order.packagePrice),
    0
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);

  const startDigit = Math.max(
    1,
    currentPage - Math.floor(paginationDigits / 2)
  );
  const endDigit = Math.min(startDigit + paginationDigits - 1, totalPages);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedOrders.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <style>
        {`
          .dashboard-container {
            background: linear-gradient(to bottom right, #f8f9fa, #ffffff);
            padding: 2rem;
            border-radius: 0.5rem;
            box-shadow: 0 0 20px rgba(0,0,0,0.05);
          }

          .stats-card {
            background: white;
            padding: 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.04);
            margin-bottom: 2rem;
            border: 1px solid rgba(0,0,0,0.05);
          }

          .table-container {
            background: white;
            border-radius: 0.5rem;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0,0,0,0.05);
          }

          .modern-table {
            margin-bottom: 0;
            width: 100%;
            border-collapse: collapse;
          }

          .modern-table thead th {
            background: #f8f9fa;
            border-bottom: 2px solid #dee2e6;
            color: #495057;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.85rem;
            padding: 1rem;
          }

          .modern-table tbody tr:hover {
            background-color: rgba(0,0,0,0.02);
            transition: all 0.2s;
          }

          .modern-table td {
            padding: 1rem;
            vertical-align: middle;
            border-bottom: 1px solid #dee2e6;
          }

          .action-link {
            padding: 0.4rem 1rem;
            border-radius: 0.25rem;
            background: #007bff;
            color: white;
            text-decoration: none;
            transition: all 0.2s;
            display: inline-block;
          }

          .action-link:hover {
            background: #0056b3;
            text-decoration: none;
            color: white;
          }

          .status-badge {
            padding: 0.4rem 0.8rem;
            border-radius: 2rem;
            font-size: 0.85rem;
            font-weight: 500;
            display: inline-block;
          }

          .status-received {
            background: #d4edda;
            color: #155724;
          }

          .pagination {
            margin-top: 1.5rem;
            display: flex;
            justify-content: center;
            list-style: none;
            padding: 0;
          }

          .pagination .page-item {
            margin: 0 0.2rem;
          }

          .pagination .page-link {
            border-radius: 0.25rem;
            border: none;
            padding: 0.5rem 1rem;
            color: #007bff;
            background: white;
            transition: all 0.2s;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
          }

          .pagination .page-item.active .page-link {
            background: #007bff;
            color: white;
          }

          .pagination .page-link:hover {
            background: #007bff;
            color: white;
          }

          .total-sales {
            font-size: 1.5rem;
            color: #2c3e50;
            font-weight: 600;
            margin-bottom: 0;
            text-align: center;
          }

          .order-id {
            color: #6c757d;
            font-family: monospace;
          }

          .price-value {
            font-weight: 600;
            color: #2c3e50;
          }

          @media (max-width: 768px) {
            .dashboard-container {
              padding: 1rem;
            }

            .table-container {
              overflow-x: auto;
            }

            .modern-table {
              min-width: 900px;
            }

            .stats-card {
              margin: 1rem 0;
            }
          }
        `}
      </style>

      <div className="dashboard-container">
        <OrderMenu />
        
        <div className="stats-card">
          <h4 className="total-sales">
            Total Sales: ${totalSpend.toLocaleString()} USD
          </h4>
        </div>

        <div className="table-container">
          <table className="modern-table">
            <thead>
              <tr>
                <th>SL No.</th>
                <th>Date</th>
                <th>Order ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Package</th>
                <th>Price</th>
                <th>Payment</th>
                <th>Order</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                  <td>{item.orderDate}</td>
                  <td>
                    <span className="order-id">#{item.orderId}</span>
                  </td>
                  <td>{item.customerName}</td>
                  <td>{item.customerEmail}</td>
                  <td>{item.packageName}</td>
                  <td>
                    <span className="price-value">${item.packagePrice}</span>
                  </td>
                  <td>
                    <span className="status-badge status-received">
                      {item.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <span className="status-badge" style={{
                      background: item.orderStatus === 'Completed' ? '#d4edda' : '#fff3cd',
                      color: item.orderStatus === 'Completed' ? '#155724' : '#856404'
                    }}>
                      {item.orderStatus}
                    </span>
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

        <nav>
          <ul className="pagination">
            {currentPage > 1 && (
              <li className="page-item">
                <Link 
                  className="page-link" 
                  onClick={() => paginate(currentPage - 1)}
                >
                  &laquo;
                </Link>
              </li>
            )}
            
            {Array.from({ length: endDigit - startDigit + 1 }, (_, index) => (
              <li 
                className={`page-item ${currentPage === startDigit + index ? 'active' : ''}`} 
                key={startDigit + index}
              >
                <Link 
                  className="page-link"
                  onClick={() => paginate(startDigit + index)}
                >
                  {startDigit + index}
                </Link>
              </li>
            ))}
            
            {currentPage < totalPages && (
              <li className="page-item">
                <Link 
                  className="page-link"
                  onClick={() => paginate(currentPage + 1)}
                >
                  &raquo;
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default TotalOrders;