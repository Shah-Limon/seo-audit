import React, { useState } from "react";
import { Link } from "react-router-dom";
import BackToAdminDashboard from "./BackToAdminDashboard";

const OrderMenu = () => {
  const [selectedOption, setSelectedOption] = useState("/admin/orders/");

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    window.location.href = selectedValue;
  };

  return (
    <>
      <style>
        {`
          .order-menu-container {
            background: white;
            border-radius: 0.5rem;
            padding: 1.5rem;
            margin-bottom: 2rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.04);
          }

          .menu-controls {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
          }

          @media (max-width: 768px) {
            .menu-controls {
              flex-direction: column;
            }
          }

          .select-container {
            flex: 1;
            min-width: 250px;
          }

          .modern-select {
            width: 100%;
            padding: 0.75rem 1rem;
            font-size: 0.95rem;
            border: 1px solid #e2e8f0;
            border-radius: 0.5rem;
            background-color: #f8fafc;
            color: #1e293b;
            cursor: pointer;
            transition: all 0.2s ease;
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%234b5563' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 1rem center;
            background-size: 1rem;
          }

          .modern-select:hover {
            border-color: #cbd5e1;
            background-color: #f1f5f9;
          }

          .modern-select:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }

          .select-label {
            display: block;
            margin-bottom: 0.5rem;
            font-size: 0.875rem;
            font-weight: 500;
            color: #64748b;
          }

          .menu-header {
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #e2e8f0;
          }

          .menu-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #1e293b;
            margin: 0;
          }

          .menu-description {
            color: #64748b;
            font-size: 0.875rem;
            margin-top: 0.25rem;
          }
        `}
      </style>

      <div className="order-menu-container">
        <div className="menu-header">
          <BackToAdminDashboard />
          <h2 className="menu-title">Order Management</h2>
          <p className="menu-description">Manage orders and payments efficiently</p>
        </div>

        <div className="menu-controls">
          <div className="select-container">
            <label className="select-label">Order Status</label>
            <select
              value={selectedOption}
              onChange={handleSelectChange}
              className="modern-select"
            >
              <option value="/admin/orders/">Total Orders</option>
              <option value="/admin/orders-pending">Pending Orders</option>
              <option value="/admin/orders/accepted">Accepted Orders</option>
              <option value="/admin/orders/cancelled">Cancelled Orders</option>
              <option value="/admin/orders/delivered">Delivered Orders</option>
            </select>
          </div>

          <div className="select-container">
            <label className="select-label">Payment Status</label>
            <select
              value={selectedOption}
              onChange={handleSelectChange}
              className="modern-select"
            >
              <option value="/admin/payments/pending">Pending Payments</option>
              <option value="/admin/payments/received">Received Payments</option>
              <option value="/admin/payments/cancelled">Cancelled Payments</option>
              <option value="/admin/payments/refunded">Refunded Payments</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderMenu;