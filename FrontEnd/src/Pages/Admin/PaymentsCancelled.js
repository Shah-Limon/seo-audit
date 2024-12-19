import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrderMenu from "./OrderMenu";

const PaymentsCancelled = () => {
 const [orders, setOrders] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const itemsPerPage = 10;
 const paginationDigits = 3;

 useEffect(() => {
   fetch(`http://localhost:5000/orders`)
     .then((res) => res.json())
     .then((info) => setOrders(info.reverse()));
 }, []);

 const PaymentsCancelled = orders.filter(
   (order) => order.paymentStatus === "Cancelled"
 );

 const paginate = (pageNumber) => setCurrentPage(pageNumber);
 const totalPages = Math.ceil(PaymentsCancelled.length / itemsPerPage);
 const startDigit = Math.max(1, currentPage - Math.floor(paginationDigits / 2));
 const endDigit = Math.min(startDigit + paginationDigits - 1, totalPages);
 const currentItems = PaymentsCancelled.slice(
   (currentPage - 1) * itemsPerPage,
   currentPage * itemsPerPage
 );

 return (
   <>
     <style>
       {`
         .dashboard-container {
           background: linear-gradient(135deg, #f8fafc, #fff);
           padding: 2rem;
           min-height: 100vh;
         }

         .content-wrapper {
           max-width: 1400px;
           margin: 0 auto;
         }

         .status-header {
           background: white;
           padding: 2rem;
           border-radius: 1rem;
           box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
           margin-bottom: 2rem;
           text-align: center;
         }

         .header-title {
           font-size: 1.75rem;
           color: #1e293b;
           font-weight: 600;
           margin-bottom: 0.5rem;
         }

         .header-subtitle {
           color: #64748b;
         }

         .table-container {
           background: white;
           border-radius: 1rem;
           box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
           overflow: hidden;
         }

         .modern-table {
           width: 100%;
           border-collapse: separate;
           border-spacing: 0;
         }

         .modern-table th {
           background: #f8fafc;
           padding: 1.25rem 1rem;
           font-weight: 600;
           color: #475569;
           text-align: left;
           font-size: 0.875rem;
           border-bottom: 2px solid #e2e8f0;
           white-space: nowrap;
         }

         .modern-table td {
           padding: 1.25rem 1rem;
           color: #475569;
           border-bottom: 1px solid #e2e8f0;
           font-size: 0.875rem;
         }

         .modern-table tr:last-child td {
           border-bottom: none;
         }

         .modern-table tbody tr:hover {
           background: #f8fafc;
           transition: all 0.2s ease;
         }

         .price-cell {
           font-weight: 600;
           color: #dc2626;
         }

         .status-badge {
           display: inline-block;
           padding: 0.375rem 0.75rem;
           border-radius: 9999px;
           font-size: 0.75rem;
           font-weight: 500;
           background: #fee2e2;
           color: #991b1b;
         }

         .action-link {
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

         .action-link:hover {
           background: #2563eb;
           transform: translateY(-1px);
         }

         .pagination {
           display: flex;
           justify-content: center;
           gap: 0.5rem;
           margin-top: 2rem;
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
           color: #475569;
           font-size: 0.875rem;
           border-radius: 0.375rem;
           cursor: pointer;
           transition: all 0.2s;
         }

         .page-button:hover {
           background: #f1f5f9;
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

           .modern-table {
             min-width: 1000px;
           }
         }

         @media (max-width: 640px) {
           .dashboard-container {
             padding: 1rem;
           }

           .status-header {
             padding: 1.5rem;
             margin-bottom: 1.5rem;
           }

           .header-title {
             font-size: 1.5rem;
           }
         }
       `}
     </style>

     <div className="dashboard-container">
       <div className="content-wrapper">
         <div className="status-header">
           <h1 className="header-title">Cancelled Payments</h1>
           <p className="header-subtitle">Overview of all cancelled payment transactions</p>
         </div>

         <OrderMenu />

         <div className="table-container">
           <table className="modern-table">
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
                   <td className="price-cell">${item.packagePrice}</td>
                  
                   <td>{item.customerEmail}</td>
                 
                   <td>
                     <span className="status-badge">{item.paymentStatus}</span>
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
             <button className="page-button" onClick={() => paginate(currentPage - 1)}>
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
             <button className="page-button" onClick={() => paginate(currentPage + 1)}>
               →
             </button>
           )}
         </div>
       </div>
     </div>
   </>
 );
};

export default PaymentsCancelled;