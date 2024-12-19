import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackToAdminDashboard from "./BackToAdminDashboard";

const OrderAction = () => {
  const [order, setOrder] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/order/${id}`)
      .then((res) => res.json())
      .then((info) => setOrder(info));
  }, [id]);

  const handelOrderAction = (event) => {
    event.preventDefault();
    const orderStatus = event.target.orderStatus.value;
    const paymentStatus = event.target.paymentStatus.value;
    const updateOrder = { orderStatus, paymentStatus };

    const url = `http://localhost:5000/order/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateOrder),
    })
      .then((res) => res.json())
      .then((result) => {
        navigate("/admin/orders/");
      });
  };

  return (
    <>
      <style>
        {`
          .order-action-container {
            max-width: 800px;
            margin: 2rem auto;
            padding: 2rem;
            background: white;
            border-radius: 1rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }

          .order-header {
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #e5e7eb;
          }

          .status-card {
            background: #f8fafc;
            border-radius: 0.75rem;
            padding: 1.5rem;
            margin-bottom: 2rem;
          }

          .status-item {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
          }

          .status-label {
            color: #64748b;
            font-size: 0.875rem;
            margin-right: 0.5rem;
          }

          .status-value {
            font-weight: 600;
            color: #1e293b;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.875rem;
          }

          .form-group {
            margin-bottom: 1.5rem;
          }

          .form-label {
            display: block;
            font-size: 0.875rem;
            font-weight: 500;
            color: #64748b;
            margin-bottom: 0.5rem;
          }

          .form-select {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid #e2e8f0;
            border-radius: 0.5rem;
            background-color: white;
            color: #1e293b;
            font-size: 0.95rem;
            transition: all 0.2s;
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%234b5563' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 1rem center;
            background-size: 1rem;
          }

          .form-select:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }

          .submit-button {
            background: linear-gradient(to right, #3b82f6, #2563eb);
            color: white;
            padding: 0.75rem 2rem;
            border-radius: 9999px;
            border: none;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            width: 100%;
          }

          .submit-button:hover {
            background: linear-gradient(to right, #2563eb, #1d4ed8);
            transform: translateY(-1px);
          }

          .submit-button:active {
            transform: translateY(0);
          }

          @media (min-width: 640px) {
            .submit-button {
              width: auto;
            }
          }

          .status-payment { background: #fee2e2; color: #991b1b; }
          .status-order { background: #e0e7ff; color: #3730a3; }
          .customer-name { background: #f1f5f9; color: #0f172a; }
        `}
      </style>

      <div className="order-action-container">
        <div className="order-header">
          <BackToAdminDashboard />
          <h2 className="text-xl font-semibold color-gray-900 mt-4">Order Management</h2>
        </div>

        <div className="status-card">
          <div className="status-item">
            <span className="status-label">Payment Status:</span>
            <span className="status-value status-payment">{order.paymentStatus}</span>
          </div>
          <div className="status-item">
            <span className="status-label">Order Status:</span>
            <span className="status-value status-order">{order.orderStatus}</span>
          </div>
          <div className="status-item">
            <span className="status-label">Customer:</span>
            <span className="status-value customer-name">{order.customerName}</span>
          </div>
        </div>

        <form onSubmit={handelOrderAction}>
          <div className="form-group">
            <label className="form-label">Update Payment Status</label>
            <select className="form-select" name="paymentStatus">
              <option value="Received">Received</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Update Order Status</label>
            <select className="form-select" name="orderStatus">
              <option value="Accepted">Accepted</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <div className="text-center">
            <button type="submit" className="submit-button">
              Update Order
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default OrderAction;