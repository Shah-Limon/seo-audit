import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrderMenu from "./OrderMenu";
import { ScaleLoader } from "react-spinners";

const DeliveredOrders = () => {
 const [orders, setOrders] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const [loading, setLoading] = useState(true);
 const itemsPerPage = 10;

 useEffect(() => {
   fetch(`http://localhost:5000/orders`)
     .then((res) => res.json()) 
     .then((info) => {
       setOrders(info.reverse());
       setLoading(false);
     });
 }, []);

 const deliveredOrders = orders.filter(order => order.orderStatus === "Delivered");
 const totalPages = Math.ceil(deliveredOrders.length / itemsPerPage);
 const paginatedOrders = deliveredOrders.slice(
   (currentPage - 1) * itemsPerPage,
   currentPage * itemsPerPage
 );

 return (
   <>
     <style>
       {`
         .dashboard-container {
           background: linear-gradient(135deg, #f8fafc 0%, #fff 100%);
           min-height: 100vh;
           padding: 2rem;
         }

         .content-wrapper {
           max-width: 1400px;
           margin: 0 auto;
         }

         .header-card {
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

         .loading-container {
           display: flex;
           justify-content: center;
           align-items: center;
           min-height: 400px;
         }

         .table-container {
           background: white;
           border-radius: 1rem;
           overflow: hidden;
           box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
         }

         .data-table {
           width: 100%;
           border-collapse: separate;
           border-spacing: 0;
         }

         .data-table th {
           background: #f8fafc;
           padding: 1.25rem 1rem;
           font-weight: 600;
           color: #475569;
           text-align: left;
           font-size: 0.875rem;
           border-bottom: 2px solid #e2e8f0;
           white-space: nowrap;
         }

         .data-table td {
           padding: 1.25rem 1rem;
           color: #475569;
           font-size: 0.875rem;
           border-bottom: 1px solid #e2e8f0;
         }

         .data-table tbody tr:hover {
           background: #f8fafc;
           transition: all 0.2s ease;
         }

         .status-badge {
           display: inline-block;
           padding: 0.375rem 0.75rem;
           border-radius: 9999px;
           font-size: 0.75rem;
           font-weight: 500;
           background: #dcfce7;
           color: #166534;
         }

         .amount-cell {
           font-weight: 500;
           color: #047857;
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
           transition: all 0.2s ease;
         }

         .action-button:hover {
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
           background: white;
           border: 1px solid #e2e8f0;
           color: #475569;
           font-size: 0.875rem;
           border-radius: 0.375rem;
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

           .data-table {
             min-width: 1000px;
           }
         }

         @media (max-width: 640px) {
           .dashboard-container {
             padding: 1rem;
           }

           .header-card {
             padding: 1.5rem;
           }
         }
       `}
     </style>

     <div className="dashboard-container">
       <div className="content-wrapper">
         <div className="header-card">
           <h1 className="page-title">Delivered Orders</h1>
           <p className="text-gray-600">Overview of all completed deliveries</p>
         </div>

         <OrderMenu />

         {loading ? (
           <div className="loading-container">
             <ScaleLoader color="#3b82f6" margin={4} size={30} />
           </div>
         ) : (
           <>
             <div className="table-container">
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
                   {paginatedOrders.map((item, index) => (
                     <tr key={item._id}>
                       <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                       <td>{item.orderDate}</td>
                       <td>{item.customerName}</td>
                       <td>{item.packageName}</td>
                       <td className="amount-cell">${item.packagePrice}</td>
                   
                       <td>{item.customerEmail}</td>
                    
                       <td><span className="status-badge">{item.orderStatus}</span></td>
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

             <div className="pagination">
               {Array.from({ length: totalPages }, (_, index) => (
                 <button
                   key={index}
                   onClick={() => setCurrentPage(index + 1)}
                   className={`page-link ${currentPage === index + 1 ? 'active' : ''}`}
                 >
                   {index + 1}
                 </button>
               ))}
             </div>
           </>
         )}
       </div>
     </div>
   </>
 );
};

export default DeliveredOrders;