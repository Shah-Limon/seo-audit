import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrderMenu from "./OrderMenu";

const AcceptedOrder = () => {
 const [orders, setOrders] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const itemsPerPage = 10;
 const paginationDigits = 3;

 useEffect(() => {
   fetch(`http://localhost:5000/orders`)
     .then((res) => res.json())
     .then((info) => setOrders(info.reverse()));
 }, []);

 const paginate = (pageNumber) => {
   setCurrentPage(pageNumber);
 };

 const acceptedOrders = orders.filter(
   (order) => order.orderStatus === "Accepted"
 );

 const totalPages = Math.ceil(acceptedOrders.length / itemsPerPage);
 const startDigit = Math.max(1, currentPage - Math.floor(paginationDigits / 2));
 const endDigit = Math.min(startDigit + paginationDigits - 1, totalPages);
 const currentItems = acceptedOrders.slice(
   (currentPage - 1) * itemsPerPage, 
   currentPage * itemsPerPage
 );

 return (
   <>
     <style>
       {`
         .dashboard-container {
           background: linear-gradient(to bottom right, #f8fafc, #ffffff);
           padding: 2rem;
           min-height: 100vh;
         }

         .content-wrapper {
           max-width: 1400px;
           margin: 0 auto;
         }

         .dashboard-header {
           background: white;
           border-radius: 0.75rem;
           padding: 1.5rem;
           margin-bottom: 2rem;
           box-shadow: 0 2px 4px rgba(0,0,0,0.04);
         }

         .dashboard-title {
           color: #1e293b;
           font-size: 1.75rem;
           font-weight: 600;
           text-align: center;
           margin: 0;
         }

         .table-container {
           background: white;
           border-radius: 0.75rem;
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
           padding: 1rem;
           font-weight: 600;
           color: #475569;
           text-align: left;
           border-bottom: 2px solid #e2e8f0;
           white-space: nowrap;
           font-size: 0.875rem;
         }

         .modern-table td {
           padding: 1rem;
           border-bottom: 1px solid #e2e8f0;
           color: #475569;
           font-size: 0.875rem;
         }

         .modern-table tr:last-child td {
           border-bottom: none;
         }

         .modern-table tbody tr:hover {
           background-color: #f8fafc;
           transition: all 0.2s ease;
         }

         .status-badge {
           padding: 0.375rem 0.75rem;
           border-radius: 9999px;
           font-size: 0.75rem;
           font-weight: 500;
           background-color: #dcfce7;
           color: #166534;
           display: inline-block;
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
           transition: all 0.2s ease;
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
           padding: 1rem;
         }

         .page-link {
           display: inline-flex;
           align-items: center;
           justify-content: center;
           min-width: 2.5rem;
           height: 2.5rem;
           padding: 0 0.75rem;
           border-radius: 0.375rem;
           background: white;
           border: 1px solid #e2e8f0;
           color: #475569;
           font-size: 0.875rem;
           transition: all 0.2s ease;
           cursor: pointer;
         }

         .page-link:hover {
           background: #f8fafc;
           border-color: #cbd5e1;
         }

         .page-link.active {
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
         }
       `}
     </style>

     <div className="dashboard-container">
       <div className="content-wrapper">
         <div className="dashboard-header">
           <h1 className="dashboard-title">Accepted Orders</h1>
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

         <nav className="pagination">
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
         </nav>
       </div>
     </div>
   </>
 );
};

export default AcceptedOrder;