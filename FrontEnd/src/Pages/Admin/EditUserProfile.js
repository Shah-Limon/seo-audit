import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import BackToAdminDashboard from "./BackToAdminDashboard";

const EditUserProfile = () => {
 const { id } = useParams();
 const navigate = useNavigate();
 const [profile, setProfile] = useState([]);
 const [user] = useAuthState(auth);

 useEffect(() => {
   fetch(`http://localhost:5000/profile/${id}`)
     .then((res) => res.json())
     .then((info) => setProfile(info));
 }, [id]);

 const handleProfile = (event) => {
   event.preventDefault();
   const userPoint = event.target.userPoint.value;
   const profile = { userPoint };

   const url = `http://localhost:5000/update-credit/${id}`;
   fetch(url, {
     method: "PUT",
     headers: {
       "content-type": "application/json",
     },
     body: JSON.stringify(profile),
   })
     .then((res) => res.json())
     .then((result) => {
       navigate("/admin/manage-profiles/");
     });
 };

 return (
   <>
     <style>
       {`
         .edit-profile-container {
           min-height: 100vh;
           background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
           padding: 2rem;
         }

         .content-wrapper {
           max-width: 600px;
           margin: 0 auto;
         }

         .card {
           background: white;
           border-radius: 1rem;
           box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
           padding: 2rem;
         }

         .card-header {
           margin-bottom: 2rem;
           padding-bottom: 1rem;
           border-bottom: 1px solid #e2e8f0;
         }

         .card-title {
           font-size: 1.5rem;
           font-weight: 600;
           color: #1e293b;
           margin: 0;
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

         .form-control {
           width: 100%;
           padding: 0.75rem 1rem;
           font-size: 0.875rem;
           line-height: 1.5;
           color: #1e293b;
           background-color: #fff;
           border: 1px solid #e2e8f0;
           border-radius: 0.5rem;
           transition: all 0.2s;
         }

         .form-control:focus {
           outline: none;
           border-color: #3b82f6;
           box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
         }

         .credit-display {
           display: inline-block;
           padding: 0.5rem 1rem;
           background: #dbeafe;
           color: #1e40af;
           border-radius: 0.5rem;
           font-weight: 500;
           margin-bottom: 1rem;
         }

         .submit-button {
           display: inline-flex;
           align-items: center;
           justify-content: center;
           padding: 0.75rem 1.5rem;
           background: #3b82f6;
           color: white;
           border: none;
           border-radius: 0.5rem;
           font-weight: 500;
           font-size: 0.875rem;
           cursor: pointer;
           transition: all 0.2s;
         }

         .submit-button:hover {
           background: #2563eb;
           transform: translateY(-1px);
         }

         .submit-button:active {
           transform: translateY(0);
         }

         @media (max-width: 640px) {
           .edit-profile-container {
             padding: 1rem;
           }

           .card {
             padding: 1.5rem;
           }
         }
       `}
     </style>

     <div className="edit-profile-container">
       <div className="content-wrapper">
         <BackToAdminDashboard />

         <div className="card">
           <div className="card-header">
             <h1 className="card-title">Update User Credits</h1>
           </div>

           <form onSubmit={handleProfile}>
             <div className="form-group">
               <div className="credit-display">
                 Current Credits: {profile.userPoint}
               </div>
             </div>

             <div className="form-group">
               <label className="form-label">New Credit Amount</label>
               <input
                 type="number"
                 className="form-control"
                 name="userPoint"
                 defaultValue={profile.userPoint}
                 placeholder="Enter new credit amount"
               />
             </div>

             <button type="submit" className="submit-button">
               Update Credits
             </button>
           </form>
         </div>
       </div>
     </div>
   </>
 );
};

export default EditUserProfile;