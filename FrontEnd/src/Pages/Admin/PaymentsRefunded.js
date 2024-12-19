import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrderMenu from "./OrderMenu";

const PaymentsRefunded = () => {
 const [orders, setOrders] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const itemsPerPage = 10;

 useEffect(() => {
   fetch(`http://localhost:5000/orders`)
     .then((res) => res.json())
     .then((info) => setOrders(info.reverse()));
 }, []);

 const refundedOrders = orders.filter(order => order.paymentStatus === "Refunded");
 const paginatedOrders = refundedOrders.slice(
   (currentPage - 1) * itemsPerPage,
   currentPage * itemsPerPage
 );
 const totalPages = Math.ceil(refundedOrders.length / itemsPerPage);
 const changePage = (page) => setCurrentPage(page);

 return (
   <>
     <style>
       {`
         .dashboard-container {
           background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
           padding: 2rem;
           min-height: 100vh;
         }

         .content-wrapper {
           max-width: 1400px;
           margin: 0 auto;
         }

         .header-section {
           background: white;
           border-radius: 1rem;
           padding: 2rem;
           margin-bottom: 2rem;
           box-shadow: 0 1px 3px rgba(0,0,0,0.1);
           text-align: center;
         }

         .page-title {
           font-size: 1.75rem;
           font-weight: 600;
           color: #1e293b;
           margin-bottom: 0.5rem;
         }

         .page-subtitle {
           color: #64748b;
           font-size: 1rem;
         }

         .table-container {
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
           padding: 1.25rem 1rem;
           font-size: 0.875rem;
           font-weight: 600;
           color: #475569;
           text-align: left;
           border-bottom: 2px solid #e2e8f0;
           white-space: nowrap;
         }

         .data-table td {
           padding: 1.25rem 1rem;
           font-size: 0.875rem;
           color: #475569;
           border-bottom: 1px solid #e2e8f0;
         }

         .data-table tbody tr:hover {
           background-color: #f8fafc;
           transition: all 0.2s ease;
         }

         .status-badge {
           display: inline-block;
           padding: 0.375rem 0.75rem;
           border-radius: 9999px;
           font-size: 0.75rem;
           font-weight: 500;
           background-color: #fef3c7;
           color: #92400e;
         }

         .amount-cell {
           font-weight: 500;
           color: #dc2626;
         }

         .action-button {
           display: inline-flex;
           align-items: center;
           padding: 0.5rem 1rem;
           background: #3b82f6;
           color: white;
           border-radius: 0.375rem;
           text-decoration: none;
           font-size: 0.875rem;
           transition: all 0.2s;
         }

         .action-button:hover {
           background: #2563eb;
           transform: translateY(-1px);
         }

         .pagination-container {
           display: flex;
           justify-content: center;
           margin-top: 2rem;
           padding: 1rem;
           gap: 0.5rem;
         }

         .page-button {
           display: inline-flex;
           align-items: center;
           justify-content: center;
           min-width: 2.5rem;
           height: 2.5rem;
           padding: 0 0.75rem;
           background: white;
           border: 1px solid #e2e8f0;
           border-radius: 0.375rem;
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
           .table-container {
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

           .header-section {
             padding: 1.5rem;
           }

           .page-title {
             font-size: 1.5rem;
           }
         }
       `}
     </style>

     <div className="dashboard-container">
       <div className="content-wrapper">
         <div className="header-section">
           <h1 className="page-title">Refunded Payments</h1>
           <p className="page-subtitle">Overview of all refunded transactions</p>
         </div>

         <OrderMenu />

         <div className="table-container">
           <table className="data-table">
             <thead>
               <tr>
                 <th>SL No.</th>
                 <th>Date</th>
                 <th>Name</th>
                 <th>Package</th>
                 <th>Amount</th>
                 <th>Website</th>
                 <th>Email</th>
                 <th>Note</th>
                 <th>Status</th>
                 <th>Action</th>
               </tr>
             </thead>
             <tbody>
               {paginatedOrders.map((item, index) => (
                 <tr key={item._id}>
                   <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                   <td>{item.orderDate}</td>
                   <td>{item.customerName}</td>
                   <td>{item.packageName}</td>
                   <td className="amount-cell">${item.packagePrice}</td>
                   <td>{item.customerWebsite}</td>
                   <td>{item.customerEmail}</td>
                   <td>{item.customerNote}</td>
                   <td><span className="status-badge">{item.paymentStatus}</span></td>
                   <td>
                     <Link to={`/admin/order/${item._id}`} className="action-button">
                       Action
                     </Link>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>

         <div className="pagination-container">
           {Array.from({ length: totalPages }, (_, index) => (
             <button
               key={index}
               onClick={() => changePage(index + 1)}
               className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
             >
               {index + 1}
             </button>
           ))}
         </div>
       </div>
     </div>
   </>
 );
};

export default PaymentsRefunded;