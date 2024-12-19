import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackToAdminDashboard from "./BackToAdminDashboard";

const AllProfileList = () => {
 const [profile, setProfile] = useState([]);
 const [searchName, setSearchName] = useState("");
 const [searchEmail, setSearchEmail] = useState("");
 const [currentPage, setCurrentPage] = useState(1);
 const [itemsPerPage] = useState(10);

 useEffect(() => {
   const fetchData = async () => {
     const response = await fetch(
       `http://localhost:5000/profiles?name=${searchName}&email=${searchEmail}`
     );
     const data = await response.json();
     setProfile(data);
   };
   fetchData();
 }, [searchName, searchEmail, currentPage]);

 const filteredProfile = profile.filter(
   (item) =>
     item.userName.toLowerCase().includes(searchName.toLowerCase()) &&
     item.userEmail.toLowerCase().includes(searchEmail.toLowerCase())
 );

 const currentItems = filteredProfile.slice(
   (currentPage - 1) * itemsPerPage,
   currentPage * itemsPerPage
 );

 return (
   <>
     <style>
       {`
         .dashboard-container {
           background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
           min-height: 100vh;
           padding: 2rem;
         }

         .content-wrapper {
           max-width: 1200px;
           margin: 0 auto;
         }

         .search-section {
           background: white;
           border-radius: 1rem;
           padding: 2rem;
           margin-bottom: 2rem;
           box-shadow: 0 1px 3px rgba(0,0,0,0.1);
         }

         .search-input {
           padding: 0.75rem 1rem;
           border: 1px solid #e2e8f0;
           border-radius: 0.5rem;
           width: 100%;
           font-size: 0.875rem;
           color: #1e293b;
           transition: all 0.2s;
         }

         .search-input:focus {
           outline: none;
           border-color: #3b82f6;
           box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
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
           padding: 1rem;
           font-size: 0.875rem;
           font-weight: 600;
           color: #475569;
           text-align: left;
           border-bottom: 2px solid #e2e8f0;
         }

         .data-table td {
           padding: 1rem;
           font-size: 0.875rem;
           color: #475569;
           border-bottom: 1px solid #e2e8f0;
         }

         .data-table tr:last-child td {
           border-bottom: none;
         }

         .data-table tbody tr:hover {
           background: #f8fafc;
           transition: all 0.2s;
         }

         .credit-badge {
           display: inline-block;
           padding: 0.25rem 0.75rem;
           border-radius: 9999px;
           font-size: 0.75rem;
           font-weight: 500;
           background: #dbeafe;
           color: #1e40af;
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

         .pagination {
           display: flex;
           justify-content: center;
           gap: 0.5rem;
           margin-top: 2rem;
           padding: 1rem;
         }

         .page-button {
           display: inline-flex;
           align-items: center;
           justify-content: center;
           min-width: 2.5rem;
           height: 2.5rem;
           padding: 0 0.75rem;
           border: 1px solid #e2e8f0;
           border-radius: 0.375rem;
           background: white;
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

         @media (max-width: 768px) {
           .dashboard-container {
             padding: 1rem;
           }

           .search-section {
             padding: 1rem;
           }

           .search-grid {
             grid-template-columns: 1fr;
             gap: 1rem;
           }
         }
       `}
     </style>

     <div className="dashboard-container">
       <div className="content-wrapper">
         <BackToAdminDashboard />

         <div className="search-section">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <input
               type="text"
               className="search-input"
               placeholder="Search by Name"
               value={searchName}
               onChange={(e) => setSearchName(e.target.value)}
             />
             <input
               type="text"
               className="search-input"
               placeholder="Search by Email"
               value={searchEmail}
               onChange={(e) => setSearchEmail(e.target.value)}
             />
           </div>
         </div>

         <div className="table-container">
           <table className="data-table">
             <thead>
               <tr>
                 <th>SL No.</th>
                 <th>Name</th>
                 <th>Email</th>
                 <th>Credits</th>
                 <th>Actions</th>
               </tr>
             </thead>
             <tbody>
               {currentItems.map((item, index) => (
                 <tr key={item._id}>
                   <td>{index + 1}</td>
                   <td>{item.userName}</td>
                   <td>{item.userEmail}</td>
                   <td>
                     <span className="credit-badge">{item.userPoint}</span>
                   </td>
                   <td>
                     <Link to={`/admin/edit-user-profile/${item._id}`} className="action-link">
                       Edit
                     </Link>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>

         <div className="pagination">
           {Array.from({
             length: Math.ceil(filteredProfile.length / itemsPerPage),
           }).map((_, index) => (
             <button
               key={index}
               className={`page-button ${currentPage === index + 1 ? "active" : ""}`}
               onClick={() => setCurrentPage(index + 1)}
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

export default AllProfileList;